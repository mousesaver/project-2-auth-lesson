//  require packages
require('dotenv').config()
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')

// config express app/middlewares
const app = express()
const PORT = process.env.PORT || 3000
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(express.urlencoded({extended: false}))
// route definition
app.get('/', (req, res) =>{
    res.render("home")
})

// controllers
app.use('/users', require('./controllers/users'))

// listen to a port
app.listen(PORT, () => {
    console.log(`Conneted to port ${PORT}`)
})