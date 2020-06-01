const Location = require('../models/location');
const express = require('express');
const router = express.Router();
const Joi = require("joi")

router.post('/', async(req, res) => {
    console.log(req.body)
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let location = await Location.findOne({ where: { location: req.body.location } });
    if (location) return res.status(400).send('Location already exists!!!');
    try {
        const result = await Location.create(req.body, { fields: ['location'] });
        return res.status(200)
            .send(result)
    }
    catch (e) {
        console.info("error occured while inserting data in database")
    }
});

router.get('/', async(req, res) => {
    const result = await Location.findAll()
    return res.status(200).send(result)
})

function validate(req) {
    const schema = {
        location: Joi.string().min(3).max(255).required()
    };

    return Joi.validate(req, schema);
}

module.exports = router;
