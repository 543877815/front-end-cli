const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const path = require('path')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

const prodConfig = {
	mode: 'production',
	devtool: 'cheap-module-source-map',
	module:{
		rules: [
		{
			test: /\.css$/,
			use: [
			MiniCssExtractPlugin.loader,
			'css-loader',
			'postcss-loader'
			]
		},
		{
			test: /\.scss$/,
			use: [
			MiniCssExtractPlugin.loader,
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
	optimization: {
		minimizer: [
		new OptimizeCssAssetsPlugin({}),
		new UglifyJsPlugin()
		],
	},
	plugins: [
	new MiniCssExtractPlugin({
		filename: '[name].css',
		chunkFilename: '[name].chunk.css'
	}),
	new WorkboxWebpackPlugin.GenerateSW({
		clientsClaim: true,
		skipWaiting: true
	})
	],
	output: {
		filename: '[name].[contenthash].js',
		chunkFilename: '[name].[contenthash].chunk.js',
		path: path.resolve(__dirname, '../dist')
	}
}

module.exports = merge(commonConfig, prodConfig)
