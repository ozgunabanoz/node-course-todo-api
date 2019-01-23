const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
var {Users} = require('./../server/models/user');

var userId = '5c46b84adc1e1c00c8cbe748';

Users.findById(userId).then((user) => {

    if (!user) {

        return console.log('The user is not found');

    }

    console.log(JSON.stringify(user, undefined, 2));

}).catch((err) => console.log(err));

/*
var id = '5c470b972d693a2adc4bf0de';

if (!ObjectID.isValid(id)) {

    console.log('id not valid'); // to find out if the id is valid

}

Todo.find({ // in this query, we passed the id and got back the document from db

    _id: id

}).then((todos) => {

    console.log(todos);

});

Todo.findOne({

    _id: id

}).then((todos) => {

    console.log(todos);

});

Todo.findById(id).then((todos) => {

    if (!todos) {

        return console.log('id not found');

    }

    console.log(todos);

}).catch((e) => console.log(e)); // if the id is invalid
*/