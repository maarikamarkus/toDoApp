module.exports = {
    chainWebpack: (config) => {
        config.module
            .rule('pug')
            .test(/\.pug$/)
            .use('pug-plain-loader')
            .loader('pug-plain-loader')
            .end();
    },

    pluginOptions: {
        i18n: {
            locale: 'en',
            fallbackLocale: 'en',
            localeDir: 'locales',
            enableInSFC: true,
        },
    },
};
