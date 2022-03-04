const Joi = require('joi')
const BaseModel = require('../utils/base-model')


module.exports = new BaseModel('Question', {
    label: Joi.string().required(),
    answers: Joi.array(),
    quizId: Joi.number()
})