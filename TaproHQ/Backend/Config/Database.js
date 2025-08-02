const { MongoClient, ServerApiVersion } = require('mongodb');

const connectDB = async () => {
    if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI environment variable is not defined');
  }
    try {
    console.log('Attempting to connect to MongoDB...');