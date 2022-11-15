const {
  Schema,
  model
} = require('mongoose');
// Validates that an entered email is in the correct format 

var validateEmail = function (email) {
  var regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]{2,5}$/;
  return regex.test(email)
};
// Schema to create the user model 

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    max_length: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validateEmail, 'Please enter in a valid email address'],
  },
  thoughts: [{
    type: Schema.Types.ObjectId,
    ref: 'thought',
  }, ],
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
  }, ],
}, {
  toJSON: {
    getters: true,
  },
  id: false,
});
// The friend count virtual will keep track of the number of friends

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});
// The thought count virtual will keep track of the number of thoughts

userSchema.virtual('thoughtCount').get(function () {
  return this.thoughts.length;
});

const User = model('user', userSchema);

module.exports = User;