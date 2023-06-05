from sklearn.tree import DecisionTreeClassifier
import tensorflow as tf
import numpy as np
import pickle

class DecisionTree:
    def __init__(self, X, y_bin, X_train, X_test):
        ### load feature transformer
        self.scaler = pickle.load(open('models/scaler.pkl', 'rb'))
        self.X = X
        self.y_bin = y_bin
        self.X_train = X_train
        self.X_test = X_test

    def train(self):
        dt = DecisionTreeClassifier()
        X_dt_scaled = self.scaler.transform(self.X)
        dt.fit(X_dt_scaled, self.y_bin)

        self.dt = dt

    def predict(self, x):
        x_scaled = self.scaler.transform(x)
        pred = self.dt.predict(x_scaled)
        pred = pred.reshape(-1, 1)
        return pred