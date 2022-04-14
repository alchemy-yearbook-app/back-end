const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

// Built in middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  require('cors')({
    origin: [
      'http://localhost:7890',
      'https://iridescent-khapse-4fba07.netlify.app',
    ],
    credentials: true,
  })
);

// App routes
app.use('/api/v1/github', require('./controllers/githubAuth'));
app.use('/api/v1/profile', require('./controllers/profile'));
app.use('/orgs', require('./controllers/github'));
app.use('/api/v1/memorybook', require('./controllers/memorybook'));
// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
