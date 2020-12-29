const autoprefixer = require('autoprefixer');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = [{
    mode: 'development',
    entry: ['./app.scss', './app-test.js', './app.js'],
    output: {
        // This is necessary for webpack to compile
        // But we never use style-bundle.js
        filename: 'material-components-web.min.js',
        libraryTarget: 'umd',
        library: 'mdc',
        globalObject: 'this'
    },
    performance: {
        hints: false
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'material-components-web.min.css',
                        },
                    },                   
                    { loader: 'extract-loader' },
                    { loader: 'css-loader' },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: () => [autoprefixer()]
                            },
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            // Prefer Dart Sass
                            implementation: require('sass'),

                            // See https://github.com/webpack-contrib/sass-loader/issues/804
                            webpackImporter: false,
                            sassOptions: {
                                includePaths: ['./node_modules']
                            },
                        },
                    }
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                // exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        ]
    },
}];
