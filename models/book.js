const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        unique: true,
        trim: true,
        minlength: [1, 'Title cannot be empty']
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
        trim: true
    },
    genre: {
        type: String,
        required: [true, 'Genre is required'],
        trim: true
    },
    publishedDate: {
        type: Date,
        required: [true, 'Published date is required']
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot be more than 5']
    },
    review: {
        type: String,
        required: [true, 'Review is required'],
        trim: true,
        minlength: [10, 'Review must be at least 10 characters long']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Book', bookSchema); 