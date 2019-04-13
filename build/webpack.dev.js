const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

const devConfig =  {
	mode: 'development', 
	devtool: 'cheap-module-eval-source-map',
	module:{
		rules: [
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
	devServer: {
		contentBase: './dist',
		open: true,
		port: 8080,
		hot: true,
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
				pathRewrite: {'^/api' : ''}
			}
		}
	},

	plugins: [
	new webpack.HotModuleReplacementPlugin()
	],
	optimization: {
		usedExports: true
	},
	output: {
		filename: '[name].js',
		chunkFilename: '[name].chunk.js',
		path: path.resolve(__dirname, '../dist')
	}

}

module.exports = merge(commonConfig, devConfig)
