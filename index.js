const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGOdb, () => {
  console.log('MongoDB has taken flight...');
});

const app = express();
const ejs = require('ejs');

const fileUpload = require('express-fileupload');
const validateMiddleWare = require('./validationMiddleware/validateMiddleware');
const expressSession = require('express-session');
const MemoryStore = require('memorystore')(expressSession);
const authMiddleware = require('./validationMiddleware/authMiddleware');
const redirectMiddleware = require('./validationMiddleware/redirectIfAuthenticatedMW');
const flash = require('connect-flash');

app.set('view engine', 'ejs');

global.loggedIn = null;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use('/posts/store', validateMiddleWare);
app.use(
  expressSession({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000,
    }),
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());
app.use('*', (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});

app.listen(process.env.PORT || 1940, () => {
  console.log('App listening...');
});

const homeController = require('./controllers/home');
const getPostController = require('./controllers/getPost');
const newPostController = require('./controllers/newPost');
const storePostController = require('./controllers/storePost');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const logoutController = require('./controllers/logout');

app.get('/', homeController);
app.get('/post/:id', getPostController);
app.get('/posts/new', authMiddleware, newPostController);
app.post('/posts/store', authMiddleware, storePostController);
app.get('/auth/register', redirectMiddleware, newUserController);
app.post('/users/register', redirectMiddleware, storeUserController);
app.get('/auth/login', redirectMiddleware, loginController);
app.post('/users/login', redirectMiddleware, loginUserController);
app.get('/auth/logout', logoutController);

app.use((req, res) => {
  res.render('notfound');
});
