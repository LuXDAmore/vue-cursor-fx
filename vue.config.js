module.exports = {
    publicPath: (
        process.env.NODE_ENV === 'production'
        ? '/vue-cursor-fx/'
        : '/'
    ),
    lintOnSave: process.env.NODE_ENV !== 'production',
    productionSourceMap: false,
    pages: {
        index: {
            entry: './src/main.js',
            title: 'Vue Cursor Fx',
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
