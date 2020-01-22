require('dotenv').config();
const express = require('express');
const next = require('next');

const api = require('./api');

const dev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 3000;
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare().then(() => {
      const server = express();
      server.get('/health', (req, res) => {
        res.sendStatus(200);
      });
      server.use('/api', api);

      server.get('*', (req, res) => {
        return handle(req, res)
      });

      server.listen(PORT, (err) => {
        if (err) {
          throw err;
        }
        console.log('> Ready on http://localhost:3000')
      });
    });
