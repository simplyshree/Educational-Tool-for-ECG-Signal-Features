import numpy as np;
import pandas as pd;
print("Completed")
import neurokit2 as nk;
from sklearn.ensemble import RandomForestClassifier;
import joblib;
import matplotlib.pyplot as plt;
from sklearn.preprocessing import StandardScaler;
def generate_ecg(duration=10, sampling_rate=500, heart_rate=70):

    ecg_signal = nk.ecg_simulate(duration=duration,
                                 sampling_rate=sampling_rate,
                                 heart_rate=heart_rate)
    return ecg_signal

def extract_ecg_features(ecg_signal, fs=500):

    try:
        # Clean ECG
        cleaned = nk.ecg_clean(ecg_signal, sampling_rate=fs)

        # R-peak detection
        peaks, info = nk.ecg_peaks(cleaned, sampling_rate=fs)
        rpeaks = info["ECG_R_Peaks"]

        # Ensure enough peaks for HRV
        if len(rpeaks) < 2:
            raise ValueError("Insufficient R-peaks detected")

        # HRV features
        hrv = nk.hrv_time(rpeaks, sampling_rate=fs, show=False)

        # Delineation (can fail for synthetic ECG)
        try:
            signals, waves = nk.ecg_delineate(
                cleaned, rpeaks, sampling_rate=fs, method="dwt"
            )
            qrs = np.nanmean(waves["ECG_QRS_Duration"])
            qt = np.nanmean(waves["ECG_QT"])
        except:
            qrs = 0.0
            qt = 0.0

        features = {
            "HR": float(hrv["HRV_MeanNN"].values[0]),
            "SDNN": float(hrv["HRV_SDNN"].values[0]),
            "RMSSD": float(hrv["HRV_RMSSD"].values[0]),
            "QRS": float(qrs),
            "QT": float(qt)
        }

        return features

    except Exception as e:
        print("ECG feature extraction failed:", e)
        return {
            "HR": 0.0,
            "SDNN": 0.0,
            "RMSSD": 0.0,
            "QRS": 0.0,
            "QT": 0.0
        }

    
