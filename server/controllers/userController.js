const {User} = require("../models/index")
const {compare} = require("../helpers/bcrypt")
const {token} = require('../helpers/generateToken')

class UserController{

    static register(req,res){
        const {email, password} = req.body
        User.create({email, password})
        .then(user=>{
            res.status(201).json({
                id: user.id,
                email: user.email
            })
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    }

    static login(req,res){
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
            else{
                throw({msg: "invalid email or password"})
            }
        })
        .catch(err=>{
            res.status(500).json({msg : "invalid email or password"})
        })
    }
}

module.exports = UserController