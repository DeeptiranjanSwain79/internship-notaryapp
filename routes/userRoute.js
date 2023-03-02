const express = require('express');
const { createProfile } = require('../controllers/userController');
const router = express.Router();

router.route('/createProfile').post(createProfile);

module.exports = router;