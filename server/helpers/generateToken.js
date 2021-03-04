const jwt = require("jsonwebtoken")
const token = (payload)=>{
    return jwt.sign(payload, process.env.SECRET)
}

const verifyToken = (access_token) => jwt.verify(access_token, process.env.SECRET)

module.exports = {token, verifyToken}