const bcrypt = require('bcrypt');

const plaintextPW = 'sokk';

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(plaintextPW, salt, (err, hash) => {
        console.log(hash);
    });
});