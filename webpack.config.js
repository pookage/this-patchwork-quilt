const HtmlWebpackPlugin = require('html-webpack-plugin');
const path              = require("path");

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: './client/index.html',
	filename: 'index.html',
	inject: 'body'
})

module.exports = {
	entry: './client/index.js',
	output: {
		path: './dist',
		filename: 'index_bundle.js'
	},
	module: {
		loaders: [
			{ test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
			{ test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
			{
				test: /\.css$/,
				loader: 'style-loader',
				exclude: /node_modules/
			}, {
				test: /\.css$/,
				loader: 'css-loader',
				query: {
					modules: true,
					localIdentName: '[name]__[local]___[hash:base64:5]'
				},
				exclude: /node_modules/
			}, {
			 test: /\.(png|svg|jpg|gif)$/,
			 loader: "file-loader"
			}
		]
	},
	plugins: [HtmlWebpackPluginConfig],
	resolve : {
		alias: {
			Components: path.resolve(__dirname, "client/components/"),
			Utils: path.resolve(__dirname, "client/utils/"),
			Contexts: path.resolve(__dirname, "client/contexts/"),
			Assets: path.resolve(__dirname, "client/assets/"),
			Data: path.resolve(__dirname, "client/data")
		}
	}
}