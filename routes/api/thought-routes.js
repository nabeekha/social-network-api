const router = require('express').Router()
const {getAllThoughts, getOneThought, createThought, updateOneThought, deleteOneThought, addOneFriend, deleteOneReaction, addOneReaction} = require('../../controllers/thought-controller')

router.route('/').get(getAllThoughts).post(createThought)

//routes for getting putting and deleting thoughts
router.route('/:thoughtId').get(getOneThought).put(updateOneThought).delete(deleteOneThought)

//route for adding reaction 
router.route('/:thoughtId/reactions').post(addOneReaction)

//route for deleting reactions 
router.route('/:thoughtId/reactions/:reactionId').delete(deleteOneReaction)

module.exports = router