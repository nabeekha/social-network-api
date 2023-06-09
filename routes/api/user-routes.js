const router = require('express').Router()
const { getAllUsers, getOneUser, addOneFriend, deleteOneUser, deleteOneFriend, updateOneUser, createUser } = require('../../controllers/user-controller')


// add get route to this 
router.route('/').get(getAllUsers).post(createUser)

//Get user, put and delete by User's ID
router.route('/:userId')
.get(getOneUser)
.put(updateOneUser)
.delete(deleteOneUser)

//post and delete a friend by ID
router.route('/:userId/friends/:friendId')
.post(addOneFriend)
.delete(deleteOneFriend)

module.exports = router