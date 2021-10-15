const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const posts = {};

app.use(cors());
app.use(bodyParser.json());

app.get('/posts', (req, res) => {
  res.send(Object.values(posts));
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, postId, content, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === 'CommentUpdated') {
    const { id, postId, content, status } = data;
    const { comments } = posts[postId];
    const comment = comments.find(({ id: commentId }) => commentId === id);
    comment.status = status;
    comment.content = content;
  }

  res.send({});
});

app.listen(4002, () => {
  console.log(`[Query Service] Listening on port 4002`);
});
