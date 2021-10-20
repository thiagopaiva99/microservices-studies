const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post('http://posts-service:4000/events', event).catch(console.log);
  // axios.post('http://localhost:4001/events', event).catch(console.log);
  // axios.post('http://localhost:4002/events', event).catch(console.log);
  // axios.post('http://localhost:4003/events', event).catch(console.log);

  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log(`[Event Bus Service] Listening on 4005`);
});
