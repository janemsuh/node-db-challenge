const express = require('express');
const db = require('../data/config');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const resources = await db('resources');
        res.json(resources);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const resource = await db('resources')
            .where('id', req.params.id)
            .first();
        if (!resource) {
            return res.status(404).json({
                message: 'Resource does not exist.'
            });
        }
        res.json(resource);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const resourceData = req.body;
        const [id] = await db('resources').insert(resourceData);
        const newResource = await db('resources').where({ id });
        res.status(201).json(newResource);
    } catch (err) {
        next(err);
    }
});

module.exports = router;