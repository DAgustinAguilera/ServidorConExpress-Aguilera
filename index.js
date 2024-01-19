const express = require('express')
const ProductManager = require('./ProductManager')
const { parse } = require('path')

const app = express()
let product = new ProductManager

const onport = 8080

app.get('/', (req, res)=>{
    res.send("welcome")
})
app.get('/products', async(req, res)=>{
    let products = JSON.parse(await product.getProducts())
    console.log(products)
    let limit = req.query.limit
    if(req.query.limit){
        res.send(await products.slice(0 ,limit))
    }
    else{
        res.send(products)
    }

})
app.get('/products/:pid', async(req, res)=>{
    let pid = req.params["pid"]
    
    // console.log(products)
    // console.log(req.params)
    res.send(await product.getProductsById(Number(pid)))
})

app.listen(onport, ()=> {
    console.log("Server run on port 8080")
})