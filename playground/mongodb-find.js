/* const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID; */

const {MongoClient, ObjectID} = require('mongodb'); // this works just like commented out require statement, but shorter

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, client) => {

    if (error) {

        return console.log('unable to connect to mongodb server'); // if program runs this, it wouldnt find to run success log necessary

    }

    console.log('connected to mongodb server');

    const db = client.db('TodoApp');

    db.collection('Users').find({name: 'Ozgun'}).toArray().then((ozguns) => {

        console.log(JSON.stringify(ozguns, undefined, 2));

    }, (err) => {

        console.log('Unable');

    });

    /* db.collection('Todos').find().count().then((count) => {

        console.log(`Todos count: ${count}`);

    }, (err) => {

        console.log('we have an error');

    }); */

    /* db.collection('Todos').find({

        _id: new ObjectID('5c45b1f826976de46200bd1f') // looking for an id property that's going to match what we have

    }).toArray().then((docs) => { // for fetching the todos db's elements
        
        // we can write the queries in the find function 

        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));

    }, (err) => {

        console.log('Unable to fetch todos');

    }); */

    /* db.collection('Todos').find({completed: true}).toArray().then((docs) => { // for fetching the todos db's elements
        
        // we can write the queries in the find function 

        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));

    }, (err) => {

        console.log('Unable to fetch todos');

    }); */

    // client.close();

});