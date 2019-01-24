const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
var {Users} = require('./../server/models/user');

// Todo remove

/* Todo.remove({}).then((result) => {

    console.log(result);

});*/

// Todo.findOneAndRemove

Todo.findByIdAndRemove({_id: '5c4988eb26976de46200d10e'}).then((todo) => {

    console.log(todo);

});

// Todo.findbyIdAndRemove

/* Todo.findByIdAndRemove('5c49884126976de46200d0eb').then((todo) => {

    console.log(todo);

}); */