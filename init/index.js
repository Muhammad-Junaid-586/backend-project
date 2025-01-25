const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');

main().then(()=>{
  console.log('Database connected');
}).catch((err)=>{
  console.log('Error connecting to database:', err);
})
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test')
}

async function initDb() {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj)=>({
    ...obj, owner : '678cce7bf88cf6e4c186a503'
  }))
  await Listing.insertMany(initData.data);
  console.log('Initailized Db');
  
}
initDb();