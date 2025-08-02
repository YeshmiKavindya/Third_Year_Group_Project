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

 retail_data = pd.DataFrame({
        'quantity': [1, 10, 20, 30, 40],
        'price_per_packet': [250, 245, 240, 235, 230]
    })
 wholesale_data = pd.DataFrame({
    'quantity': [40,50,100,200,300]
    'price_per_packet':[200,195,190,185,180]
})

 retail_model = LinearRegression()
 retail_model.fit(retail_data[['quantity']], retail_data['price_per_packet'])

 wholesale_model = LinearRegression()
 wholesale_model.fit(wholesale_data[['quantity']], wholesale_data['price_per_packet'])

 return retail_model, wholesale_model

def calculate_savings(quantity, retail_price, wholesale_price, wholesale_min_quantity):
 if quantity >= wholesale_min_quantity:
        wholesale_total = wholesale_price * quantity
        retail_total = retail_price * quantity
        savings = retail_total - wholesale_total
        return savings, wholesale_total
 return 0,0

def filter_nearby_wholesalers(user_location, item):
 if item != 'milk_packet':
  return []