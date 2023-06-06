import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    const DBHOST = process.env.DBHOST || ""
    try {
        await mongoose.connect(DBHOST);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

export default connectDB;

