const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, client) => {

    if (error) {

        return console.log('unable to connect to mongodb server'); // if program runs this, it wouldnt find to run success log necessary

    }

    console.log('connected to mongodb server');

    const db = client.db('TodoApp');

    // challenge

    db.collection('Users').findOneAndUpdate({

        _id: new ObjectID('5c45bb2126976de46200be16')
        
    }, {

        $set: {

            name: 'Ozgun' // set name as ozgun

        },

        $inc: {

            age: 1  // increment age by 1   

        }

    }, {

        returnOriginal: false

    }).then((res) => {

        console.log(res);

    });

    // find One and Update

    /* db.collection('Todos').findOneAndUpdate({

        _id: new ObjectID('5c46a2fd26976de46200bf5b') // find the object that has this id

    }, {

        $set: {

            completed: true // to set this boolean true

        }

    }, {

        returnOriginal: false

    }).then((result) => {

        console.log(result);

    }); */

    // client.close();

});