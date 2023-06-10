const { User, Thought } = require('../models');

const thoughtController = {
 // function to get all thoughts
 async getAllThoughts (req, res) {
    User.find({})
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
},
// function to get one thought 
async getOneThought (req, res) {
    thought.findOne({ _id: req.params.thoughtId })
      .populate("thoughts")
      .populate("friends")
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought find with that ID!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
},
// function to create thoughts
async createThought (req, res) {
    try {
        const dbthought = await thought.create(req.body)
        res.json(dbthought)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
},
async updateOneThought (req, res) {
    thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: "There is no thought with this ID" })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
},
async deleteOneThought (req, res) {
    thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "There is no thought with this ID" })
          : Thought.deleteMany({ _id: { $in: thought.thoughts } })
      )
      .then(() => res.json({ message: "Deleted the thought and thought" }))
      .catch((err) => res.status(500).json(err));
},
//function to add a friend
async addOneFriend (req, res) {
    thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: "There is no thought with this ID" })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
},
//function to delete a friend
async deleteOneReaction (req, res) {
    thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      )
        .then(
          (thought) =>
            !thought
              ? res.status(404).json({ message: "There is no thought with this ID" })
              : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
},
}

module.exports = thoughtController