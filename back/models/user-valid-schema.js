const yup = require('yup');

let schema = yup.object().shape({
    login: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required()
})

module.exports = schema;