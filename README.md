<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <style>
        body {
            font-family: Arial, Helvetica, sans-serif;
            line-height: 1.6;
            margin: 40px;
            max-width: 900px;
        }
        h1, h2 {
            color: #0b5394;
        }
        .disclaimer {
            background-color: #fff3cd;
            border-left: 6px solid #ffa500;
            padding: 15px;
            margin: 20px 0;
        }
        ul {
            margin-left: 20px;
        }
        code {
            background-color: #f4f4f4;
            padding: 2px 6px;
            border-radius: 4px;
        }
    </style>
</head>
<body>

<h1>ECG Learning Tool (Educational Application)</h1>

<p>
This project is an <strong>interactive ECG learning tool</strong> developed for educational purposes,
primarily aimed at students of <strong>Biomedical Engineering</strong> and related fields.
The tool allows users to generate and visualize synthetic ECG signals and explore
commonly used ECG-derived features in a simplified and intuitive manner.
</p>

<div class="disclaimer">
    <strong>Disclaimer:</strong><br>
    This application uses <strong>synthetic ECG signals only</strong>.  
    It is intended strictly for <strong>educational and learning purposes</strong>.  
    It <strong>does not use real patient data</strong>, <strong>does not perform medical diagnosis</strong>,
    and <strong>must not be used for clinical decision-making</strong>.
</div>

<h2>Project Objectives</h2>
<ul>
    <li>To help students understand the basic structure of ECG signals</li>
    <li>To visualize ECG waveforms interactively in a web-based interface</li>
    <li>To demonstrate ECG feature extraction concepts such as HR and HRV</li>
    <li>To introduce backend–frontend integration in biomedical applications</li>
</ul>

<h2>Key Features</h2>
<ul>
    <li>Generation of synthetic ECG signals using physiological simulation</li>
    <li>Visualization of ECG signals using interactive charts</li>
    <li>Extraction and display of ECG features:
        <ul>
            <li>Heart Rate (HR)</li>
            <li>SDNN (Standard Deviation of NN intervals)</li>
            <li>RMSSD (Root Mean Square of Successive Differences)</li>
            <li>QRS Duration</li>
            <li>QT Interval</li>
        </ul>
    </li>
    <li>User-controlled parameters such as heart rate</li>
    <li>Backend powered by Python and FastAPI</li>
    <li>Frontend implemented using HTML, CSS, and JavaScript</li>
</ul>

<h2>Technology Stack</h2>
<ul>
    <li><strong>Backend:</strong> Python, FastAPI</li>
    <li><strong>Signal Processing:</strong> NeuroKit2</li>
    <li><strong>Frontend:</strong> HTML, CSS, JavaScript</li>
    <li><strong>Visualization:</strong> Chart.js</li>
</ul>

<h2>How It Works</h2>
<p>
The backend generates a synthetic ECG signal based on user-defined parameters
(such as heart rate). The signal is processed to extract time-domain ECG features,
which are then sent to the frontend. The frontend displays the ECG waveform
and the extracted features in a user-friendly format.
</p>

<h2>Ethical and Educational Considerations</h2>
<ul>
    <li>No real patient data is used</li>
    <li>No medical predictions or diagnoses are made</li>
    <li>All outputs are clearly labeled as simulated</li>
    <li>The tool is designed to support conceptual learning only</li>
</ul>

<h2>Intended Use</h2>
<p>
This tool is intended for:
</p>
<ul>
    <li>Biomedical engineering students</li>
    <li>Educational demonstrations</li>
    <li>Learning signal processing concepts</li>
    <li>Academic projects and coursework</li>
</ul>

<p>
<strong>Not intended for:</strong> clinical use, patient monitoring, or medical diagnosis.
</p>

<hr>

<p>
<strong>Project Type:</strong> Educational / Academic Learning Tool<br>
<strong>ECG Data:</strong> Fully Synthetic<br>
<strong>Clinical Use:</strong> Not Applicable
</p>

</body>
</html>


