const express = require('express');
const router = express.Router();

// Example route
router.get('/', (req, res) => {
  res.send('Referrals route is working!');
});

module.exports = router;
