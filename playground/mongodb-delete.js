const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, client) => {

    if (error) {

        return console.log('unable to connect to mongodb server'); // if program runs this, it wouldnt find to run success log necessary

    }

    console.log('connected to mongodb server');

    const db = client.db('TodoApp');

    db.collection('Users').deleteMany({name: 'Ozgun'}).then((result) => {

        console.log(result);

    });

    db.collection('Users').findOneAndDelete({_id: new ObjectID('5c45badf26976de46200be0b')}).then((result) => {

        console.log(result);

    });

    // delete many

    /* db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {

        console.log(result);

    }); */

    // delete one

    /* db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {

        console.log(result);

    }); */

    // findOne and Delete

    /* db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {

        console.log(result);

    });*/

    // client.close();

});