const Router = require('express')
const router = Router()
const userController = require('../controllers/user.controllers')

router.get('/user', userController.getUsers)
router.post('/user', userController.createUser)
router.get('/user/:id', userController.getOneUser)

router.put('/user', userController.updateUser)
router.delete('/user/:id', userController.deleteUser)


module.exports = router