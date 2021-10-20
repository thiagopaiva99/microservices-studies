const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();

const posts = {};

app.use(cors());
app.use(bodyParser.json());

const handleEvent = (data, type) => {
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
};

app.get('/posts', (req, res) => {
  res.send(Object.values(posts));
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  handleEvent(data, type);

  res.send({});
});

app.listen(4002, async () => {
  console.log(`[Query Service] Listening on port 4002`);

  const { data } = await axios.get('http://event-bus-service:4005/events');

  for (let event of data) {
    console.log(`Processing event: ${event.type}`);
    handleEvent(event.type, event.data);
  }
});
