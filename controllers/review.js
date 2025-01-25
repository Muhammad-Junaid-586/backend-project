const Listing = require('../models/listing')
const Review = require('../models/reviews')


module.exports.createReview = async (req, res,) => {
  let listing = await Listing.findById(req.params.id);
 //  console.log(req.body);
 //  console.log(listing);
  
  
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  // console.log(newReview);
  

  listing.reviews.push(newReview)
  await newReview.save();
  await listing.save()
  req.flash('success', 'Review is Added!')
  res.redirect(`/listings/${listing._id}`)
}

module.exports.destroyReview = async(req, res)=>{
  let {id , reviewId} = req.params;
  await Listing.findByIdAndUpdate(id, {$pull : {reviews : reviewId}})
  await Review.findByIdAndDelete(reviewId);
  req.flash('success', 'Review is Deleted!')
  res.redirect(`/listings/${id}`)

}