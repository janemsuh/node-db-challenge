const express = require('express');
const db = require('../data/config');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const projects = await db('projects');
        res.json(projects);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const project = await db('projects')
            .where('id', req.params.id)
            .first();
        if (!project) {
            return res.status(404).json({
                message: 'Project does not exist.'
            });
        }
        res.json(project);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const projectData = req.body;
        const [id] = await db('projects').insert(projectData);
        const newProject = await db('projects').where({ id });
        res.status(201).json(newProject);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const payload = {
            name: req.body.name,
            description: req.body.description,
            completed: req.body.completed
        };
        res.json(await db('projects').where('id', req.params.id).update(payload));
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        res.json(await db('projects').where('id', req.params.id).del());
    } catch (err) {
        next(err);
    }
});

module.exports = router;