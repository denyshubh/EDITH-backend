const User = require("../models/user")
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");

router.post("/", async(req, res) => {
    console.log(req.body)
    let user = await User.findByEmail(req.body.email)
    if (user) return res.status(400).send("User already registered.");
    console.log('USER DOESNOT EXISTS')
    try {
        const salt = await bcrypt.genSalt(10);
        req.body["token"] = await bcrypt.hash(req.body.token, salt);
        const user = await User.create(req.body, { fields: ['email', 'token', 'name', 'is_admin'] });
        console.log(JSON.stringify(user))
        const token = user.generateAuthToken();
        return res
            .status(200)
            .header("x-auth-token", token)
            .header("access-control-expose-headers", "x-auth-token")
            .send(_.pick(user, ["user_id", "name", "email"]));
    }
    catch (e) {
        console.log('Error Occured', e)
        return res.status(400)
    }
})

router.get("/", async(req, res) => {
    console.log("YOU CALLED ME !!!!")
})

module.exports = router;
