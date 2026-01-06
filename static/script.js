let chart;

/*
   FETCH ECG FROM BACKEND (Educational Tool)
*/
function analyzeECG() {

    const age = document.getElementById("age").value;
    const sex = document.getElementById("sex").value;
    const hr = document.getElementById("hr").value;

    fetch(`http://127.0.0.1:8000/analyze?age=${age}&sex=${sex}&heart_rate=${hr}`, {
        method: "POST"
    })
    .then(res => res.json())
    .then(data => {

        // Plot ECG
        plotECG(data.ecg);

        // 👉 DISPLAY EXTRACTED FEATURES
        const f = data.features;

        document.getElementById("HR").innerText = f.HR.toFixed(2);
        document.getElementById("SDNN").innerText = f.SDNN.toFixed(2);
        document.getElementById("RMSSD").innerText = f.RMSSD.toFixed(2);
        document.getElementById("QRS").innerText = f.QRS.toFixed(3);
        document.getElementById("QT").innerText = f.QT.toFixed(3);

        document.getElementById("result").innerText =
            "Synthetic ECG signal generated for learning purposes.";
    })
    .catch(err => {
        alert("Backend running.");
        console.error(err);
    });
}

/* --------------------------------------------
   ECG CHART PLOTTING (No Peak Marking)
---------------------------------------------*/
function plotECG(ecg) {

    const ctx = document.getElementById("ecgChart");

    if (chart) chart.destroy();

    const samplingRate = 500;
    const timeAxis = ecg.map((_, i) => i / samplingRate);

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeAxis,
            datasets: [{
                label: 'Synthetic ECG Signal',
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
        }
    });
}

