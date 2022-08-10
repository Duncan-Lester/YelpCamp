const mongoose = require('mongoose');
const review = require('./review')
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
            url: String,
            filename: String,
});

ImageSchema.virtual('thumbnail').get(function(){
   return this.url.replace('/upload','/upload/w_200');
});

const CampGroundsSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    images: [ImageSchema],
    price: Number,
    description: String,
    location: String,
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})

CampGroundsSchema.post('findOneAndDelete', async function (doc){
    if(doc){
        await review.deleteMany({
            _id:{
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campground', CampGroundsSchema);