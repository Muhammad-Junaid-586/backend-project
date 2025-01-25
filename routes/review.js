const express = require('express');
const router = express.Router({mergeParams : true});
const wrapAsync = require('../utilis/wrapAsync.js');
const ExpressError = require('../utilis/ExpressError.js');
const listings = require('../routes/listing.js')

const listing = require('../models/listing.js');
const Review = require('../models/reviews.js');
const Listing = require('../models/listing.js');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware.js');
const reviewController = require('../controllers/review.js')




// reviews
  // post route
  router.post('/',isLoggedIn, validateReview , wrapAsync(reviewController.createReview)
 )

 // Delete Review Route
 router.delete('/:reviewId',isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview))


 module.exports = router;