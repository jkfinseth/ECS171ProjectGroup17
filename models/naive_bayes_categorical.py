from sklearn.naive_bayes import CategoricalNB
from sklearn.preprocessing import OrdinalEncoder

class NaiveBayesCategorical:
    def __init__(self, X, y_bin, included_categorical_vars):
        self.X = X
        self.y_bin = y_bin
        self.included_categorical_vars = included_categorical_vars

    def train(self):
        oe = OrdinalEncoder()
        X_nb_cat_scaled = oe.fit_transform(self.X[self.included_categorical_vars])
        clf = CategoricalNB()
        clf.fit(X_nb_cat_scaled, self.y_bin)

        self.oe = oe
        self.clf = clf

    def predict(self, x):
        x_scaled = self.oe.transform(x[self.included_categorical_vars])
        pred = self.clf.predict(x_scaled)
        pred = pred.reshape(-1, 1)
        return pred