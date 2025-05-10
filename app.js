const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const path = require('path');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');

const app = express();


mongoose.connect('mongodb://localhost:27017/book-management');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(methodOverride('_method'));


app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout');


app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/book-management' }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 } 
}));


app.use(flash());


app.use(passport.initialize());
app.use(passport.session());


require('./config/passport')(passport);


app.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});


const bookRoutes = require('./routes/books');
const userRoutes = require('./routes/users');

app.use('/books', bookRoutes);
app.use('/', userRoutes);


app.get('/', (req, res) => {
    res.redirect('/books');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 