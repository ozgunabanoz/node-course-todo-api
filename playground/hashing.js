const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // for hashing passwords

var password = '123abc';

// bcrypt.genSalt(10, (err, salt) => { // 10 is number of rounds used for generating salt

//     bcrypt.hash(password, salt, (err, hash) => { // actual hashing 

//         console.log(hash);

//     });

// });

var hashedPassword = '$2a$10$BlJb2WqGjJewP/YsysvEZOmjXDrmlMcRH3sRv.uWnmTGAFfz12Wwe'; // result we had from prev hashing

bcrypt.compare(password, hashedPassword, (err, res) => {

    console.log(res);

});

// var data = {

//     id: 10

// }

// var token = jwt.sign(data, '123abc');

// console.log(token);

// var decoded = jwt.verify(token, '123abc');

// console.log(decoded);

/* var message = 'I am user number 3';

var hash = SHA256(message);

console.log(`${message} and ${hash}`);

var data = {

    id: 4

};

var token = {

    data,
    hash: SHA256(JSON.stringify(data) + 'somesecret').toString()

}

var resultHash = SHA256(JSON.stringify(token.data)+'somesecret').toString();

if (token.hash === resultHash) {

    console.log('data was not changed');

} else {

    console.log('data was changed');

} */