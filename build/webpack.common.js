const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
	entry: './src/index.js',
	module: {
		rules: [
		{ 
			test: /\.js$/, 
			exclude: /node_modules/, 
			loader: "babel-loader"
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
				loader: 'file-loader',
				options: {
					name: '[name]_[hash].[ext]',
					outputPath: 'font/'
				}
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
					importLoaders: 2, 	
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
	],
	optimization: {
		splitChunks: {
			chunks: 'all',
			minSize: 30000,
			maxSize: 0,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: '~',
			name: true,
			cacheGroups: {
				// 同步引入
				vendors: {
					test: /[\\/]node_modules[\\/]/, // 把node_modules的文件打包到vendors.js中
					priority: -10
				},
				default: false
			}
		}
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, '../dist')
	}
}