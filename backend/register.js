const bcrypt = require('bcrypt');

const plaintextPW = 'sokk';

bcrypt.genSalt(10, async (err, salt) => {
    const hash = await bcrypt.hash(plaintextPW, salt);
    console.log(hash);
});
