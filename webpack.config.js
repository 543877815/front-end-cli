const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
	mode:'development', //default production to compression
	entry: './src/index.js',
	module: {
		rules: [{
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
			use: ['style-loader', 
			{
				loader: 'css-loader',
			}]
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
	new CleanWebpackPlugin()
	],

	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
}