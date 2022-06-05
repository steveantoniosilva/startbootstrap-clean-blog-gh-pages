const mongoose = require('mongoose');

const BlogPost = require('./models/BlogPost');

mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true });

// BlogPost.create(
//   {
//     title: 'I will be a full-stack javascript engineer',
//     body: "they don't think i have fire in my belly",
//   },
//   (error, blogpost) => {
//     console.log(error, blogpost);
//   }
// );
var id = '629b9646228b32097b86d0b0';
BlogPost.findByIdAndDelete(id, (error, blogpost) => {
  console.log(error, blogpost);
});
