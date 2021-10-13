const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { randomBytes } = require('crypto');

const posts = {};
app.use(bodyParser.json());

app.get('/posts', (req, res) => {
  res.send(Object.values(posts));
});

app.post('/posts', (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  posts[id] = { id, title };
  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log('[Posts Service] Listening on port 4000');
});
