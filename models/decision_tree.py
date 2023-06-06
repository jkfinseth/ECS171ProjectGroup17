from sklearn.tree import DecisionTreeClassifier
import tensorflow as tf
import numpy as np
import pickle
import joblib

class DecisionTree:
    def __init__(self):
        ### load feature transformer
        self.scaler = pickle.load(open('models/scaler.pkl', 'rb'))

    def load(self):
        self.dt_pre = joblib.load('models/DT_pre.joblib')
        self.dt_post = joblib.load('models/DT_post.joblib')
        self.dt_both = joblib.load('models/DT_both.joblib')

    def predict(self, x):
        x_scaled = self.scaler.transform(x)

        pre_pred = self.dt_pre.predict(x_scaled)
        pre_pred = pre_pred.reshape(-1, 1)

        post_pred = self.dt_post.predict(x_scaled)
        post_pred = post_pred.reshape(-1, 1)

        both_pred = self.dt_both.predict(x_scaled)
        both_pred = both_pred.reshape(-1, 1)
        return (pre_pred[0][0], post_pred[0][0], both_pred[0][0])