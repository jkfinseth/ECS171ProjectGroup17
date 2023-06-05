from sklearn.tree import DecisionTreeClassifier
import tensorflow as tf
import numpy as np
import pickle

# gathered from running classification reports on each individual model separately
# (nn, nb_cat, nb_num, dt)
weights = [0.8716747070985528, 0.9946243969676085, 0.673328738800827, 0.380013783597519]

class Ensemble:
    def __init__(self, nn, nb_cat, nb_num, dt):
        self.nn = nn
        self.nb_cat = nb_cat
        self.nb_num = nb_num
        self.dt = dt

    def predict(self, x):
        nn_pred = self.nn.predict(x)
        nb_cat_pred = self.nb_cat.predict(x)
        nb_num_pred = self.nb_num.predict(x)
        dt_pred = self.dt.predict(x)

        mean_pred = np.average([nn_pred, nb_cat_pred, nb_num_pred, dt_pred], axis=0, weights=weights)

        final_pred = np.rint(mean_pred)

        return final_pred