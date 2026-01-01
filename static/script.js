let chart;

/* -------------------------------------------------
   ECG PEAK DETECTION (Educational, heuristic)
--------------------------------------------------*/
function findECGPeaks(ecg) {
    const threshold = 0.9; // QRS amplitude threshold
    let qrsIndex = null;

    // Find first QRS peak
    for (let i = 1; i < ecg.length - 1; i++) {
        if (
            ecg[i] > threshold &&
            ecg[i] > ecg[i - 1] &&
            ecg[i] > ecg[i + 1]
        ) {
            qrsIndex = i;
            break;
        }
    }

    if (qrsIndex === null) return null;

    const window = 80;

    // P wave (before QRS)
    const pStart = Math.max(0, qrsIndex - window);
    const pSegment = ecg.slice(pStart, qrsIndex);
    const pIndex = pSegment.indexOf(Math.max(...pSegment)) + pStart;

    // T wave (after QRS)
    const tEnd = Math.min(ecg.length, qrsIndex + window);
    const tSegment = ecg.slice(qrsIndex, tEnd);
    const tIndex = tSegment.indexOf(Math.max(...tSegment)) + qrsIndex;

    return {
        P: { index: pIndex, value: ecg[pIndex] },
        QRS: { index: qrsIndex, value: ecg[qrsIndex] },
        T: { index: tIndex, value: ecg[tIndex] }
    };
}


/* -------------------------------------------------
   ECG ANATOMY ANNOTATION PLUGIN
--------------------------------------------------*/
const ecgAnnotations = {
    id: 'ecgAnnotations',
    afterDraw(chart) {
        if (!chart.ecgPeaks) return;

        const { ctx, scales: { x, y } } = chart;
        const peaks = chart.ecgPeaks;

        ctx.save();
        ctx.font = '14px Arial';
        ctx.fillStyle = 'red';
        ctx.strokeStyle = 'rgba(255,0,0,0.5)';

        Object.entries(peaks).forEach(([label, peak]) => {
            const xPos = x.getPixelForValue(peak.index);
            const yPos = y.getPixelForValue(peak.value + 0.12);

            // Draw label
            ctx.fillText(label, xPos - 12, yPos);

            // Vertical marker
            ctx.beginPath();
            ctx.moveTo(xPos, y.getPixelForValue(0));
            ctx.lineTo(xPos, y.getPixelForValue(peak.value));
            ctx.stroke();
        });

        ctx.restore();
    }
};


/* -------------------------------------------------
   FETCH ECG FROM BACKEND
--------------------------------------------------*/
function analyzeECG() {
    const age = document.getElementById("age").value;
    const sex = document.getElementById("sex").value;
    const hr = document.getElementById("hr").value;

    fetch(`http://127.0.0.1:8000/analyze?age=${age}&sex=${sex}&heart_rate=${hr}`, {
        method: "POST"
    })
    .then(res => res.json())
    .then(data => {
        plotECG(data.ecg);
        document.getElementById("result").innerText =
            `Learning Output: ${data.label}`;
    })
    .catch(err => {
        alert("Backend not running or connection error.");
        console.error(err);
    });
}

/* -------------------------------------------------
   ECG CHART PLOTTING
--------------------------------------------------*/
function plotECG(ecg) {
    const ctx = document.getElementById("ecgChart");

    if (chart) chart.destroy();

    const samplingRate = 500;
    const timeAxis = ecg.map((_, i) => i / samplingRate);

    // Detect ECG anatomy peaks
    const peaks = findECGPeaks(ecg);

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeAxis,
            datasets: [{
                label: 'Simulated ECG Signal',
                data: ecg,
                borderWidth: 1,
                tension: 0.25,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Time (seconds)'
                    },
                    ticks: {
                        maxTicksLimit: 10
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Amplitude (mV)'
                    }
                }
            }
        },
        plugins: [ecgAnnotations]
    });

    // Attach peak data to chart instance
    chart.ecgPeaks = peaks;
}


