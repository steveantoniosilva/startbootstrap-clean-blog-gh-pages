const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/my_database');

const app = express();
const ejs = require('ejs');

const fileUpload = require('express-fileupload');
const validateMiddleWare = require('./validationMiddleware/validateMiddleware');
const expressSession = require('express-session');
const authMiddleware = require('./validationMiddleware/authMiddleware');
const redirectMiddleware = require('./validationMiddleware/redirectIfAuthenticatedMW');

app.set('view engine', 'ejs');

global.loggedIn = null;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use('/posts/store', validateMiddleWare);
app.use(
  expressSession({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  })
);

app.use('*', (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});

app.listen(1940, () => {
  console.log('diesel on port 1940');
});

const homeController = require('./controllers/home');
const getPostController = require('./controllers/getPost');
const newPostController = require('./controllers/newPost');
const storePostController = require('./controllers/storePost');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');

app.get('/', homeController);
app.get('/post/:id', getPostController);
app.get('/posts/new', authMiddleware, newPostController);
app.post('/posts/store', authMiddleware, storePostController);
app.get('/auth/register', redirectMiddleware, newUserController);
app.post('/users/register', redirectMiddleware, storeUserController);
app.get('/auth/login', redirectMiddleware, loginController);
app.post('/users/login', redirectMiddleware, loginUserController);