// Requiring included models and mongoose types. 

const {
  Thought,
  User
} = require('../models');

const {
  ObjectId
} = require('mongoose').Types;

module.exports = {
  // Simple get all thoughts function

  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Function to find a specific thought by id

  getSingleThought(req, res) {
    Thought.findOne({
        _id: req.params.thoughtId
      })
      .select('-__v')
      .then((thought) =>
        !thought ?
        res.status(404).json({
          message: 'No thought with that ID'
        }) :
        res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create thought function

  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) =>
        // Update user with new associated thought

        User.findOneAndUpdate({
          username: thought.username
        }, {
          $addToSet: {
            thoughts: thought._id
          }
        })
        .then((thought) => res.json(thought))
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a single thought

  deleteThought(req, res) {
    Thought.findOneAndDelete({
        _id: req.params.thoughtId
      })
      .then((thought) =>
        !thought ?
        res.status(404).json({
          message: 'No thought with that ID'
        }) :
        // Pull deleted thought from users thoughts array

        User.findOneAndUpdate({
          username: thought.username
        }, {
          $pull: {
            thoughts: ObjectId(thought._id)
          }
        })
      )
      .then(() => res.json({
        message: 'Thought deleted!'
      }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought with new information

  updateThought(req, res) {
    Thought.findOneAndUpdate({
        _id: req.params.thoughtId
      }, {
        $set: req.body
      }, {
        runValidators: true,
        new: true
      })
      .then((thought) =>
        !thought ?
        res.status(404).json({
          message: 'No thought with this id!'
        }) :
        res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Add a reaction to a thought

  addReaction(req, res) {
    console.log('You are adding a reaction');
    console.log(req.body);
    Thought.findOneAndUpdate({
        _id: req.params.thoughtId
      }, {
        $addToSet: {
          reactions: req.body
        }
      }, {
        runValidators: true,
        new: true
      })
      .then((thought) =>
        !thought ?
        res
        .status(404)
        .json({
          message: 'No thought with that ID'
        }) :
        res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove reaction from a thought
  
  removeReaction(req, res) {
    console.log('You are removing a reaction');
    console.log(req.body)
    Thought.findOneAndUpdate({
        _id: req.params.thoughtId
      }, {
        $pull: {
          reactions: {
            reactionId: req.params.reactionId
          }
        }
      }, {
        runValidators: true,
        new: true
      })
      .then((thought) =>
        !thought ?
        res
        .status(404)
        .json({
          message: 'No thought with that ID'
        }) :
        res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};