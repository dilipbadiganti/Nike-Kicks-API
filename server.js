require('dotenv').config()
const mongoose = require('mongoose')

const express = require('express')
const Product = require('./model/product_model')
const app = express()



app.use(express.json())



//routes

app.get('/',(req,res)=>{
    res.send('Welcome Home')
})

app.get('/products', async(req,res)=>{

    try {
        const products = await Product.find({});
        res.status(200).json(products)
        
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
})


//get product by id

app.get('/products/:id', async(req,res)=>{
    try {
        const {id} = req.params
        const products = await Product.findById(id);
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})



//create new product

app.post('/products', async(req,res)=>{

    try {
        const products = await Product.create(req.body)
        res.status(200).json(products)

    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})   
    }    
})

//update the product

app.put('/products/:id',async(req,res)=>{
    try {
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message:`Product ID ${id} is not found...`})
        }
        res.status(200).json(product)
         
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
})


//delete product 

app.delete('/products/:id', async(req,res)=>{

    try {
        const {id} = req.params
        const products = await Product.findByIdAndDelete(id)
        res.status(200).json(products)
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
        
    }
    
})

const port = 3001

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log('connected to DB...')
    app.listen(port,()=>{
        console.log('Listening on 3001...')
    })
 
}).catch((error)=>{
    console.log(error)
})
