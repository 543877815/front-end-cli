const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

const devConfig =  {
	mode: 'development', 
	devtool: 'cheap-module-eval-source-map',

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

}

module.exports = merge(commonConfig, devConfig)
