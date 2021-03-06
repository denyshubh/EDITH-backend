const express = require('express');
const users = require('../routes/users');
const auth = require('../routes/auth');
const locations = require('../routes/locations');
const makes = require('../routes/makes');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use('/api/locations', locations);
    app.use('/api/makes', makes);

}
