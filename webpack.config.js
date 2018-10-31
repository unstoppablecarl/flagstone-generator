const path = require('path');

var WebpackNotifierPlugin = require('webpack-notifier');


module.exports = {
    mode:         'development',
    watch:        false,
    devtool: 'source-map',
    watchOptions: {
        aggregateTimeout: 300,
        ignored:          ['/node_modules/', '*/.babelrc'],
    },
    entry:  './js/main.js',
    output: {
        path:     path.resolve(__dirname, 'build/js'),
        filename: 'main.bundle.js'
    },
    plugins: [
	    new WebpackNotifierPlugin({alwaysNotify: true}),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                //use:  'babel-loader'
            }
        ]
    },

};
