const express = require('express');
const User = require('../models/User');
const router = express.Router() //mini instance
const passport = require('passport');

// to show the form of signup
router.get('/register', (req, res) =>{
    res.render('auth/signup');
})

// actually want to register a user in my db
router.post('/register', async(req, res) =>{
    try{
    let {email, password, username, role} = req.body;
    const user = new User({email, username, role});
    const newUser = await User.register(user, password);
    // res.send(newUser);
    // res.redirect('/login');
    req.login(newUser, function(err){
        if(err){return next(err)}
        req.flash('success', 'You registered successfully');
        return res.redirect('/products');
    })
}
catch(e){
    req.flash('error', e.message);
    return res.redirect('/signup');
}
})


// to get a login form
router.get('/login', (req, res) =>{
    res.render('auth/login');
})


// to actually login via db
router.post('/login',
    passport.authenticate('local', { 
        failureRedirect: '/login',
        failureMessage: true
    }),
    (req, res) =>{
        req.flash('success', 'welcome back')
        res.redirect('/products');
})
// logout 
router.get('/logout', (req, res) =>{
    ()=>{
        req.logout();
    }
    req.flash('success', 'goodbye friends, see you soon')
    res.redirect('/login');
})

module.exports = router;
