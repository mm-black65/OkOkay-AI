const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

router.get('/', protect, (req, res) => {
    res.json({ message: 'Get interviews' });
});

module.exports = router;
