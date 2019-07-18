const IS_DEV = process.env.NODE_ENV !== 'production'
    , BASE_URL = (
        ! IS_DEV
            ? process.env.BASE_URL
            : '/'
    )
;

module.exports = {
    publicPath: BASE_URL,
    lintOnSave: IS_DEV,
    productionSourceMap: false,
    pages: {
        index: {
            entry: './src/main.js',
        },
    },
    configureWebpack: {
        output: {
            libraryExport: 'default',
        },
    },
    chainWebpack(
        config
    ) {

        config.module
            .rule(
                'md'
            )
            .test(
                /\.md/
            )
            .use(
                'vue-loader'
            )
            .loader(
                'vue-loader'
            )
            .end()
            .use(
                'vue-markdown-loader'
            )
            .loader(
                'vue-markdown-loader/lib/markdown-compiler'
            )
            .options(
                {
                    raw: true,
                    breaks: true,
                    wrapper: 'article',
                }
            )
        ;

    },
};
