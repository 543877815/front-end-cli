// 自启动webpack-dev-server

const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js');
// 在命令行中使用webpack 
// 在nodejs中使用webpack
const complier = webpack(config);

const app = express();

app.use(webpackDevMiddleware(complier, {
	publicPath: config.output.publicPath
}))

app.listen(3000, () => {
	console.log('server is running');
})