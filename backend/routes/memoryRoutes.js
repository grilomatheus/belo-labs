const express = require('express');
const { saveGameData, getGameHistory } = require('../controllers/memoryController');
const router = express.Router();

router.post('/save', saveGameData);

router.get('/history', getGameHistory);

module.exports = router;
