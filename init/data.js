const sampleData = [
  {
    title: "Elegant Penthouse with Skyline Views",
    description: "Top-floor penthouse with panoramic views of the city and luxurious amenities.",
    image: {
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      filename : 'ListingImage'

    } , // Direct link to an image
    price: 1800,
    location: "Sydney CBD",
    country: "Australia"
  },
  {
    title: "Charming Farmhouse with Orchards",
    description: "Spacious farmhouse surrounded by lush orchards. Ideal for family gatherings.",
    image: {
      url: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d",
      filename : 'ListingImage'

    } ,
  
    price: 350,
    location: "Tuscany",
    country: "Italy",
    category : 'Trending',
  },
  {
    title: "Minimalist Studio Apartment",
    description: "Compact and stylish studio in the heart of the city. Ideal for solo travelers.",
    image: {
      url: "https://images.unsplash.com/photo-1554995207-c18c203602cb",
      filename : 'ListingImage'

    } ,

    price: 120,
    location: "Tokyo",
    country: "Japan",
    category : 'Trending',
  },
  {
    title: "Luxurious Mountain Chalet",
    description: "High-end chalet with modern interiors and stunning mountain views.",
  
    image: {
      url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
      filename : 'ListingImage'

    } ,
  
    price: 950,
    location: "Swiss Alps",
    country: "Switzerland",
    category : 'Trending',
  },
  {
    title: "Seaside Bungalow with Private Garden",
    description: "Cozy bungalow just steps away from the beach. Private garden included.",
    image: {
      url: "https://images.unsplash.com/photo-1505142468610-359e7d316be0",
      filename : 'ListingImage'

    } ,
    
    price: 400,
    location: "Santorini",
    country: "Greece",
    category : 'Trending',
  },
];

module.exports = { data: sampleData };
