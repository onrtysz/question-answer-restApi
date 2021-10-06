const express = require("express")

const dotenv = require("dotenv")
const router=require('./routers/index')
const connectDatabase=require('./helpers/database/connectDatabase.js')
const customerrorHandlers=require('./middlewares/errors/customerrorHandlers')
const path=require('path')

//Enviorment Variables
dotenv.config({
    path: './config/env/config.env'
})
//Database Connection
connectDatabase()
const app = express()
//Express -Body Middleware
app.use(express.json())
const PORT = process.env.PORT
//Static files
app.use(express.static(path.join(__dirname,"public")))
//Routers Middleware
app.use("/api",router)

//Error Handler
app.use(customerrorHandlers)


app.listen(PORT, () => {
    console.log(`App started on ${PORT}: ${process.env.NODE_EV}`)
})