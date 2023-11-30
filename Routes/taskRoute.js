const express = require('express');
const {createTask, getAllTasks, getTask, updateTask, deleteTask} = require('../controller/taskController');
const {} = require('../utils/jwtVerify');
const authenticateToken = require('../utils/jwtVerify');
 
const router = express.Router();

router.route('/tasks').get(getAllTasks).post(createTask);
router.route('/tasks/:id').get(getTask).put(authenticateToken, updateTask).delete(authenticateToken, deleteTask);

module.exports = router;