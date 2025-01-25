const express = require('express');
const router = express.Router();
const wrapAsync = require('../utilis/wrapAsync.js');

const Listing = require('../models/listing.js')
const {isLoggedIn, isOwner, validateListing} = require('../middleware.js')

const multer = require('multer');
const { storage } = require('../cloudConfig.js'); // Update the path as needed
const upload = multer({ storage });


const listingControllers = require('../controllers/listing.js');
const listing = require('../models/listing.js');

router.route('/')
.get( wrapAsync(listingControllers.index))
.post(   isLoggedIn, upload.single('listing[image]'),validateListing, wrapAsync(listingControllers.createListing))




//  new route
router.get('/new',isLoggedIn, listingControllers.renderNewForm);

router.route('/:id')
.get( wrapAsync(listingControllers.showListings))
.put( isLoggedIn, isOwner, upload.single('listing[image]'),validateListing,
   wrapAsync(listingControllers.updateListing))
.delete(isLoggedIn,isOwner, wrapAsync(listingControllers.deleteListing))


// edit route
router.get('/:id/edit',isLoggedIn,isOwner, wrapAsync(listingControllers.renderEditForm))








module.exports = router;