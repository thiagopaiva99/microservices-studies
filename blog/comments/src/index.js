const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { id: postId } = req.params;
  const { content } = req.body;
  const comments = commentsByPostId[postId] || [];
  comments.push({ id, content });
  commentsByPostId[postId] = comments;
  res.status(201).send({ id, content });
});

app.listen(4001, () => {
  console.log('[Comments Service] Listening on port 4000');
});
