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



module.exports = router;