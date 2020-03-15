const express = require('express');

const router = express.Router();

/**
 * Action:      INDEX
 * Method:      GET
 * URI:         /
 * Description: Get the Root Route
 */
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Blogy'
  });
});

module.exports = router;