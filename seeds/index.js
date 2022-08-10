const mongoose = require('mongoose');
const cities = require('./cities');
const Campground = require('../models/Campground');
const {places, descriptors} = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', ()=>{
    console.log('Database Connected');
});

const sample = array => array[Math.floor(Math.random()* array.length)];

const seedDB = async ()=>{
    await Campground.deleteMany({});
    for(let i=0; i<50; i++){
       const random1000 = Math.floor(Math.random() * 1000);
       const price = Math.floor(Math.random()*20)+ 10;
       const camp = new Campground({
            author: "62ed4a89978c08b3a536abf9",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'This is a sample campground seeded with a fake name and description!',
            price: price,
            images:[
                {
                  url: 'https://res.cloudinary.com/dw19446fx/image/upload/v1659986931/YelpCamp/fsdul17pqdjc0fxy80la.jpg',
                  filename: 'YelpCamp/fsdul17pqdjc0fxy80la',
                },
                {
                  url: 'https://res.cloudinary.com/dw19446fx/image/upload/v1659986932/YelpCamp/d4qpl1yt0drusgmvh3qc.jpg',
                  filename: 'YelpCamp/d4qpl1yt0drusgmvh3qc',
                },
                {
                  url: 'https://res.cloudinary.com/dw19446fx/image/upload/v1659986932/YelpCamp/ljmlrcs6epxqabffzpib.jpg',
                  filename: 'YelpCamp/ljmlrcs6epxqabffzpib',
                },
                {
                  url: 'https://res.cloudinary.com/dw19446fx/image/upload/v1659986933/YelpCamp/rqfylnyznd2gtvfghyph.jpg',
                  filename: 'YelpCamp/rqfylnyznd2gtvfghyph',
                },
                {
                  url: 'https://res.cloudinary.com/dw19446fx/image/upload/v1659986934/YelpCamp/okfyzylwejw8znr4pscz.jpg',
                  filename: 'YelpCamp/okfyzylwejw8znr4pscz',
                },
                {
                  url: 'https://res.cloudinary.com/dw19446fx/image/upload/v1659986934/YelpCamp/kgtromkjipcocydhiivw.jpg',
                  filename: 'YelpCamp/kgtromkjipcocydhiivw',
                },
                {
                  url: 'https://res.cloudinary.com/dw19446fx/image/upload/v1659986935/YelpCamp/rrce8apgx5xac7hvk9tt.jpg',
                  filename: 'YelpCamp/rrce8apgx5xac7hvk9tt',
                }
              ],
            
       })
       await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close;
}) ;