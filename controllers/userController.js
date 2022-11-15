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

  deleteUser(req, res) {
    const userName = req.body.username 
    User.findOneAndRemove({
        _id: req.params.userId
      })
      .then((user) =>
        !user ?
        res.status(404).json({
          message: 'No user with that ID'
        }) :
        Promise.all([ Thought.deleteMany({
          username: user.username
        }),
        Thought.updateMany( {
          $pull: { reactions: { username: user.username } }
        })])
       
      )
        .then(() =>
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

  // Add a a friend
  addFriend(req, res) {
    console.log('You are adding a friend');
    console.log(req.body);
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
        User.findOneAndUpdate({
          _id: ObjectId(req.body)
        }, {
          $addToSet: {
            friends: ObjectId(user.id)
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
  // Remove friend
  removeFriend(req, res) {
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