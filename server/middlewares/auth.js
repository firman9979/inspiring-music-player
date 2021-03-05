const {verifyToken} = require('../helpers/generateToken')
const {User} = require('../models')

const authenticate = (req, res, next) => {
    try {
        let {id, email} = verifyToken(req.headers.access_token)

        User.findOne({where: {id, email}})
            .then(user => {
                // Kondisi find user
                req.currentUser = {id, email}
                next()
            })
            .catch(err => {
                // Err validasi / Err server/sequelize
                // Params errnya dipakai
                next({code: 404, message: 'User not found.'})
            })
    } catch (error) {
        next({code: 401, message: 'Unauthorized content.'})
    }
}

module.exports = {authenticate}