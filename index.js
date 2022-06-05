const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

mongoose.connect('mongodb://localhost/my_database');

const app = express();
const ejs = require('ejs');

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const BlogPost = require('./models/BlogPost');

app.listen(1940, () => {
  console.log('diesel on port 1940');
});

app.get('/', async (req, res) => {
  const blogposts = await BlogPost.find({})
  console.log(blogposts);
  res.render('index.ejs', {
    blogposts
  });
});

app.get('/about', (req, res) => {
  res.render('about.ejs');
});

app.get('/contact', (req, res) => {
  res.render('contact.ejs');
});

app.get('/post', (req, res) => {
  res.render('post.ejs');
});

app.get('/posts/new', (req, res) => {
  res.render('create.ejs');
});

app.post('/posts/store', async (req, res) => {
  await BlogPost.create(req.body);
  res.redirect('/');
});
