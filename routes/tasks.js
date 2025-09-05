const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// --- Define CRUD Routes ---

// CREATE
router.post('/', taskController.createTask);

// READ
router.get('/', taskController.getAllTasks);

// READ
router.get('/:identifier', taskController.getTask);

// UPDATE
router.put('/:id', taskController.updateTask);

// DELETE
router.delete('/:id', taskController.deleteTask);


module.exports = router;