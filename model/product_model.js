const mongoose = require('mongoose')



const productSchema = mongoose.Schema(

    {

        name:{
            type:String,
            required:[true,"Please enter the product name"]
        },

        description:{
            type:String,
            required:false
        },

        sizeAvailable:{
            type:[String],
            default:["Out of Stock"],
        
        },
        image:{
            type:String,
            required:false
        }

    },
    {
        timestamps:true
    }
)

const Product = mongoose.model('Product', productSchema)


module.exports = Product