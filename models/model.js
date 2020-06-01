const { Sequelize, sequelize } = require('../startup/db')
// Sequalize Operator Comparision
const Op = Sequelize.Op

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


const Model = sequelize.define('model', {
    model_id: {
        primaryKey: true,
        type: Sequelize.UUID,

    },
    model: Sequelize.STRING(100)
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


module.exports = Model
