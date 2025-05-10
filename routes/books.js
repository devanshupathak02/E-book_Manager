const express = require('express');
const router = express.Router();
const Book = require('../models/book');


const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'Please log in to access this page');
    res.redirect('/login');
};


router.get('/', isAuthenticated, async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        res.render('books/index', { books });
    } catch (err) {
        req.flash('error', 'Error fetching books');
        res.redirect('/');
    }
});


router.get('/new', isAuthenticated, (req, res) => {
    res.render('books/new');
});


router.post('/', isAuthenticated, async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        req.flash('success', 'Book added successfully!');
        res.redirect('/books');
    } catch (err) {
        req.flash('error', 'Error creating book. Please try again.');
        res.render('books/new', { error: err.message });
    }
});


router.get('/:id', isAuthenticated, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            req.flash('error', 'Book not found');
            return res.redirect('/books');
        }
        res.render('books/show', { book });
    } catch (err) {
        req.flash('error', 'Error fetching book');
        res.redirect('/books');
    }
});


router.get('/:id/edit', isAuthenticated, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            req.flash('error', 'Book not found');
            return res.redirect('/books');
        }
        res.render('books/edit', { book });
    } catch (err) {
        req.flash('error', 'Error fetching book');
        res.redirect('/books');
    }
});


router.put('/:id', isAuthenticated, async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!book) {
            req.flash('error', 'Book not found');
            return res.redirect('/books');
        }
        req.flash('success', 'Book updated successfully!');
        res.redirect('/books');
    } catch (err) {
        req.flash('error', 'Error updating book');
        res.redirect(`/books/${req.params.id}/edit`);
    }
});


router.delete('/:id', isAuthenticated, async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            req.flash('error', 'Book not found');
            return res.redirect('/books');
        }
        req.flash('success', 'Book deleted successfully!');
        res.redirect('/books');
    } catch (err) {
        req.flash('error', 'Error deleting book');
        res.redirect('/books');
    }
});

module.exports = router; 