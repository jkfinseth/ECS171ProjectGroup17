from sklearn.naive_bayes import GaussianNB
from sklearn.preprocessing import StandardScaler

class NaiveBayesNumerical:
    def __init__(self, X, y_bin, included_numerical_vars):
        self.X = X
        self.y_bin = y_bin
        self.included_numerical_vars = included_numerical_vars

    def train(self):
        ss = StandardScaler()
        X_nb_num_scaled = ss.fit_transform(self.X[self.included_numerical_vars])
        clf = GaussianNB()
        clf.fit(X_nb_num_scaled, self.y_bin)

        self.ss = ss
        self.clf = clf

    def predict(self, x):
        x_scaled = self.ss.transform(x[self.included_numerical_vars])
        pred = self.clf.predict(x_scaled)
        pred = pred.reshape(-1, 1)
        return pred