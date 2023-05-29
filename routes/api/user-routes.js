const router = require('express').Router()
const { createUser } = require('../../controllers/user-controller')

// add post route to this 
router.route('/').post(createUser)

module.exports = router