const express = require('express');
const router = express.Router();
const taskController = require('../controller/TaskController');

router.post('/add', taskController.add);
router.get('/', taskController.getAll);
router.get('/:id', taskController.getById);
router.put('/update/:id', taskController.update);
router.delete('/delete/:id', taskController.deleteTask);
router.delete('/delete', taskController.deleteAll);

module.exports = router;
