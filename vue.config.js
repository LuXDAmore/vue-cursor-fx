
const BASE_URL = (
    process.env.NODE_ENV === 'production'
        ? process.env.BASE_URL
        : '/'
);

module.exports = {
    publicPath: BASE_URL,
    lintOnSave: process.env.NODE_ENV !== 'production',
    productionSourceMap: false,
    pages: {
        index: {
            entry: './src/main.js',
            title: process.env.TITLE,
            description: process.env.DESCRIPTION,
            library: process.env.LIBRARY,
            author: process.env.AUTHOR,
            twitter: process.env.TWITTER,
            facebook: process.env.FACEBOOK,
            colors: {
                primary: '#333',
            },
        },
    },
    configureWebpack: {
        output: {
            libraryExport: 'default',
        },
    },
};
