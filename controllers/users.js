const express = require('express')
const router  = express.Router()
const db = require('../models')
// GET /users/new -- render a form to create a new user
router.get('/new', (req, res) => {
    
    res.render('users/new')
})
// POST/users -- create a new user in the db
router.post('', async (req, res) => {
    // console.log(req.body)
    // res.send('create a new user in the db')
    try {
        // create a new user
        const user = await db.user.create(req.body)
        // store that new user's id as a cookie in the browser
        res.cookie('userId', user.id)
        // redirect tp the homepage
        res.redirect('/')
    } catch(err) {
        console.log(err)
    } 
})
// GET /users/login -- shows a login form to the user
router.get('/login', (req, res) => {
    res.render('users/login', {
        message: req.query.message ? req.query.message : null
    })
})
// POST / users/login -- accept a payload of form data and use it log a user in
router.post('/login', async (req, res) => {
    try {
        // look uo the user in the db using the supplied email
        const user = await db.user.findOne({
            where : {
                email: req.body.email
            }
        })
        const message = "Incorrect username or password"
        if (!user) {
            console.log('message')
            res.redirect('/users/login?message=' + message)
        } else if (user.password !== req.body.password) {
            console.log('message')
            res.redirect('/users/login?message=' + message)
        } else {
            console.log('loggin the user in')
            res.cookie('userId', user.id)
            res.redirect('/')
        }
    } catch (err) {
        console.log(err)
        res.send('server eror')
    }
})
// GET /users/logout -- log out a user by clearing the stored cookie
router.get('/logout', (req, res) => {
    // clear the cookie
    res.clearCookie('userId')
    res.redirect('/')
})


module.exports = router;