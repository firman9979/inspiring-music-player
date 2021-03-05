const router = require("express").Router()
const UserController = require('../controllers/userController')
const apiController = require("../controllers/apiController")
const {authenticate} = require('../middlewares/auth')

router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.post("/google-login", UserController.googleLogin)

router.use(authenticate);

router.get('/quotes', apiController.quotes)
router.get('/pictures', apiController.pictures)
router.get('/news', apiController.getNews)

module.exports = router