const express = require('express')
const path = require('path')
const dotenv = require("dotenv")
const colors = require("colors")
const connectDB = require("./config/db")
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')
const uploadRoute = require('./routes/uploadRoute')
const { errorHandler, notFound } = require("./middleware/errorMiddleware")

dotenv.config()

connectDB()

const app = express()
app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/user', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoute)

app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
})

//app.use('/uploads', express.static(path.join(__dirname, 'uploads'))) // image not found on front end when using this line (below works)
app.use('/uploads', express.static('uploads'))

//Sends back custom error message including requested route that was not found
app.use(notFound)
//Custom middleware for error handling
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}!`.yellow.bold))
