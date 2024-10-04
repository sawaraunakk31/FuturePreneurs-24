import mongoose from 'mongoose';
import { BondBidding }from './bondBidding.model.js'; // Import your BondBidding model

// Function to connect to MongoDB
async function connectMongo() {
  try {
    const uri = process.env.MONGO_URI || 'mongodb+srv://darshnahar2023:xrcBHoK2mD8wgQZX@round1-testing.uwyo8.mongodb.net/';
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

// Function to initialize the `currentBidders` array
async function initializeCurrentBidders() {
  try {
    // Connect to the database
    await connectMongo();

    // Find the bond bidding document or create a new one if it doesn't exist
    let bondBidding = await BondBidding.findOne();
    if (!bondBidding) {
      bondBidding = new BondBidding();
    }

    // Set the `currentBidders` field to an array of 50 null values
    bondBidding.currentBidders = Array(50).fill(null);

    // Save the updated document
    await bondBidding.save();
    console.log('BondBidding currentBidders array initialized to 50 null values');
  } catch (err) {
    console.error('Error initializing currentBidders array:', err);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
}

// Run the initialization
initializeCurrentBidders();
