const bcrypt = require('bcrypt');

const plaintextPW = 'markus';

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(plaintextPW, salt, (err, hash) => {
        console.log(hash);
    });
});