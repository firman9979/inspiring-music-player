const bcrypt = require('bcryptjs')

const hashing = (password)=>{
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt)
}

const compare = (input, password)=>{
    return bcrypt.compareSync(input, password)
}

module.exports = {hashing, compare}