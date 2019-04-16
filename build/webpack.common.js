const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	module: {
		rules: [
		{ 
			test: /\.js$/, 
			exclude: /node_modules/, 
			use: ["babel-loader"]
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
		}
		]
	},
	plugins: [
	new HtmlWebpackPlugin({
		template: 'src/template/index.html'
	}),
	new CleanWebpackPlugin(),
	new CopyWebpackPlugin([
      { from: 'src/data/', to: './data/' },
    ]),
	],
	optimization: {
		usedExports: true,
		runtimeChunk: {
			name: 'runtime'
		},
		splitChunks: {
			chunks: 'all',
			// delete
			minSize: 30000,  // 代码分割最小大小
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: '~',
			name: true,
			cacheGroups: {
				// 同步引入
				vendors: {
					test: /[\\/]node_modules[\\/]/, // 把node_modules的文件打包到vendors.js中
					priority: -10,
				},
				default: {
					priority: -20,
					reuseExistingChunk: true,
					filename: 'common.js'
				}
			}
		}
	},

}