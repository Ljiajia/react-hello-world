var webpack       = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    entry: {
        index: "./src/index/index.js"
    },
    output: {
        path: __dirname + '/build/',
        filename: "[name].bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'react-hot!jsx-loader?harmony'
            }, {
                test: /\.less/,
                loader: 'style-loader!css-loader!less-loader'
            }, {
                test: /\.(css)$/,
                loader: 'style-loader!css-loader'
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]

        //loaders: [
        //    {
        //        test: /\.js$/,
        //        exclude: /node_modules/,
        //        loader: 'jsx'
        //    }
        //]
    },
    plugins: [
        //commonsPlugin,

        //设置此处，则在JS中不用引入require('react')等
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            React: "react/addons"
        })
        //new webpack.optimize.UglifyJsPlugin({
        //    compress: {
        //        warnings: false
        //    }
        //})
    ],

    //添加了此项，则表明从外部引入，内部不会打包合并进去
    //externals: {
    //    jquery: 'window.jQuery',
    //    react: 'window.React'
    //}
};