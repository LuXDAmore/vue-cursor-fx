module.exports = {
    productionSourceMap: false,
    lintOnSave: true,
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
