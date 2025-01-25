const mongoose = require('mongoose');
const { type } = require('../schema');
const Schema = mongoose.Schema;
const Reviews = require('./reviews');
const { string } = require('joi');

const listingSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  image: {
    url : String,
    filename : String
  },
  price: Number,
  location: String,
  country: String,
  reviews : [
    {
      type : mongoose.Types.ObjectId,
      ref : 'Review'
    }
  ],
  owner : {
    type : mongoose.Types.ObjectId,
    ref : 'User'
  },
  category: {
    type: String,
    // enum: ['Trending', 'Rooms', 'Iconic Cities', 'Mountains', 'Castles', 'Amazing Pools', 'Farms', 'Arctic', 'Camping'], // List of categories
    required: true, // Making sure that category must be selected when creating or editing a listing
  }
});

listingSchema.post('findOneAndDelete', async (listing) => {
  if (listing) {
    await Reviews.deleteMany({_id : {$in : listing.reviews}})
  }
  
})

const listing = mongoose.model('listing', listingSchema);
module.exports = listing;
