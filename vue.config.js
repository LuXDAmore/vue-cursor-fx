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
            template: './src/index.html',
            title: 'Vue Cursor Fx',
            colors: {
                primary: 'red',
            },
        },
    },
    configureWebpack: {
        output: {
            libraryExport: 'default',
        },
    },
};
