const Make = require('../models/make');
const express = require('express');
const router = express.Router();
const Joi = require("joi")

router.post('/', async(req, res) => {
    console.log(req.body)
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let make = await Make.findOne({ where: { make: req.body.make } });
    if (make) return res.status(400).send('Brand already exists!!!');
    try {
        const brand = await Make.build(req.body, { fields: ['make'] }).save();
        // const result = await Make.create(req.body, { fields: ['make'] });
        return res.status(200)
            .send(brand)
    }
    catch (e) {
        console.info("error occured while inserting data in database")
    }
});

router.post('/bulkUpdate', async(req, res) => {
    console.log(req.body)
    try {
        const result = Make.bulkCreate(req.body, { ignoreDuplicates: true });
        return res.status(200).send(result)
    }
    catch (e) {
        return res.status(400)
    }
})

router.get('/', async(req, res) => {
    const result = await Make.findAll()
    return res.status(200).send(result)
})

function validate(req) {
    const schema = {
        make: Joi.string().min(3).max(255).required()
    };

    return Joi.validate(req, schema);
}

module.exports = router;
