// Create web server
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

// Create app
const app = express();
app.use(bodyParser.json());

// Create comments object
const commentsByPostId = {};

// Create route for GET requests
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Create route for POST requests
app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;
  // Get comments array for post
  const comments = commentsByPostId[req.params.id] || [];
  // Add new comment to array
  comments.push({ id: commentId, content });
  // Store array back in object
  commentsByPostId[req.params.id] = comments;
  // Send back new comment
  res.status(201).send(comments);
});

// Create web server
const port = 4001;
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Comments service listening on port ${port}`);
});