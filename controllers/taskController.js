const Task = require('../models/task');
const mongoose = require('mongoose');

// --- Controller Functions for CRUD Operations ---

/**
 * @desc    Create a new task
 * @route   POST /api/tasks
 * @access  Public
 */
exports.createTask = async (req, res) => {
    try {
        const { title, description, status, dueDate } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Title is a required field.' });
        }

        const newTask = new Task({
            title,
            description,
            status,
            dueDate
        });

        const savedTask = await newTask.save();
        res.status(201).json({ message: 'Task created successfully', task: savedTask });

    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Server error while creating task.' });
    }
};

/**
 * @desc    Get all tasks
 * @route   GET /api/tasks
 * @access  Public
 */
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Server error while fetching tasks.' });
    }
};

/**
 * @desc    Get tasks by ID or partial title
 * @route   GET /api/tasks/:identifier
 * @access  Public
 */
exports.getTask = async (req, res) => {
    try {
        const { identifier } = req.params;
        let tasks = []; 

        // serching through ID
        if (mongoose.Types.ObjectId.isValid(identifier)) {
            const taskById = await Task.findById(identifier);
            if (taskById) {
                // If a task is found by ID, this is the only result we want.
                tasks.push(taskById);
            }
        }
        
        //srching through title
        if (tasks.length === 0) {
            tasks = await Task.find({ title: { $regex: identifier, $options: 'i' } });
        }
        
        // Always return an array, even if it's empty.
        res.status(200).json(tasks);

    } catch (error) {
        console.error('Error fetching task:', error);
        res.status(500).json({ message: 'Server error while fetching the task.' });
    }
};


/**
 * @desc    Update an existing task by ID
 * @route   PUT /api/tasks/:id
 * @access  Public
 */
exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid Task ID format.' });
        }
        
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found.' });
        }

        res.status(200).json({ message: 'Task updated successfully', task: updatedTask });

    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Server error while updating task.' });
    }
};

/**
 * @desc    Delete a task by ID
 * @route   DELETE /api/tasks/:id
 * @access  Public
 */
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid Task ID format.' });
        }

        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found.' });
        }

        res.status(200).json({ message: 'Task deleted successfully.' });

    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Server error while deleting task.' });
    }
};