/*
 * Write your routing code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name: Saranya Sounder Rajan
 * Email: sounders@oregonstate.edu
 */

var path = require('path');
var express = require('express');
var expressHB = require('express-handlebars');
var app = express();
var port = process.env.PORT || 3000;
var postData = require('./postData.json');
var picPost;

app.engine('handlebars', expressHB.engine({
  defaultLayout: 'main' // Set the default layout file to `main.handlebars`
}));
app.set('view engine', 'handlebars');//// Set Handlebars as the view engine

app.use(express.static('static'));

// Route to render the main posts page with all posts
app.get('', function (req, res) {
  picPost = postData;
  res.render('postsPage', { picPost });
});

app.get('/:picPostNum', function (req, res, next) {
  var picPostNum = req.params.picPostNum;// get the post number from the URL parameter

  // Check if the post number is valid (between 1 and 8)
  if (picPostNum > 0 && picPostNum <= 8) {
    picPost = [postData[picPostNum - 1]];
    res.status(200).render('postsPage', { picPost }); //Render the page with the single post data
  }
  else {
    next(); //404 page
  }
})

app.get('*', function (req, res) {
  res.status(404).render('404')
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});