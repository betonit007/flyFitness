const express = require('express')
const dotenv = require("dotenv")
const colors = require("colors")
const connectDB = require("./config/db")
const productRoutes = require('./routes/productRoutes')
const { errorHandler, notFound } = require("./middleware/errorMiddleware")

dotenv.config()

connectDB()

const app = express()

app.get('/', (req, res) => {
    res.send('API is running...')
})

app.use('/api/products', productRoutes)

//Sends back custom error message including requested route that was not found
app.use(notFound)
//Custom middleware for error handling
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}!`.yellow.bold))