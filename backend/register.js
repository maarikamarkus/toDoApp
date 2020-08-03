const bcrypt = require('bcrypt');

const plaintextPW = 'sokk';

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(plaintextPW, salt, (hash) => {
        console.log(hash);
    });
});
