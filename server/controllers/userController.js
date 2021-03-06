const {User} = require("../models/index")
const {compare} = require("../helpers/bcrypt")
const {token} = require('../helpers/generateToken')
const {OAuth2Client} = require('google-auth-library');

class UserController{

    static register(req, res, next){
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
            next(err)
        })
    }

    static login(req, res, next){
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
                next({code: 400, message: 'Email/password invalid.'})
            }
        })
        .catch(err=>{
            next({code: 400, message: 'Email/password invalid.'})
        })
    }

    static googleLogin (req, res, next) {
        let googleToken = req.body.token;
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: googleToken,
                audience: process.env.GOOGLE_CLIENT_ID
            })

            const payload = ticket.getPayload();
            console.log(payload);

            User.findOrCreate({
                where: {
                    email: payload.email
                },
                defaults: {
                    email: payload.email,
                    password: (new Date()).toLocaleString()
                }
            })
            .then(data => {
                let payload = {id: data[0].id, email: data[0].email}
                
                const access_token = token(payload);

                res.status(200).json({access_token})

            })
            .catch(err => {
                next(err)
            })
        }

        verify().catch(console.table)
    }
}

module.exports = UserController
