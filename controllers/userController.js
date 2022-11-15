// Requiring included models and mongoose types. 

const {
  User,
  Thought
} = require('../models');

const {
  ObjectId
} = require('mongoose').Types;

module.exports = {
  // Function to get all users

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
  // Get a single user by their specified id

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
  // Simple create user function

  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Update a user by id with new information included in the request

  updateUser(req, res) {
    User.findOneAndUpdate({
        _id: req.params.userId
      }, {
        $set: req.body
      }, {
        runValidators: true,
        new: true
      })
      .then((user) =>
        !user ?
        res.status(404).json({
          message: 'No user with this id!'
        }) :
        res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Function to delete user

  deleteUser(req, res) {
    // Find and remove user by id

    User.findOneAndRemove({
        _id: req.params.userId
      })
      .then((user) =>
        !user ?
        res.status(404).json({
          message: 'No user with that ID'
        }) :
        // Delete thoughts associated with user

        Promise.all([Thought.deleteMany({
            username: user.username
          }),
          // Update all thoughts by removing the users associated reactions

          Thought.updateMany({
            $pull: {
              reactions: {
                username: user.username
              }
            }
          })
        ])
      )
      .then(() =>
        // Update all users by removing the user from their friends list

        User.updateMany({}, {
          $pull: {
            friends: ObjectId(req.params.userId)
          }
        }, {
          runValidators: true,
          new: true
        })
        .then(res.json({
          message: 'The user, their thoughts, friends, and reactions are all successfully deleted'
        })))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // A function for connecting users as friends

  addFriend(req, res) {
    console.log('You are adding a friend');
    console.log(req.body);
    // Add specified user to the request users friends list

    User.findOneAndUpdate({
        _id: req.params.userId
      }, {
        $addToSet: {
          friends: ObjectId(req.body)
        }
      }, {
        runValidators: true,
        new: true
      })
      .then((user) =>
        // Add request user to specified users friends list

        User.findOneAndUpdate({
          _id: ObjectId(req.body)
        }, {
          $addToSet: {
            friends: ObjectId(req.params.userId)
          }
        }, ))
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
  // Function to remove a friend (The exact reverse of adding a friend)

  removeFriend(req, res) {
    // Update request users friends list by removing specified friend

    User.findOneAndUpdate({
        _id: req.params.userId
      }, {
        $pull: {
          friends: ObjectId(req.body)
        }
      }, {
        runValidators: true,
        new: true
      })
      .then((user) =>
        // Update the specified friend by removing the request user from their friends list

        User.findOneAndUpdate({
          _id: ObjectId(req.body)
        }, {
          $pull: {
            friends: ObjectId(user.id)
          }
        }, ))
      .then((user) =>
        !user ?
        res
        .status(404)
        .json({
          message: 'No user with that ID'
        }) :
        res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};