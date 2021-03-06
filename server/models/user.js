const mongoose = require('mongoose');
const validator = require('validator'); // for validating emails etc
const jwt = require('jsonwebtoken'); // for generating tokens
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,

      message: '{VALUE} is not a valid email'
    }
  },

  password: {
    type: String,
    required: true,
    minlength: 6
  },

  tokens: [
    {
      access: {
        type: String,
        required: true
      },

      token: {
        type: String,
        required: true
      }
    }
  ]
});

UserSchema.methods.toJSON = function() {
  // when sending a response, it only sends id and email for security purposes

  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt
    .sign(
      { _id: user._id.toString(), access },
      process.env.JWT_SECRET
    )
    .toString(); // adding abc123 for salting the token

  user.tokens = user.tokens.concat([{ access, token }]);

  return user.save().then(() => {
    // return the function because when it's called it can produce a promise

    return token;
  });
};

UserSchema.methods.removeToken = function(token) {
  var user = this;

  return user.update({
    // return it for making a promise

    $pull: {
      // pull any instance that matches with this token from the database

      tokens: {
        token: token
      }
    }
  });
};

UserSchema.statics.findByToken = function(token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.statics.findByCredentials = function(email, password) {
  var User = this;

  return User.findOne({ email }).then(user => {
    if (!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (!res) {
          reject();
        } else {
          resolve(user);
        }
      });
    });
  });
};

UserSchema.pre('save', function(next) {
  // for hashing password before saving to database

  var user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, pw) => {
        user.password = pw;
        next();
      });
    });
  } else {
    next();
  }
});

var User = mongoose.model('Users', UserSchema);

module.exports = {
  User
};
