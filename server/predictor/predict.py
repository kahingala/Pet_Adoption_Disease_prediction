# server/predictor/predict.py

import sys
import json
import joblib

def load_input():
    try:
        input_text = sys.stdin.read()
        return json.loads(input_text)
    except Exception as e:
        print(json.dumps({"error": f"Invalid input format: {e}"}))
        sys.exit(1)

def main():
    # Load input JSON from stdin
    input_data = load_input()

    # Ensure required fields are present
    required_fields = ["weight", "bodyTemperature", "heartRate", "duration"]
    for field in required_fields:
        if field not in input_data:
            print(json.dumps({"error": f"Missing field: {field}"}))
            sys.exit(1)

    try:
        features = [
            float(input_data["weight"]),
            float(input_data["bodyTemperature"]),
            float(input_data["heartRate"]),
            float(input_data["duration"])
        ]
    except ValueError as e:
        print(json.dumps({"error": f"Invalid number format: {e}"}))
        sys.exit(1)

    # Load your trained model
    try:
        model = joblib.load("server/predictor/disease_model.pkl")
    except Exception as e:
        print(json.dumps({"error": f"Model loading failed: {e}"}))
        sys.exit(1)

    # Make prediction
    try:
        prediction = model.predict([features])
        print(json.dumps({"prediction": prediction[0]}))
    except Exception as e:
        print(json.dumps({"error": f"Prediction failed: {e}"}))
        sys.exit(1)

if __name__ == "__main__":
    main()
