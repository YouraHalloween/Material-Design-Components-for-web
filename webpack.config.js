const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const Env = (function () {
    const REMOTE_PATH = '../../yii2-material-design-components/src/assets/';
    const CONTENT_HASH = '[contenthash]';
    // const NAME = '[name]';
    const NAME = 'material-components-web';
    /**      
     * @param {string} param 
     * @param {boolean} useHashName 
     */
    function Env(param, useHashName = false) {
        this.mode = param.mode || 'development';
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
        const hashName =
            this.useHashName && this.isProd() ? `.${CONTENT_HASH}` : '';
        const min = this.remote ? '.min' : ''; 
        const fileName = `${NAME}${min}${hashName}.${ext}`;
        return this.remote ? REMOTE_PATH + fileName : fileName;
    };

    Env.prototype.sourceMap = function () {
        return this.isProd() ? false : 'source-map';
    };

    Env.path = function (dir) {
        return path.resolve(__dirname, dir);
    };

    return Env;
})();

const DefaultConfig = {
    resolve(extensions) {
        return {
            modules: [
                Env.path('src'), 
                Env.path('components'), 
                'node_modules'
            ],            
            extensions
        }
    },
    config(env, config) {
        return {
            //Точка входа из папки src
            context: Env.path('src'),
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

    return DefaultConfig.config(env, {
        name: 'scss-template',
        entry: { name: 'app.scss' },
        output: {
            path: Env.path('dist'),
            filename: env.getFileName('css.js'),
        },
        resolve: DefaultConfig.resolve(['.scss']),
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
}

const JSConfig = (env) => {

    let entry = env.isProd() || env.remote ? 'app.js' : ['app-test.js', 'app-test.ts'];

    let output = {
        path: Env.path('dist'),
        filename: env.getFileName('js'),
    };

    if (env.isProd() || env.remote) {
        output.library = 'app';
        output.libraryTarget = 'umd';
    }

    return DefaultConfig.config(env, {
        name: 'ts-js-template',
        entry: entry,
        output: output,
        resolve: DefaultConfig.resolve(['.ts', '.js']),
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
