const router = require('express').Router();

const { createUser, login } = require('../controller/userController');

router.route('/register').post(createUser);
router.route('/login').post(login);

module.exports = router;