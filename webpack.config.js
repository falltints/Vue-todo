const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
// HTMLPlugin会自动生成一个html文件，并且引用相关的 assets 文件(如 css, js)
const webpack = require('webpack');
const extractPlugin = require('extract-text-webpack-plugin');
// 把静态资源文件单独打包

const isDev = process.env.NODE_ENV === 'development'; // 判断是否为开发环境

const config = {
    target: 'web',
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, 'dist')
    },
    // webpack会把所有需要的文件（.vue, .css, .js等）打包到一个js文件中
    module: { // webpack默认只能打包js文件
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.jsx$/,
            // JSX是基于Javascript的语言扩展， 它允许在Javascript代码中插入XML语法风格的代码。
            // 在render方法中写虚拟DOM
            loader: 'babel-loader' // babel用来将es6代码转换成浏览器能够识别的代码
        }, {
            test: /\.(jpg|png|gif|svg|jpeg)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    // 把图片生成为base64编码，可以直接写入js文件（当图片小于1024）
                    name: '[name].[ext]', // ext为扩展名
                }
            }]
        }]
    },
    plugins: [
        // DefinePlugin把里面的标识变成全局变量，在业务代码中可以直接使用配置的标识。
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new HTMLPlugin()
    ]
};

if (isDev) {
    config.devServer = {
        port: 8000,
        host: '0.0.0.0',
        overlay: {
            errors: true // 把错误直接显示到网页上面
        },
        hot: true // 当更改单个组件代码时，不会重新加载整个页面，只会刷新当前组件
        /*,
        open: true*/ // 运行weback-dev-server自动打开浏览器
    };
    config.devtool = '#cheap-module-eval-source-map';
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    );
    config.module.rules.push({
        test: /\.styl$/,
        use: [
            'style-loader',
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                    // Source Maps能够提供将压缩文件恢复到源文件原始位置的映射代码的方式。方便开发时调试。
                    sourceMap: true
                    // 因为stylus-loader会生成sourceMap，这里设为true可以直接利用stylus-loader生成的sourceMap
                }
            },
            'stylus-loader'
        ]
    })
} else {
    config.module.rules.push({
        test: /\.styl$/,
        use: extractPlugin.extract({
            fallback: 'style-loader', // fallback意为退路
            // extract默认行为先使用css-loader编译css，如果一切顺利的话，结束之后把css导出到规定的文件去。
            // 但是如果编译过程中出现了错误，则继续使用style-loader处理css。
            use: [
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        // Source Maps能够提供将压缩文件恢复到源文件原始位置的映射代码的方式。方便开发时调试。
                        sourceMap: true
                        // 因为stylus-loader会生成sourceMap，这里设为true可以直接利用stylus-loader生成的sourceMap
                    }
                },
                'stylus-loader'
            ]
        })
    });
    config.output.filename = '[name].[chunkhash:8].js';
    // hash的应用：利用浏览器的长缓存来减少资源的加载速度
    // hash与chunkhash的区别：hash是对整个项目的一个命名，chunkhash会对单独的每一个模块都进行命名
    config.entry = {
        app: path.join(__dirname, 'src/index.js'),
        vendor: ['vue'] // vendor: 供应商
    };
    config.plugins.push(
        new extractPlugin('style.[contentHash:8].css'),
        // 对类库文件进行单独打包
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        // 把webpack相关代码进行打包
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        })
    );
}

module.exports = config;