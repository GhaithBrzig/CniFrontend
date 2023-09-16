from flask import Flask, request, jsonify
import pickle
from flask_cors import CORS, cross_origin
import numpy as np

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:4200"}})

model = pickle.load(open('model/classifier.pkl', 'rb'))

@app.route('/',methods=["GET"])
def hello():
    name = request.args.get("name", "world")
    return 'Hello'


@app.route('/predict', methods =['POST'])
def predict():
    data = request.get_json(force=True)
    features = [np.array(data['data'])]
    prediction = model.predict(features)
    return jsonify(prediction[0])


if __name__ == '__main__':
    app.run()
