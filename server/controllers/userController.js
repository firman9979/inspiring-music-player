const {User} = require("../models/index")
const {compare} = require("../helpers/bcrypt")
const {token} = require('../helpers/generateToken')

class UserController{

    static register(req, res){
        const data = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(data)
        .then(user=>{
            res.status(201).json({
                id: user.id,
                email: user.email
            })
        })
        .catch(err=>{
            let errorsArr = []
            err.errors.forEach(e => {
                errorsArr.push(e.message)
            })
            if (errorsArr) {
                res.status(400).json({message: errorsArr})
            } else {
                res.status(500).json({msg: "Invalid Server Error"})
            }
        })
    }

    static login(req, res,){
        const {email,password} = req.body
        User.findOne({where:{email}})
        .then(user=>{
            const match = compare(password, user.password)
            if(match){
                const access_token = token({
                    id: +user.id,
                    email
                })
                res.status(200).json({access_token})
            }
            else {
                throw({msg: "invalid email or password"})
            }
        })
        .catch(err=>{
            res.status(404).json({msg : "invalid email or password"})
        })
    }
}

module.exports = UserController