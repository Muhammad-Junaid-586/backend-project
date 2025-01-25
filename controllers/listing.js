const Listing = require('../models/listing')


module.exports.index = async (req, res, next) => {
  const { search, category } = req.query; // Get the search query and category from the query string
  let filter = {}; // Default filter is empty (this will show all listings if no filter is applied)

  // Add filtering logic for search
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } }, // Case-insensitive search in the title
      { location: { $regex: search, $options: "i" } }, // Case-insensitive search in the location
    ];
  }

  // Add filtering logic for category if provided
  if (category) {
    filter.category = { $regex: `^${category}$`, $options: "i" }; // Case-insensitive exact match for category
  }
  // if (category) {
  //   filter.category = category; // Filter by the selected category
  // }

  // Fetch listings based on the combined filter
  const allListing = await Listing.find(filter);

  // Render the view with the listings, search term, and category
  res.render('./listings/index.ejs', { allListing, search: search || '', category: category || '' });
};

// module.exports.index = async (req,res,next)=>{
 
//   const allListing = await Listing.find();
//   res.render('./listings/index.ejs', {allListing})
//    // res.send('working fine')

// }




module.exports.renderNewForm = (req,res)=>{
 
  res.render('./listings/new.ejs')
  }


  // module.exports.showListings = async (req,res) => {
  //   let {id} = req.params;
  //   let listing = await Listing.findById(id).populate({path : 'reviews', populate : {path : 'author'}}).populate('owner');
  //   if (!listing) {
  //     req.flash('error', 'Listing you request for does not exist')
  //     res.redirect('/listings')
  //   }
  //   // console.log(listing);
    
  //   res.render('./listings/show.ejs', {listing});
  //   }

  module.exports.showListings = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate({
      path: 'reviews',
      populate: { path: 'author' },
    }).populate('owner');
  
    if (!listing) {
      req.flash('error', 'Listing you requested does not exist');
      res.redirect('/listings');
    }
  
    // Render the single listing page without the search parameter
    res.render('./listings/show.ejs', { listing });
  };
  

  
  
  

    module.exports.createListing =  async (req,res,next) => {

      //  if (!req.body.listing) {
      //   throw new ExpressError(400, 'Send Valid Data For Listing')
      
      //  }
      console.log(req.body);
      
      let url = req.file.path;
      let filename = req.file.filename;
      
      const newListing = new Listing(req.body.listing);
      newListing.owner = req.user._id;
      newListing.image = {url, filename};
      await newListing.save();
      req.flash('success', 'New Listing Is Added!')
      res.redirect('/listings');
      
      }

      module.exports.renderEditForm = async (req,res) => {
      let {id} = req.params;
      let listing = await Listing.findById(id);
      if (!listing) {
        req.flash('error', 'Listing you request for does not exist')
        res.redirect('/listings')
      }
      let originalImageUrl =  listing.image.url;
      // originalImageUrl = originalImageUrl.replace('/upload', '/upload/blur_200,w_80,h_80')
      originalImageUrl = originalImageUrl
      res.render('./listings/edit.ejs', {listing, originalImageUrl});
      }

      module.exports.updateListing = async (req, res) => {
        // if (!req.body.listing) {
        //   throw new ExpressError(400, 'Send Valid Data For Listing')
        //  }
        const {id} = req.params;
        let listing =  await Listing.findByIdAndUpdate(id, {...req.body.listing}, {new: true});
        if (typeof req.file !== 'undefined') {
          // let url = req.file.path;
          // let filename = req.file.filename;
          const { path: url, filename } = req.file;
          listing.image = {url,filename};
          await listing.save()
        }
        // console.log(listing.image);
        
         req.flash('success', 'Listing Is Updated!')
        res.redirect(`/listings/${id}`);
      }

      module.exports.deleteListing = async (req, res) => {
        const {id} = req.params;
        await Listing.findByIdAndDelete(id);
        req.flash('success', 'Listing Is Deleted!')
        res.redirect('/listings');
        
      }