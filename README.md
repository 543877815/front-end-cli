# front-end-cli配置日志
可以看[我的博客](https://543877815.github.io/2019/04/10/%E6%9E%84%E5%BB%BA%E8%87%AA%E5%B7%B1%E7%9A%84front-end-cli/)

# 安装

## 全局安装(不推荐)

```bash
npm install webpack webpack-cli -g
```

全局的话容易发生webpack3和webpack4的版本冲突

## 局部安装(推荐)

```bash
npm install webpack webpack-cli -D
# npm install webpack webpack-cli --save-dev
```

## 查看版本

```bash
npx webpack -v
```

### 查看包版本

```bash
npm info webpack
```

<!--more-->

# 配置

项目目录文件下新建

webpack.config.js

## entry & output

webpack.config.js

```js
module.exports = {
	mode:'development', // default 'production' for compression
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'bundle')
	}
}
```

### 多入口

```js
module.exports = {
	mode:'development', // default 'production' for compression
	entry: {
		main: './src/index.js',
		sub: './src/index.js'
	}
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'bundle')
	}
}
```

### publicPath

```js
module.exports = {
	mode:'development', // default 'production' for compression
	entry: './src/index.js',
	optimization: {
	    runtimeChunk: {
			name: 'runtime'  // 提取runtime
		}
	}
	output: {
		filename: '[name].[contenthash].js',
		chunkFilename: '[name].[contenthash].chunk.js',
		path: path.resolve(__dirname, '../dist')
	}
}
```

### 浏览器缓存
```js
module.exports = {
	mode:'development', // default 'production' for compression
	entry: './src/index.js',
	output: {
		publicPath: 'http://cdn.com.cn',
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'bundle')
	}
}
```
## loader(文件打包方案) 

### file-loader

#### 说明

将文件上的import / require（）解析为url，并将文件发送到输出目录中

#### 安装

```bash
npm install file-loader -D
```

#### 代码

webpack.config.js

```js
module.exports = {
    module: {
        rules: [{
            test: /\.(eot|ttf|svg|woff)$/,
            use: {
                loader: 'file-loader',
                options: {
                    name: '[name]_[hash].[ext]',
                    outputPath: 'font/',
				}
            }
        }]
    }
}
```

### url-loader

#### 说明

用于将文件转换为base64 URI

#### 安装

```bash
npm install url-loader -D
```

#### 代码

webpack.config.js

```js
module.exports = {
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
        }]
    }
}
```

### style-loader && css-loader

#### 说明

style-loader通过注入标记将DOM添加到DOM

css-loader解释@ import和url()，如import / require()并解析它们。

#### 安装

```
npm install style-loader css-loader -D
```

#### 代码

webpack.config.js

```js
module.exports = {
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    }
}
```

### sass-loader && node-sass

#### 说明

sass-loader加载Sass / SCSS文件并将其编译为CSS

node-loader是Node.js附加组件加载程序模块，用于增强需求。在enhanced-require中执行附加组件

#### 安装

```bash
npm install sass-loader node-sass -D
```

#### 代码

webpack.config.js

```js
module.exports = {
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                'style-loader', 
                'css-loader',
                'sass-loader'
            ]
        }]
    }
}
```
### postcss-loader

#### 说明

postcss-loader使用PostCSS处理CSS的webpack的加载器(产商前缀)

#### 安装

```bash
npm install postcss-loader -D
```

#### 代码

webpack.config.js

```js
module.exports = {
    module: {
        rules: [
        {
            test: /\.scss$/,
            use: [
                'style-loader', 
                'css-loader',
                'postcss-loader',
                'sass-loader'
            ]
        },
        {
			test: /\.css$/,
			use: [
			'style-loader', 
			'css-loader',
			'postcss-loader'
			]
		}]
    }
}
```

#### 使用

```bash
npm install autoprefixer -D
```

项目目录下创建postcss.config.js

```js
module.exports = {
	plugins: [
		require('autoprefixer')
	]
}
```

#### option: importLoaders

importLoaders选项允许您在将css-loader应用于@imported资源之前配置多少个加载器

```js
module.exports = {
    module: {
        rules: [{
                test: /\.scss$/,
                use: [
                'style-loader', 
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2, 	// 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
                    },
                },
                'postcss-loader',
                'sass-loader'
                ]
            }
        ]
    }
}
```

#### option: modules

modules选项启用/禁用CSS模块规范并设置基本行为。

```js
module.exports = {
    module: {
        rules: [{
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
    			'sass-loader',
    			'postcss-loader'
    			]
    		}
        ]
    }
}
```

## plugin 

### html-webpack-plugin

#### 安装

```bash
npm install html-webpack-plugin -D
```

#### 说明

HtmlWebpackPlugin简化了HTML文件的创建，以便为您的webpack包提供服务。 这对于包含文件名中的哈希的webpack包特别有用，它会更改每个编译。 您可以让插件为您生成HTML文件，使用lodash模板提供您自己的模板，或使用您自己的加载器。

生成html并自动将output注入到htmlzhogn 

#### 代码

webpack.config.js

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
	plugins: [new HtmlWebpackPlugin({
		template: 'src/html/index.html' // 模板
	})],
}
```

### clean-webpack-plugin

#### 安装

```bash
npm install clean-webpack-plugin -D
```

#### 说明

[非官方插件](https://github.com/johnagan/clean-webpack-plugin#options-and-defaults-optional)，用于清除制定目录文件下的内容

#### 代码

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
	plugins: [
	new CleanWebpackPlugin()
	],
}
```

## devtool

### 说明

此选项控制是否以及如何生成源映射。

### 代码

开发

```js
module.exports = {
	mode:'development', //default production to compression
	devtool: 'cheap-module-eval-source-map',
}
```

生产

```js
module.exports = {
	mode:'production',
	devtool: 'cheap-module-source-map',
}
```

## WebpackDevServer

### 说明

webpack-dev-server可用于快速开发应用程序。请参阅开发指南以开始使用。

### 安装

```bash
npm install webpack-dev-server -D
```

### 执行

```bash
npx webpack-dev-server
```

### 说明

devServer.contentBase告诉服务器从哪里提供内容。只有在您想要提供静态文件时才需要这样做

devServer.publicPath将用于确定应该从哪个服务器提供服务，并优先使用

devServer.proxy当您拥有单独的API后端开发服务器并且希望在同一域上发送API请求时，代理某些URL会很有用。

### 代码

```js
module.exports = {
	devServer: {
		contentBase: './dist',
		open: true,
		port: 8080,
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
				pathRewrite: {'^/api' : ''},
                secure: false,
				bypass: function(req, res, proxyOptions) {
					if (req.headers.accept.indexOf('html') !== -1) {
						console.log('Skipping proxy for browser request.');
						return '/index.html';
					}
				}
    
			}
		}
	}
}
```

### webpack-dev-middleware

可用于自启动一个webpack-dev-server

项目目录新建server.js

```js
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js');
const complier = webpack(config);

const app = express();

app.use(webpackDevMiddleware(complier, {
	publicPath: config.output.publicPath
}))

app.listen(3000, () => {
	console.log('server is running');
})
```

webpack.config.js中添加publicPath项

```js
module.exports = {
	output: {
		publicPath: '/',
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	}
}
```

执行

```bash
node server.js
```

## Hot Module Replacement

### 说明

hot启用webpack的热模块替换功能

hot在没有页面刷新的情况下启用热模块替换（请参阅devServer.hot）作为构建失败时的后备

### 代码

```js
const webpack = require('webpack')
module.exports = {
	devServer: {
		contentBase: './dist',
		open: true,
		port: 8080,
		hot: true,
		hotOnly: true,
	}
    plugins: [new webpack.HotModuleReplacementPlugin()],
}
```

## Babel

[Bebel](https://babeljs.io/setup#installation)是一个工具链，主要用于将ECMAScript 2015+代码转换为当前和旧版浏览器或环境中的向后兼容版本的JavaScript。以下是Babel可以为您做的主要事情：

### 安装

```bash
npm install --save-dev babel-loader @babel/core
```

### 代码

```js
module.exports = {
    module: {
      	rules: [
        { 
            test: /\.js$/, 
            exclude: /node_modules/, 
            loader: "babel-loader" 
        }]
    }
}
```

在项目目录下新建.babelrc，相当如babel中options的配置项

### preset-set

#### 说明

[preset-set](https://babeljs.io/docs/en/babel-preset-env)一个转化ES2015+的预设

#### 安装

```bash
npm install @babel/preset-env --save-dev
```

#### 代码

并在.babelrc下输入

```js
{
  "presets": ["@babel/preset-env"]
}
```

在webpack.config.js配置

```js
module.exports = {
    module: {
      	rules: [
	        { 
	            test: /\.js$/, 
	            exclude: /node_modules/, 
	            loader: "babel-loader",
	            options: {
					presets: ["@babel/preset-env"]
				}
	        }
	    ]
	}
}
```

### polyfill

#### 说明

[Polyfill](https://babeljs.io/docs/en/babel-polyfill)是一个`js`库，主要抚平不同浏览器之间对js实现的差异

#### 安装

```bash
npm install --save @babel/polyfill
```

#### 使用

在业务代码中进行引入

```js
import "@babel/polyfill";
```

#### 问题

引入所有纠正由此带来代码臃肿

#### 解决

在webpack.config.js键入以下内容以根据业务代码加载

```js
module.exports = {
    module: {
      rules: [
        { 
            test: /\.js$/, 
            exclude: /node_modules/, 
            loader: "babel-loader",
            options: {
				presets: [["@babel/preset-env",{
					useBuiltIns: 'usage'
				}]]
			}
        }]
    }
}
```

#### warning 及 解决

WARNING: We noticed you're using the `useBuiltIns` option without declaring a core-js version. Currently, we assume version 2.x when no version is passed. Since this default version will likely change in future versions of Babel, we recommend explicitly setting the core-js version you are using via the `corejs` option.

```bash
npm install --save core-js@2
```

### plugin-transform-runtime

#### 说明

[plugin-transform-runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime)一个插件，可以重复使用Babel注入的帮助程序代码来节省代码

用于写类库代码而不污染全局变量

#### 安装

```bash
npm install --save-dev @babel/plugin-transform-runtime
npm install --save @babel/runtime
npm install --save @babel/runtime-corejs2

```

#### 使用

```js
module.exports = {
    module: {
      rules: [
        { 
            test: /\.js$/, 
            exclude: /node_modules/, 
            loader: "babel-loader",
            options: {
				plugins: [["@babel/plugin-transform-runtime"],{
                    "corejs": 2,
                    "helpers": true,
                    "regenerator": true,
                    "useESModules": false
                }]
			}
        }]
    }
}
```

## Tree shaking

### 说明

Tree shaking用于JavaScript上下文中常用于消除死代码

Tree shaking只支持ES module的引入，即import，不支持require

mode: 'production'自带Tree shaking

mode: 'development'需要配置

### 代码

```js
module.exports = {
	optimization: {
		usedExports: true
	},
}
```

package.json 中 sizeEffects 用于免于tree shaking的文件

```json
{
      "sizeEffects": false,
      // "sizeEffects": ['@babel/polly-fill', '*.css']
}
```



## 区分development和production打包

### webpack-merge

#### 安装

```bash
npm install webpack-merge -D
```

在文件目录下创建build文件夹

创建webpack.common.js、webpack.dev.js、webpack.prod.js

#### webpack.commom.js

```js
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
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, '../dist') // 上层目录
	}
}
```

#### webpaack.dev.js

```js
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
```

#### webpack.prod.js

```js
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

const prodConfig = {
	mode: 'production',
	devtool: 'cheap-module-source-map',
}

module.exports = merge(commonConfig, prodConfig)
```

### npm script

package.json中

```json
{
  "scripts": {
    "dev": "webpack-dev-server --config ./build/webpack.dev.js",
    "build": "webpack --config ./build/webpack.prod.js"
  }
}
```

## Code Splitting

### 同步代码分割

需要在webpack.common.js中做optimization的配置

```js
module.exports = {
	optimization: {
		splitChunks: {
			chunks: 'all'
		}
	}
}
```

### 异步代码分割

不需要做任何配置，会自动进行代码分割，但是需要安装babel-plugin-dynamic-import-webpack进行ES6转化

### babel-plugin-dynamic-import-webpack

#### 说明

非官方

#### 安装

```bash
npm install babel-plugin-dynamic-import-webpack -D
```

#### 代码

.babelrc

```json
{
	plugins: ["dynamic-import-webpack"]
}
```

### plugin-syntax-dynamic-import

#### 说明

官方

#### 安装

```bash
npm install --save-dev @babel/plugin-syntax-dynamic-import
```

####  代码

```json
{
  "plugins": ["@babel/plugin-syntax-dynamic-import"]
}
```

### SplitChunksPlugin

#### 说明

使用前必须安装上述plugin-syntax-dynamic-import

最初，块（以及在其中导入的模块）通过内部webpack图中的父子关系进行连接。CommonsChunkPlugin用于避免跨越它们的重复依赖，但无法进一步优化。

#### 代码

main.js

```js
function getComponent(){
	return import(/* webpackChunkName:"lodash" */'lodash').then(({default: _})=>{
		var element = document.createElement('div');
		element.innerHTML = _.join(['Dell', 'Lee'], '-');
		return element
	})
}
getComponent().then(element=>{
	document.body.appendChild(element);
})
```

webpack.common.js，同步的代码会读取到cacheGroups而异步的不会

```js
module.exports = {
	optimization: {
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				vendors: false,
				default: false
			}
		}
	}
}
```

结果：会在dist目录单独生成lodash.js

配置同步代码和异步代码的加载

```js
module.exports = {
	optimization: {
		splitChunks: {
			chunks: 'all',
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
	}
}
```

## analyse

### 使用

[参见官网](https://github.com/webpack/analyse)

package.json中加入scripts

```json
{
    "scripts": {
            "analyse": "webpack --profile --json > stats.json --config ./build/webpack.dev.js"
    }
}
```

打开[分析网站](http://webpack.github.io/analyse/)或者[webpack-chart](http://alexkuz.github.io/webpack-chart/)，将项目下生成的stat.json文件上传，更多分析工具看[这里](https://webpack.js.org/guides/code-splitting/#bundle-analysis)

## Preloading && Prefetching

### 说明

webpack推荐的一种代码分离异步加载的方式

### 使用

index.js

```js
document.addEventListener('click', () => {
	import(/* webpackPrefetch: true*/ './js/click.js').then(({default: func})=>{
		func();
	})
})
```

click.js

```js
function handleClick(){
	const element = document.createElement('div');
	element.innerHTML = 'Dell Lee';
	document.body.appendChild(element);
}

export default handleClick;
```

## MiniCssExtractPlugin

### 说明

此插件将CSS提取到单独的文件中。它为每个包含CSS的JS文件创建一个CSS文件。它支持CSS和SourceMaps的按需加载。

### 安装

```bash
npm install --save-dev mini-css-extract-plugin
```

### 使用

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
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
	plugins: [
	new MiniCssExtractPlugin({
		filename: '[name].css',
		chunkFilename: '[name].chunk.css'
	})
	]
}
```

防止tree shaking

package.json

```json
{
  "sizeEffects": [
    "*.css"
  ],
}
```

## optimize-css-assets-webpack-plugin

### 说明

一个插件的WebPack优化\压缩CSS文件。

### 安装

```bash
npm install --save-dev optimize-css-assets-webpack-plugin
```

### 使用

```js
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
      }
}
```

## UglifyjsWebpackPlugin

### 说明

这个插件使用uglify-js来缩小你的JavaScript。

### 安装

```bash
npm install uglifyjs-webpack-plugin -D
```

### 使用

```js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
};
```

## workboxWebpackPlugin

### 说明

[官方文档](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin)

Workbox provides two webpack plugins: one that generates a complete service worker for you and one that generates a list of assets to precache that is injected into a service worker file.

The plugins are implemented as two classes in the `workbox-webpack-plugin` module, named `GenerateSW` and `InjectManifest`. The answers to the following questions can help you choose the right plugin and configuration to use.

用于在webpack中使用PWA

### 安装

```bash
npm install workbox-webpack-plugin -D
```

### 使用

```js
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
module.exports = {
	plugins: [
	new WorkboxWebpackPlugin.GenerateSW({
		clientsClaim: true,
		skipWaiting: true
	})]
}
```

### 测试

先安装http-server

```bash
npm install http-server -D
```

输入以启用服务

```bash
npx http-server dist
```

于http://localhost:8080/访问该服务

## Eslint

### 安装

```bash
npm install eslint -D
npm install eslint-loader -D
```

### 快速初始化

```bash
npx eslint --init
```

### 使用

```js
module.exports = {
	module: {
		rules: [
		{ 
			test: /\.js$/, 
			exclude: /node_modules/, 
			use: ["babel-loader", {
				loader: 'eslint-loader',
				options: {
					fix: true
				}
			}]
		}
	}
}
```

