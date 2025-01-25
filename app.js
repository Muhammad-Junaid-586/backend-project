if (process.env.NODE_ENV != 'production') {
  
  require('dotenv').config();
}

// console.log({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_SECRET_CODE,
// });

// console.log(process.env.SECRET);


const express = require('express');
const app = express();
const Port = 8080;
const mongoose = require('mongoose');
const Listing = require('./models/listing.js')
const path = require('path')
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const wrapAsync = require('./utilis/wrapAsync.js');
const ExpressError = require('./utilis/ExpressError.js');
const listingsRoute = require('./routes/listing.js')
const reviewsRoute = require('./routes/review.js')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const flash = require('connect-flash')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/user.js')

const userRoute = require('./routes/user.js')

const { listingSchema, reviewSchema } = require('./schema.js');
const listing = require('./models/listing.js');


const mongoUrl = process.env.MONGODB_CONNECTION_URL;


main().then(()=>{
  console.log('Connected Successfuly');
  
}).catch((err)=>{
  console.log('Error',err);
})

async function main() {
  await mongoose.connect(mongoUrl)
}


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.set("views", __dirname + "/views");
app.use(express.urlencoded({extended : true}))
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')))


const store = MongoStore.create({
  mongoUrl : mongoUrl,
  crypto : {
    secret : process.env.SECRET,
    },
    touchAfter : 24*60*60 
  }
)

store.on('error', ()=>{
  console.log('Error in MongoDb Store', err)
})

const sessionOptions = {
  store,
  secret : process.env.SECRET,
  resave : false,
  saveUninitialized : false,
  cookie : {
    expires : Date.now() + 7 *24*60*60*1000,
    maxAge : 7 *24*60*60*1000,
    httpOnly : true,
  }
}






app.use(session(sessionOptions))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())




app.use((req,res,next)=>{
  res.locals.success = req.flash('success')
  res.locals.error = req.flash('error')
  res.locals.currUser = req.user;
  next()
})

// app.get('/demouser', async (req, res) => {
//   let  newUser = new User({
//     email : 'junaid@gmail.com',
//     username : 'junaid'
//   })

//   let registeredUser = await User.register(newUser, 'junaid123');
//   res.send(registeredUser)
// })

app.use('/listings', listingsRoute);
app.use('/listings/:id/reviews', reviewsRoute);
app.use('/', userRoute)

  

  app.all('*', (req, res, next)=>{
    res.status(404).send('Page Not Found')
  })

  app.use((error,req, res, next)=>{
    let {status=500, message='Something Went Wrong!'} = error;
    // res.status(status).send(message);
    res.status(status).render('error.ejs', {message})
  })

app.listen(Port, ()=>{
  console.log(`Server is running on port ${Port}`);
})

