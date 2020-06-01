const { Sequelize, sequelize } = require('../startup/db')
// Sequalize Operator Comparision
const Op = Sequelize.Op
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const config = require("../config/config")

const User = sequelize.define('user', {
    user_id: {
        primaryKey: true,
        type: Sequelize.UUID,
        autoIncrement: true,

    },
    name: Sequelize.STRING(30),
    email: { type: Sequelize.STRING(50), isEmail: true, },
    token: Sequelize.STRING(1000),
    is_admin: Sequelize.INTEGER
}, {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    // hooks: {
    //     afterCreate: async function(payment, options) {
    //       // send this to SQS
    //       await sendMessage(`${payment.entity_type}_payment_${payment.processed ? 'completed' : 'pending'}`, [payment.enuser_id, payment.user_id])
    //     },
    //     afterUpdate: async function(payment, options) {
    //       // send this to SQS
    //       if (payment.changed('processed')) {
    //         await sendMessage(`${payment.entity_type}_payment_${payment.processed ? 'completed' : 'pending'}`, [payment.enuser_id, payment.user_id])
    //       }
    //     },
    //     beforeUpdate: async function (payment, options) {
    //       if (payment.changed('emi_duration') && payment.emi_duration === 0) {
    //         // not allowed!
    //         throw {code: 'invalid_emi_conversion'}
    //       }
    //     },
    //     afterUpdate: async function(payment, options) {
    //       // update elastic search with billing info
    //       if (payment.emi_duration > 0) {
    //         await payment.createEmis(options.transaction)
    //       } else if (payment.convenience_fee) {
    //         await payment.createConvenienceFee()
    //       }
    //     },
    //     afterSave: async function(payment, options) {
    //       // update elastic search with billing info
    //       await sendMessage('updateElasticSearch',[payment.uuid])
    //     }
    // }
})

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


User.prototype.generateAuthToken = function() {
    const token = jwt.sign({
            user_id: this.user_id,
            name: this.name,
            email: this.email,
            is_admin: this.is_admin
        },
        config["secret"].jwtPrivateKey
    );
    return token;
};

User.findByEmail = async function(email) {
    try {
        let user = await sequelize.query("select user_id, email from user where email = ?", { replacements: [email], type: sequelize.QueryTypes.SELECT })
        console.log(user);
        if (user && user[0]) {
            return {
                user_id: user.user_id

            }
        }
    }
    catch (err) {
        console.log("Error in Database");
    }
    return null;

}
module.exports = User
