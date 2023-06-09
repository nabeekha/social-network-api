const { User, Thought } = require('../models');


const userController = {
    // function to get all users
async getAllUsers (req, res) {
    User.find({})
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
},
// function to get one user 
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
// function to create users
async createUser (req, res) {
    try {
        const dbUser = await User.create(req.body)
        res.json(dbUser)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
},
async updateOneUser (req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        .then((user) =>
          !user
            ? res.status(404).json({ message: "There is no user with this ID" })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
},
//function to add a friend
async addOneFriend (req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      )
        .then((user) =>
          !user
            ? res.status(404).json({ message: "There is no user with this ID" })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
},
//function to delete a friend
async deleteOneFriend (req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      )
        .then(
          (user) =>
            !user
              ? res.status(404).json({ message: "There is no user with this ID" })
              : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
},
}

module.exports = userController