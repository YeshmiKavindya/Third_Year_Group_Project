const { MongoClient, ServerApiVersion } = require('mongodb');

const connectDB = async () => {
    if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI environment variable is not defined');
  }
    try {
    console.log('Attempting to connect to MongoDB...');
    const client = new MongoClient(process.env.MONGO_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
 
    await client.connect();
    console.log("Successfully connected to MongoDB!");
    return client;
    } catch (error) {
    console.error("MongoDB connection error:", error);
    console.error("Please check your MONGO_URI in .env file");
    process.exit(1);
  }