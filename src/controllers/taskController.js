const Task = require('../models/taskModel');

const createTask = async (req, res) => {
    const { title, description } = req.body;
    try {
        const task = await Task.create({
            user: req.user._id,
            title,
            description
        });
       /* res.status(201).json(task);*/
       res.status(200).json("Task created successfully");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        res.json(tasks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    try {
        const task = await Task.findByIdAndUpdate(id, { title, description, completed }, { new: true });
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        await Task.findByIdAndDelete(id);
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
