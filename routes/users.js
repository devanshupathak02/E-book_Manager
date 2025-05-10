const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');


const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'Please log in to access this page');
    res.redirect('/login');
};


router.get('/register', (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/books');
    }
    res.render('register');
});

router.post('/register', async (req, res) => {
    try {
        const { username, password, favoriteAuthor } = req.body;
        
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            req.flash('error', 'Username already exists. Please choose a different one.');
            return res.redirect('/register');
        }

        const user = new User({ username, password, favoriteAuthor });
        await user.save();
        
        req.flash('success', 'Registration successful! Please login with your credentials.');
        res.redirect('/login');
    } catch (err) {
        const errorMessage = err.name === 'ValidationError' 
            ? Object.values(err.errors).map(e => e.message).join(', ')
            : 'Registration failed. Please try again.';
        req.flash('error', errorMessage);
        res.redirect('/register');
    }
});


router.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/books');
    }
    res.render('login');
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/books',
        failureRedirect: '/login',
        failureFlash: 'Invalid username or password. Please try again.',
        successFlash: 'Welcome back!'
    })(req, res, next);
});


router.get('/logout', (req, res) => {
    req.logout(() => {
        req.flash('success', 'You have been successfully logged out.');
        res.redirect('/login');
    });
});

module.exports = router; 