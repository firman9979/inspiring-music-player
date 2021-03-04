const router = require("express").Router()
const UserController = require('../controllers/userController')
const apiController = require("../controllers/apiController")

router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.get('/quotes', apiController.quotes)
router.get('/pictures', apiController.pictures)

module.exports = router