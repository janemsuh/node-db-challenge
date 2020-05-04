const express = require('express');
const db = require('../data/config');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const tasks = await db('tasks as t')
            .join('projects as p', 'p.id', 't.project_id')
            .select(
                't.id',
                't.description',
                't.notes',
                't.completed',
                'p.id as project_id',
                'p.name as project_name',
                'p.description as project_description'
            )
        res.json(tasks);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const task = await db('tasks as t')
            .join('projects as p', 'p.id', 't.project_id')
            .where('t.id', req.params.id)
            .select(
                't.id',
                't.description',
                't.notes',
                't.completed',
                'p.id as project_id',
                'p.name as project_name',
                'p.description as project_description'
            )
        if (!task) {
            return res.status(404).json({
                message: 'Task does not exist.'
            });
        }
        res.json(task);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const taskData = req.body;
        const [id] = await db('tasks').insert(taskData);
        const newTask = await db('tasks').where({ id });
        res.status(201).json(newTask);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const payload = {
            description: req.body.description,
            notes: req.body.notes,
            completed: req.body.completed,
            project_id: req.project_id
        };
        res.json(await db('tasks').where('id', req.params.id).update(payload));
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        res.json(await db('tasks').where('id', req.params.id).del());
    } catch (err) {
        next(err);
    }
});

module.exports = router;