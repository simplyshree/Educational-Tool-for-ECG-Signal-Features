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

def predict(age:int, sex: int , heart_rate:int):

    ecg= generate_ecg(10,500,heart_rate)
    feats = extract_ecg_features(ecg,500)
    feats['age'] = age
    feats['sex'] = sex

    X = [[feats[f] for f in features]]
    label = int(model.predict(X)[0])

    pattern_labels={
         0: "Normal Resting Heart Rate",
         1: "Variation in Result."
    }

    return {
        "ecg": ecg.tolist(),
        "label": pattern_labels[label],
    }