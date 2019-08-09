// Exports
module.exports = {
    parser: 'postcss-scss',
    syntax: 'postcss-scss',
    plugins: [
        require(
            'postcss-import'
        )(),
        require(
            'postcss-url'
        )(),
        require(
            'postcss-scoped'
        )(),
        require(
            'postcss-preset-env'
        )(
            {
                stage: 2,
                autoprefixer: {
                    cascade: false,
                    grid: true,
                },
            }
        ),
        require(
            'postcss-combine-duplicated-selectors'
        )(
            {
                removeDuplicatedProperties: true,
            }
        ),
        require(
            'cssnano'
        )(
            {
                preset: 'default',
            }
        ),
    ],
};
