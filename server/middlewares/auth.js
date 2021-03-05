const {verifyToken} = require('../helpers/generateToken')
const {User} = require('../models')

const authenticate = (req, res, next) => {
    try {
        let {id, email} = verifyToken(req.headers.access_token)

        User.findOne({where: {id, email}})
            .then(user => {
                req.currentUser = {id, email}
                next()
            })
            .catch(err => {
                next({code: 404, message: 'User not found.'})
            })
    } catch (error) {
        next({code: 401, message: 'Unauthorized content.'})
    }
}

module.exports = {authenticate}