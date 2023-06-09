const { User, Thought } = require('../models');

const userController = {
async getAllUsers (req, res) {
    User.find({})
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
},
async getOneUser (req, res) {
    User.findOne({ _id: req.params.userId })
      .populate("thoughts")
      .populate("friends")
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User find with that ID!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
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