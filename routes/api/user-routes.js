const router = require('express').Router()
const { getAllUsers, getOneUser, addOneFriend, deleteOneFriend, updateOneUser, createUser } = require('../../controllers/user-controller')


// add get route to this 
router.route('/').get(getAllUsers).post(createUser)

module.exports = router