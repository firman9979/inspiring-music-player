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
                throw new Error()
            })
    } catch (error) {
        res.status(401).json({message:"Unauthorized"})
    }
}

module.exports = {authenticate}