
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
            title: process.env.title,
            description: process.env.description,
            base_url: BASE_URL,
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
