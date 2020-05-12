module.exports = {
    webpackConfig: {
        module: {
        rules: [
            // Babel loader will use your project’s babel.config.js
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            // Other loaders that are needed for your components
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader']
            }
        ]
        }
    }
};