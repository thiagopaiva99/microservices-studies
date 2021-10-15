const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { id: postId } = req.params;
  const { content } = req.body;
  const comments = commentsByPostId[postId] || [];
  const status = 'pending';
  comments.push({ id, content, status });
  commentsByPostId[postId] = comments;
  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: { id, content, postId, status },
  });
  res.status(201).send({ id, content });
});

app.post('/events', async (req, res) => {
  console.log('Received Event', req.body.type);

  const { type, data } = req.body;

  if (type === 'CommentModerated') {
    const { postId, id, status, content } = data;
    const comments = commentsByPostId[postId];
    const comment = comments.find(({ id: commentId }) => commentId === id);
    comment.status = status;
    await axios.post('http://localhost:4005/events', {
      type: 'CommentUpdated',
      data: { id, status, postId, content },
    });
  }
  res.send({});
});

app.listen(4001, () => {
  console.log('[Comments Service] Listening on port 4001');
});
