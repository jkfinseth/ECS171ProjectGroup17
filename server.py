import pandas as pd
import random
from flask import Flask, request
from sklearn.model_selection import train_test_split
from models.decision_tree import DecisionTree
from models.naive_bayes_categorical import NaiveBayesCategorical
from models.naive_bayes_numerical import NaiveBayesNumerical
from models.neural_network import NeuralNetwork
from sklearn.preprocessing import LabelBinarizer

# Preprocessing
hotel_df = pd.read_csv('models/Hotel Reservations.csv')
hotel_df.drop(['Booking_ID'], inplace=True, axis=1)

categorical_vars = ['type_of_meal_plan', 'required_car_parking_space', 'room_type_reserved', 'market_segment_type']
numerical_vars = ['no_of_adults', 'no_of_children', 'no_of_weekend_nights', 'no_of_week_nights', 'lead_time', 'repeated_guest', 'no_of_previous_cancellations', 'no_of_previous_bookings_not_canceled', 'avg_price_per_room', 'no_of_special_requests']
time_vars = ['arrival_year', 'arrival_month', 'arrival_date']

excluded_vars = ['arrival_year']

included_categorical_vars = [var for var in categorical_vars if var not in excluded_vars]
included_numerical_vars = [var for var in numerical_vars if var not in excluded_vars]
included_time_vars = [var for var in time_vars if var not in excluded_vars]

X = hotel_df.drop(['booking_status'] + excluded_vars, axis=1)
y = hotel_df['booking_status']

y_bin = LabelBinarizer().fit_transform(y)

# train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y_bin, test_size=0.2, random_state=92)

# Models
nn_model = NeuralNetwork()
nn_model.load()

nb_cat_model = NaiveBayesCategorical(X, y_bin, included_categorical_vars)
nb_cat_model.train()
nb_num_model = NaiveBayesNumerical(X, y_bin, included_numerical_vars)
nb_num_model.train()

dt_model = DecisionTree()
dt_model.load()

app = Flask(__name__)

@app.route("/api/nn", methods=['POST'])
def predict_nn():
    input_df = pd.DataFrame([request.get_json()]);
    return {
        "prediction": int(nn_model.predict(input_df))
    }

@app.route("/api/nb_cat", methods=['POST'])
def predict_nb_cat():
    input_df = pd.DataFrame([request.get_json()]);
    return {
        "prediction": int(nb_cat_model.predict(input_df))
    }

@app.route("/api/nb_num", methods=['POST'])
def predict_nb_num():
    input_df = pd.DataFrame([request.get_json()]);
    return {
        "prediction": int(nb_num_model.predict(input_df))
    }

@app.route("/api/dt", methods=['POST'])
def predict_dt():
    input_df = pd.DataFrame([request.get_json()]);
    pre, post, both = dt_model.predict(input_df)

    return {
        "pre": int(pre),
        "post": int(post),
        "both": int(both)
    }

data_dict = hotel_df.to_dict(orient="records")
@app.route("/api/example_data", methods=['GET'])
def get_example_data():
    return data_dict[random.randint(0, len(hotel_df) - 1)]

@app.route("/api/random_data", methods=['GET'])
def get_random_data():
    out = {}
    for column in hotel_df.columns:
        out[column] = data_dict[random.randint(0, len(hotel_df) - 1)][column]

    return out