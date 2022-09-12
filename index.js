//  require packages
require('dotenv').config()
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const cookieParser = require('cookie-parser')
const db = require('./models')

// config express app/middlewares
const app = express()
const PORT = process.env.PORT || 3000
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
// Our customer auth middleware
app.use(async (req, res, next) => {
    res.locals.myData = 'hello, fellow route'
    // console.log('hello from a middleware')
    // if there is a cookie on the incoming request
    if (req.cookies.userId) {
        const user = await db.user.findByPk(req.cookies.userId)
        res.locals.user = user
    } else {
        res.locals.user = null
    }
    // move on to the next route or middleware in the chain
    next()
})


// route definition
app.get('/', (req, res) =>{
    // console.log('incoming cookie 🍪', req.cookies)
    // console.log(res.locals.myData)
    console.log('The currently logged user is ', res.locals.user)
    res.render("home")
})

// controllers
app.use('/users', require('./controllers/users'))

// listen to a port
app.listen(PORT, () => {
    console.log(`Conneted to port ${PORT}`)
})