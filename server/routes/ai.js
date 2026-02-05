const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

router.post('/chat', protect, (req, res) => {
    res.json({ message: 'AI Chat' });
});

module.exports = router;
