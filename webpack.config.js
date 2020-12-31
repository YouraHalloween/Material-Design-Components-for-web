const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const Env = (function () {
    const REMOTE_PATH = '../../dispute/backend/assets/external/MaterialDesign/';
    const CONTENT_HASH = '[contenthash]';
    // const NAME = '[name]';
    const NAME = 'material-components-web';

    function Env(param, useHashName = false) {
        this.mode = param.mode ? param.mode : 'development';
        this.remote = param.env.remote;
        this.useHashName = useHashName;
    }

    Env.prototype.isProd = function () {
        return this.mode === 'production';
    };

    Env.prototype.getFileName = function (ext) {
        let hashName =
            this.useHashName && this.isProd() ? `.${CONTENT_HASH}` : '';
        let fileName = this.isProd()
            ? `${NAME}.min${hashName}.${ext}`
            : `${NAME}${hashName}.${ext}`;
        return this.remote ? REMOTE_PATH + fileName : fileName;
    };

    Env.prototype.sourceMap = function () {
        return this.isProd() ? 'hidden-source-map' : 'eval-source-map';        
    };

    Env.prototype.entry = function () {
        let entry = {
            app: './src/app.js',
        };
        if (!this.isProd()) {
            entry['test'] = './src/app-test.js';
        } 
        return entry;
    };

    return Env;
})();

module.exports = ({}, param) => {
    const env = new Env(param, false);

    const scssLoaders = [
        {
            loader: 'file-loader',
            options: {
                name: env.getFileName('css'),
            },
        },
        {
            loader: 'extract-loader',
        },
        {
            loader: 'css-loader',
            options: {
                sourceMap: false
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: [
                        /**
                         * Stylelint нужен для проверки качества css кода
                         */
                        // require('stylelint')({
                        //     /* your options */
                        // }),
                        require('autoprefixer'),
                    ],
                },
            },
        },
        {
            loader: 'sass-loader',
            options: {
                webpackImporter: false,
                sassOptions: {
                    includePaths: ['./node_modules'],
                },
            },
        },
    ];

    return {
        name: 'MDC Template',
        mode: env.mode,
        entry: env.entry(),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: env.getFileName('js'),
            library: '[name]',
            // libraryTarget: 'umd',
            // globalObject: 'this',
        },
        performance: {
            hints: false,
        },
        devtool: env.sourceMap(),
        optimization: {
            minimize: env.isProd(),
        },
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', { targets: 'defaults' }],
                            ],
                        },
                    },
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: scssLoaders,
                },
            ],
        },
        plugins: [new CleanWebpackPlugin()],
    };
};
