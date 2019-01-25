const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {

    id: 10

}

var token = jwt.sign(data, '123abc');

console.log(token);

var decoded = jwt.verify(token, '123abc');

console.log(decoded);

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