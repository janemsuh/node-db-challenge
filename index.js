const express = require('express');
const server = express();
const port = 5000;

const projectsRouter = require('./routers/projects-router');
const tasksRouter = require('./routers/tasks-router');
const resourcesRouter = require('./routers/resources-router');

server.use(express.json());

server.get('/', (req, res) => {
    res.json({
        message: 'The Node DB Challenge API is alive!'
    });
});

server.use('/projects', projectsRouter);
server.use('/tasks', tasksRouter);
server.use('/resources', resourcesRouter);

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});