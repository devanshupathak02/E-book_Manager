# Book Management System

A full-stack web application for managing books with user authentication.

## Features

- User authentication (register, login, logout)
- CRUD operations for books
- Bootstrap-based responsive UI
- Form validation
- Session management
- MongoDB database integration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or accessible via connection string)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Make sure MongoDB is running on your system
4. Start the application:
   ```bash
   npm start
   ```
   For development with auto-reload:
   ```bash
   npm run dev
   ```

## Usage

1. Register a new account
2. Log in with your credentials
3. Start managing your books:
   - View all books
   - Add new books
   - Edit existing books
   - Delete books
   - View book details

## Project Structure

```
├── config/
│   └── passport.js
├── models/
│   ├── user.js
│   └── book.js
├── public/
│   └── css/
│       └── style.css
├── routes/
│   ├── books.js
│   └── users.js
├── views/
│   ├── books/
│   │   ├── edit.ejs
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   └── show.ejs
│   ├── layout.ejs
│   ├── login.ejs
│   └── register.ejs
├── app.js
├── package.json
└── README.md
```

## Security Features

- Password hashing using bcrypt
- Session-based authentication
- Protected routes
- Form validation
- CSRF protection

## Dependencies

- express
- mongoose
- passport
- express-session
- ejs
- bcryptjs
- connect-mongo
- bootstrap (CDN)

## License

MIT 