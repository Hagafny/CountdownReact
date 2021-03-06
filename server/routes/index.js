const routes = require('express').Router();
const assignments = require('./assignments');
const courses = require('./courses');
const classes = require('./classes');
const managers = require('./managers');
const auth = require('./auth');

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Homie API' });
});

routes.use('/assignments', assignments);
routes.use('/courses', courses);
routes.use('/classes', classes);
routes.use('/managers', managers);
routes.use('/auth', auth);

module.exports = routes;
