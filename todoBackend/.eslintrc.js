module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2020: true,
    },
    extends: [
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 11,
    },
    rules: {
        indent: ['error', 4],
        'no-restricted-syntax': 'off',
        'no-console': 'off',
    },
};
