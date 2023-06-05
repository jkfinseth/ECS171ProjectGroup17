import tensorflow as tf
import numpy as np
import pickle

class NeuralNetwork:
    def __init__(self):
        ### load feature transformer
        self.scaler = pickle.load(open('models/scaler.pkl', 'rb'))
    
    def load(self):
        ### load model
        model_nn = tf.keras.models.load_model('models/nn_final.h5', compile=False)
        model_nn.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=0.005), 
                loss=tf.keras.losses.binary_crossentropy, 
                metrics=[tf.keras.metrics.BinaryAccuracy(name='accuracy')])
        
        self.model = model_nn

    '''
    Takes an input, x, and uses the neural network to predict if the hotel
    reservation is cancelled.
    
    ------------
    Input
    ------------
    The input must be an (n x 16) numpy array or an (n x 16) subset of a named DataFrame.

    If the input is a numpy array, then order of the variables must be:

    'type_of_meal_plan', 'required_car_parking_space', 'room_type_reserved', 'market_segment_type', 'no_of_adults', 'no_of_children', 
    'no_of_weekend_nights', 'no_of_week_nights', 'lead_time', 'repeated_guest', 'no_of_previous_cancellations', 
    'no_of_previous_bookings_not_canceled', 'avg_price_per_room', 'no_of_special_requests', 'arrival_month', 'arrival_date'

    ------------
    Output
    ------------
    The output is either 0 or 1.
    0: 'Cancelled'
    1: 'Not_Cancelled'
    
    '''
    def predict(self, x):
      ### transform input
      x_scaled = self.scaler.transform(x)

      ### make prediction
      threshold = 0.5
      pred = self.model.predict(x_scaled)
      pred = np.where(pred >= threshold, 1, 0)

      return pred[0][0]