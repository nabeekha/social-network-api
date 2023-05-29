const { User, Thought } = require('../models');

const userController = {
async getAllUsers (req, res) {

},
async getOneUser (req, res) {

},
async createUser (req, res) {
    try {
        const dbUser = await User.create(req.body)
        res.json(dbUser)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
},
}

module.exports = userController