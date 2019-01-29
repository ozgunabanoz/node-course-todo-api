const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{

    _id: userOneId,
    email: 'andrew@example.com',
    password: 'userOnePass',
    tokens: [{

        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()

    }]

}, {

    _id: userTwoId,
    email: 'jane@example.com',
    password: 'userTwoPass',
    tokens: [{

        access: 'auth',
        token: jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()

    }]

}];

const todos = [{

    _id: new ObjectID(),
    text: 'First test to do',
    _creator: userOneId

}, {

    _id: new ObjectID(),
    text: 'Second test to do',
    completed: true,
    completedAt: 4506,
    _creator: userTwoId

}];

const populateTodos = (done) => {

    // Todo.remove({}).then(() => done()); -- this is for only the first two tests

    Todo.remove({}).then(() => { // this exists to avoid the first two tests not to block get test. 
                                // this whole beforeeach part exists only for test purposes

        return Todo.insertMany(todos);

    }).then(() => done());

};

const populateUsers = (done) => {

    User.remove().then(() => {

        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo]); // wait for all promises to finish i.e save two users, after that, return 'em

    }).then(() => done());

};

module.exports = {todos, populateTodos, users, populateUsers};