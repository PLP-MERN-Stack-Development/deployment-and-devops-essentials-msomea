## MERN Blog Application

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) blog application with user authentication, CRUD functionality, category management, comments, and responsive UI with dark mode support.

## Features

* User registration and login (JWT authentication)
* Create, read, update, delete (CRUD) blog posts
* Add categories for posts (admin-only)
* Add comments on posts
* Responsive UI with light/dark mode toggle
* Sticky navigation and footer
* Slug generation for SEO-friendly URLs
* Tags for posts and filtering capability
* Image upload support

## Project Structure
      mern-blog/
      ├── client/                 # React front-end
      │   ├── public/
      │   ├── src/
      │   │   ├── components/     # Navbar, Footer, reusable UI components
      │   │   ├── pages/          # HomePage, PostPage, CreatePost, CategoryCreate
      │   │   ├── services/       # Axios API service
      │   │   ├── context/        # AuthContext for user authentication
      │   │   └── App.jsx
      │   └── package.json
      ├── server/                 # Express.js backend
      │   ├── config/             # Database and environment config
      │   ├── controllers/        # API controllers for posts, categories, auth
      │   ├── models/             # Mongoose models: User, Post, Category
      │   ├── routes/             # API routes
      │   ├── middleware/         # Auth and error handling
      │   └── server.js
      └── README.md

## Technologies Used

* Frontend: React.js, React Router, Axios, Context API
* Backend: Node.js, Express.js, Mongoose, MongoDB
* Authentication: JWT (JSON Web Tokens)
* Styling: CSS, responsive design, dark mode
* Utilities: Slug generation, input validation, error handling

## Installation & Setup
### Clone the repository
```
git clone https://github.com/yourusername/mern-blog.git
cd mern-blog
```
### Setup Backend
```
cd server
npm install
```
### Create a .env file in the server/ folder:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
### Start backend server:
```
npm run dev
```
### Setup Frontend
```
cd ../client
npm install
```
### Create a .env file in the client/ folder (optional for API URL):
```
VITE_API_URL=http://localhost:5000/api
```
### Start fronend
```
npm run dev
```

## Usage

1. Register a new user.

2. Log in with your account.

3. Create posts and add categories (if admin).

4. View posts, add comments, and explore tags/categories.

5. Toggle light/dark mode using the button in navbar.

6. Navigate using the sticky navbar; footer remains at the bottom.

## Author

Raphael Msomea – Developer

Email: msomearaphael@gmail.com

##  License

This project is licensed under the MIT License – see the LICENSE file for details.