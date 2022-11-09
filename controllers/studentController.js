// ObjectId() method for converting studentId string into an ObjectId for querying database
const {
  ObjectId
} = require('mongoose').Types;
const {
  User,
  Thought
} = require('../models');



module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users,
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({
        _id: req.params.userId
      })
      .select('-__v')
      .lean()
      .then(async (user) =>
        !user ?
        res.status(404).json({
          message: 'There is no user with that ID'
        }) :
        res.json({
          user,
        }))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a student and remove them from the course
  deleteUser(req, res) {
    User.findOneAndRemove({
        _id: req.params.userId
      })
      .then((user) =>
        !user ?
        res.status(404).json({
          message: 'No user with that ID'
        }) :
        res.json({
          message: 'User successfully deleted'
        })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add an assignment to a student
  addThought(req, res) {
    console.log('You are adding a thought');
    console.log(req.body);
    User.findOneAndUpdate({
        _id: req.params.userId
      }, {
        $addToSet: {
          thoughts: req.body
        }
      }, {
        runValidators: true,
        new: true
      })
      .then((user) =>
        !user ?
        res
        .status(404)
        .json({
          message: 'No user with that ID :('
        }) :
        res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove assignment from a student
  removeThought(req, res) {
    User.findOneAndUpdate({
        _id: req.params.userId
      }, {
        $pull: {
          thought: {
            thoughtId: req.params.thoughtId
          }
        }
      }, {
        runValidators: true,
        new: true
      })
      .then((user) =>
        !user ?
        res
        .status(404)
        .json({
          message: 'No user with that ID :('
        }) :
        res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};