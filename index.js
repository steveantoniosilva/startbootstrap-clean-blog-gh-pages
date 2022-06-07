const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/my_database');

const app = express();
const ejs = require('ejs');

app.set('view engine', 'ejs');

const validateMiddleWare = require('./validationMiddleware/validateMiddleware');
const expressSession = require('express-session');

const fileUpload = require('express-fileupload');

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
app.get('/posts/new', newPostController);
app.post('/posts/store', storePostController);
app.get('/auth/register', newUserController);
app.post('/users/register', storeUserController);
app.get('/auth/login', loginController);
app.post('/users/login', loginUserController);
