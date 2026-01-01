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
        cleaned = nk.ecg_clean(ecg_signal, sampling_rate = fs)  #reduce noise

        #rpeak
        peaks,info = nk.ecg_peaks(cleaned, sampling_rate = fs)
        rpeaks = info['ECG_R_Peaks']

        #HRV

        hrv = nk.hrv_time(rpeaks, sampling_rate=fs, show=False)

        #ecg delineations (qrs,qt)

        signals, waves = nk.ecg_delineate(
            cleaned, rpeaks, sampling_rate=fs, method="dwt"
        )

        features = {

            "HR": np.mean(hrv["HRV_MeanNN"]),
            "SDNN" : np.mean(hrv["HRV_SDNN"]),
            "RMSSD" : np.mean(hrv["HRV_RMSSD"]),
            "QRS" : np.nanmean(waves["ECG_QRS_Duration"]),
            "QT": np.nanmean(waves["ECG_QT"])
        }
        
        return features
        
    except:

        return{"HR":0, "SDNN":0 , "RMSSD":0, "QRS":0, "QT":0}
    
    
