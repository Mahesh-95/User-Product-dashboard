import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc    Add Product
// @route   POST /api/product
const addProduct = asyncHandler(async (req, res)=>{
    try {
        const body = req.body
        const isExistingProduct = await Product.findOne({'name' : body.name})
        if(isExistingProduct) {
             res.status(400).send( 'Product with same name exists')
        }
        else{
          const newProduct = new Product(body)
          const saveNewProduct = await newProduct.save()
          res.status(201).json(saveNewProduct)
  }
    } catch (error) {
      res.status(400).send({
        message : 'Something went wrong,please try again',
        error : error.message,
    })
    }
})

// @desc    Get all Product
// @route   Get /api/product
const getProducts = asyncHandler(async (req, res) => {
    try {
       const productsList = await Product.find()
        res.status(200).send(productsList)
    } catch (error) {
      res.status(400).send({
        message : 'Something went wrong,please try again',
        error : error.message,
      })
    }
  })

// @desc    Update Product By Id
// @route   PUT /api/product/:id
const updateProduct = asyncHandler(async (req, res) => {
    try {
      const updateProductInfo = await Product.findByIdAndUpdate(req.params.id,{$set : req.body},{new : true})
      res.status(200).json(updateProductInfo)
    } catch (error) {
      res.status(400).send({
        message : 'Something went wrong,please try again',
        error : error.message
    })
  
    }
  })

// @desc    Delete Product By Id
// @route   DELETE /api/product/:id
const deleteProduct = asyncHandler(async (req, res) => {
    try {
      const id = req.params.id
          const productData = await Product.findByIdAndDelete(id)
          if(productData){
              res.send('Product data deleted successfully')
          }
          else{
              res.status(404).send('Not found')
          }
        
    } catch (error) {
      res.status(400).send({
        message : 'Something went wrong,please try again',
        error : error.message
    })
    }
  })

// @desc    Get Product By Id
// @route   GET /api/product/:id
  const getProductById = asyncHandler(async (req, res) => {
    try {
      const id = req.params.id
      const productData = await Product.findById(id)
      if(productData){
          res.status(200).send(productData)
      }
      else{
          res.status(404).send('The Product you are looking does not exist')
      }
      
    } catch (error) {
      res.status(400).send({
        message : 'Something went wrong,please try again',
        error : error.message})
    }
    
  })


export {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
  }