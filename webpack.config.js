const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
	mode:'development', //default production to compression
	devtool: 'cheap-module-eval-source-map',
	// mode:'production',
	// devtool: 'cheap-module-source-map',
	entry: './src/index.js',
	devServer: {
		contentBase: './dist',
		open: true,
		port: 8080,
		hot: true,
		hotOnly: true,
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
				pathRewrite: {'^/api' : ''}
			}
		}
	},
	module: {
		rules: [
		{ 
			test: /\.js$/, 
			exclude: /node_modules/, 
			loader: "babel-loader" ,
			options: {
				presets: [["@babel/preset-env",{
					useBuiltIns: 'usage'
				}]]
			}
		},
		{
			test: /\.(png|jpg|gif)$/,
			use: {
				loader: 'url-loader',
				options: {
					name: '[name]_[hash].[ext]',
					outputPath: 'images/',
					limit: 8192
				}
			}
		},
		{
			test: /\.(eot|ttf|svg|woff)$/,
			use: {
				loader: 'file-loader'
			}
		},
		{
			test: /\.css$/,
			use: [
			'style-loader', 
			'css-loader',
			'postcss-loader'
			]
		},
		{
			test: /\.scss$/,
			use: [
			'style-loader', 
			{
				loader: 'css-loader',
				options: {
					importLoaders: 2, 	// 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
					modules: true
				},
			},
			'postcss-loader',
			'sass-loader'
			]
		}
		]
	},
	plugins: [
	new HtmlWebpackPlugin({
		template: 'src/html/index.html'
	}),
	new CleanWebpackPlugin(),
	new webpack.HotModuleReplacementPlugin()
	],
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	}
}