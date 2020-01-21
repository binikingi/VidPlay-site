const models = require('../db');
const router = require('express').Router();

router.get('/health', (req, res) => {
  res.sendStatus(404);
});

router.get('/users', (req, res) => {
  models.User.findOne({
    raw: true
  })
      .then(user => {
        res.json(user);
      })
});

module.exports = router;
