const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { endianness } = require('os');

const Env = (function () {
    const REMOTE_PATH = '../../dispute/backend/assets/external/material-components/';
    const CONTENT_HASH = '[contenthash]';
    // const NAME = '[name]';
    const NAME = 'material-components-web';
    /**      
     * @param {string} param 
     * @param {boolean} useHashName 
     */
    function Env(param, useHashName = false) {
        this.mode = param.mode ? param.mode : 'development';
        this.remote = param.env.remote;
        this.useHashName = useHashName;
    }

    Env.prototype.isProd = function () {
        return this.mode === 'production';
    };

    Env.prototype.isDev = function () {
        return this.mode === 'development';
    };

    /**    
     * @param {string} ext - расширение
     */
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

    Env.prototype.path = function () {
        return path.resolve(__dirname, 'dist');
    };

    return Env;
})();

const DefaultConfig = (env, config) => {
    return {
        mode: env.mode,
        performance: {
            hints: false,
        },
        devtool: env.sourceMap(),
        optimization: {
            minimize: env.isProd(),
        },
        ...config
    }
}

const SCSSConfig = (env) => {
    const loaders = [
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
                sourceMap: false,
            },
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

    let result = DefaultConfig(env, {
        name: 'scss-template',
        entry: { name: './src/app.scss' },
        output: {
            path: env.path(),
            filename: env.getFileName('css.js'),
        },
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: loaders,
                },
            ],
        },
        plugins: [new CleanWebpackPlugin()],
    });

    return result;
}

const JSConfig = (env) => {

    let entry = env.isProd() || env.remote ? './src/app.js' : ['./src/app-test.js', './src/app-test.ts'];

    let output = {
        path: path.resolve(__dirname, 'dist'),
        filename: env.getFileName('js'),
    };

    if (env.isProd() || env.remote) {
        output.library = 'app';
        output.libraryTarget = 'umd';
    }

    let result = DefaultConfig(env, {
        name: 'ts-js-template',
        entry: entry,
        output: output,
        resolve: { extensions: ['.ts', '.js'] },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: [
                        // { loader: 'babel-loader', options: { cacheDirectory: true } },
                        {
                            loader: 'ts-loader',
                            options: {
                                configFile: 'tsconfig.json'
                            }
                        }
                    ]
                },
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            presets: [
                                ['@babel/preset-env', { targets: 'defaults' }],
                            ],
                        },
                    },
                },
            ]
        },
    });

    return result;
}

module.exports = ({ }, param) => {
    const contentHash = false;
    const env = new Env(param, contentHash);

    const scssConfig = SCSSConfig(env);
    const jsConfig = JSConfig(env);

    return [
        scssConfig,
        jsConfig
    ];
};
