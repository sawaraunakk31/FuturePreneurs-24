import mongoose from 'mongoose';

const connectMongo = async () => {
    try {
        if (mongoose.connection.readyState === 1) return mongoose.connection.asPromise();

        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB connected');
    } catch (error) {
        console.log('MongoDB connection error', error);
    }
};

export default connectMongo;
