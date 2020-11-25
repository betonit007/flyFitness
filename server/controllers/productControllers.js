const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')

const getProducts = asyncHandler(async (req, res) => {

    const pageSize = 10 //how many different products per a page.
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword ? { //whatever follows a question mark in query string
        name: {
            $regex: req.query.keyword,  //using a reg expression so search doesn't have to be an exact match
            $options: 'i' 
        }
    } : {}

    const count = await Product.countDocuments({...keyword}) //count mongoose method returns the amount of entries for particular model
    const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1)) //limit and ship method used to find correct slice of products we need.

    res.json({ products, page, pages: Math.ceil( count / pageSize)})
})

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    
    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    
    if (product) {
      await product.remove()
      res.json({message: 'Product removed'})
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})


const createProduct = asyncHandler(async (req, res) => {

    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample Brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: "Sample description"
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

const updateProduct = asyncHandler(async (req, res) => {

    const { name, price, description, image, brand, category, countInStock } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {

        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.status(201).json(updatedProduct)

    } else {
        res.status(404)
        throw new Error('Product not found')
    }

    
})

//Create a new review for a product
const createNewReview = asyncHandler(async (req, res) => {

    const { rating, comment } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {

        //check to see if user already reviewd
        const alreadyReviewed = product.reviews.find(review => review.user.toString() === req.user._id.toString())
        if(alreadyReviewed) {
            res.status(400)
            throw new Error('Product already reviewed')
        }
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.push(review)
        
        product.numReviews = product.reviews.length

        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0)/ product.reviews.length

        await product.save()

        res.status(201).json({message: 'Review added'})

    } else {
        res.status(404)
        throw new Error('Product not found')
    }

    
})

//Get top rated products
const getTopRatedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)
  res.json(products)
    
})

module.exports =  {
    getProductById,
    getProducts,
    deleteProduct,
    createProduct,
    updateProduct,
    createNewReview,
    getTopRatedProducts
}