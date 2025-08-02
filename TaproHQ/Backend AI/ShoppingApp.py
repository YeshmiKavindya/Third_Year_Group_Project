import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

data = {
    'shop_id': [1, 2, 3, 4, 5],
    'shop_name': ['Retail A', 'Wholesale B', 'Retail C', 'Wholesale D', 'Retail E'],
    'shop_type': ['retail', 'wholesale', 'retail', 'wholesale', 'retail'],
    'location': ['Kandy', 'Horana', 'Vavuniya', 'Jaffna', 'Colombo'],

    'min_quantity': [1, 50, 1, 40, 1], 
    'item':['Milk packet','Soap','Chocolate','Biscuit','Napkins']
}

shops_df = pd.DataFrame(data)

def train_price_model(item):