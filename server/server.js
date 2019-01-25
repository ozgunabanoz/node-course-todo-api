require('./config/config');

const {ObjectID} = require('mongodb');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT; 

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

// POST users

app.post('/users', (req, res) => {

    var body = _.pick(req.body, ['email', 'password']);

    var user = new User(body);

    user.save().then((user) => {

        return user.generateAuthToken();

    }).then((token) => {

        res.header('x-auth', token).send(user);

    }).catch((e) => {

        res.status(400).send(e);

    });

});

app.get('/users/me', authenticate, (req, res) => {

    res.send(req.user);

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

});

app.delete('/todos/:id', (req, res) => {

    var idToBeDeleted = req.params.id;

    if (!ObjectID.isValid(idToBeDeleted)) {

        return res.status(404).send();

    }

    Todo.findByIdAndRemove(idToBeDeleted).then((doc) => {

        if (!doc) {

            return res.status(404).send();

        }

        res.status(200).send({doc});

    }).catch((e) => {

        res.status(200).send();

    });

});

app.patch('/todos/:id', (req, res) => { // for updates

    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {

        return res.status(404).send();

    }

    if (_.isBoolean(body.completed) && body.completed) {

        body.completedAt = new Date().getTime();

    } else {

        body.completed = false;
        body.completedAt = null;

    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {

        if (!todo) {

            return res.status(404).send();

        }

        res.status(200).send({todo});

    }).catch((e) => {

        res.status(400).send();

    });

});

app.listen(port, () => {

    console.log(`Started up at ${port}`);

});

module.exports = {app};