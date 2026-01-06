from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
from back import generate_ecg, extract_ecg_features

app = FastAPI()

app.add_middleware(

    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("ecg_risk_model.pkl")
features = joblib.load("feature_names.pkl")

@app.post("/analyze")

def analyze_ecg(heart_rate : int):

    ecg = generate_ecg(10,500, heart_rate)
    features = extract_ecg_features(ecg,500)


    return{
        "ecg": ecg.tolist(),
        "features": features
    }