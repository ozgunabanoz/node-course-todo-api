const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, client) => {

    if (error) {

        return console.log('unable to connect to mongodb server'); // if program runs this, it wouldnt find to run success log necessary

    }

    console.log('connected to mongodb server');

    const db = client.db('TodoApp');

    /* db.collection('Todos').insertOne({

        text: 'Something to do',
        completed: false

    }, (error, result) => {

        if (error) {

            return console.log('Unable', err);

        }

        console.log(JSON.stringify(result.ops, undefined, 2));

    }); */

    db.collection('Users').insertOne({

        name: 'Ozgun',
        age: 26,
        location: 'Devrek'

    }, (error, result) => {

        if (error) {

            return console.log('Unable to connect');

        }

        console.log(JSON.stringify(result.ops, undefined, 2));

    });

    client.close();

});