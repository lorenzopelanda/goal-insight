const path = require('path');

module.exports = {
    entry: './public/javascripts/frontend/setup.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    resolve: {
        modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
    },
};
