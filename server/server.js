const {ObjectID} = require('mongodb');

var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {Users} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000; 

app.use(bodyParser.json());

app.post('/todos', (req, res) => {

    var todo = new Todo({

        text: req.body.text

    });

    todo.save().then((doc) => {

        res.send(doc); // save to db then post it

    }, (e) => {

        res.status(400).send(e);

    });

});

app.get('/todos', (req, res) => {

    Todo.find().then((todos) => {

        res.send({todos});

    }, (err) => {

        res.status(400).send(err);

    });
    
});

app.get('/todos/:id', (req, res) => {

    var id = req.params.id;

    // valid id by using isValid

    if (!ObjectID.isValid(id)) {

        return res.status(404).send();

    }

    // use findbyid to find a document that matches our id

    Todo.findById(id).then((todo) => { // if success,

        if(!todo) { // send 404 if not exist

            return res.status(404).send();

        }

        res.send({todo}); // send todo back if it exists,

    }).catch((e) => { // if error, send 400, and not send any error message

        res.status(400).send();

    });

})

app.listen(port, () => {

    console.log(`Started up at ${port}`);

});

module.exports = {app};