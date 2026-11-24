import mongoose from 'mongoose';

mongoose.set('bufferCommands', false);

let dbConnected = false;

export const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tripsphere';
  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 1500,
    });
    dbConnected = true;
    console.log(`[TripSphere Server] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    dbConnected = false;
    console.warn(`[TripSphere Server] Local MongoDB unavailable (${error.message}). Running with fallback memory inventory.`);
  }
};

export const isDbConnected = () => dbConnected && mongoose.connection.readyState === 1;
