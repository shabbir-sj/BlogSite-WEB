var webpack = require('webpack');
var path = require('path');


var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/src/index.html',
    filename: 'index.html',
    inject: 'body'
});

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
	entry: APP_DIR + '/index.js',
	output: {
		path: BUILD_DIR,
		filename: 'bundle.js',
		publicPath: '/public'
	},

	devtool: "source-map",

	module: {
		loaders: [
			{
				test: /\.jsx?/,
				include: APP_DIR,
				loader: 'babel-loader'
			},
			{
				test: /\.css$/,
				include: APP_DIR,
				loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
			}
		]
	},

	plugins: [
		HtmlWebpackPluginConfig
	],

	devServer: {
		port: 3000,
		historyApiFallback: {
			index: '/public/index.html'
		}
	}
};

module.exports = config;