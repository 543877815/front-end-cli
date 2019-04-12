// js test
var scriptJS = require('./js/script.js');

// img test
var testImage = require('./img/test.jpg')
var img = new Image();
img.src = testImage;
img.classList.add('avatar');
var main = document.getElementById('main');
main.append(img);

// css test
import CSSstyle from './css/style.css'

// module test
img.classList.add(CSSstyle.avatar)

// scss test
import SCSSstyle from './scss/style.scss'

// module test
img.classList.add(SCSSstyle.avatar)

// font test
import './font/iconfont.css'
var fontTest = document.createElement('div');
fontTest.innerHTML = '<div class="iconfont iconicon-1"></div>';
main.append(fontTest);

// devserver test
console.log('ddd');

// babel test
const a = 1

// polyfill test
var x = new Promise(function(){})

// tree shaking test
import { add } from './js/script.js'
add(1,2);

// code spliting test
// synchronization 
// dist/vendors~main.js
// import _ from 'lodash'
// console.log(_.join(['a', 'b', 'c'], '***'));
// console.log(_.join(['a', 'b', 'c'], '***'));

// code spliting test
// asynchronization needn't config
// SplitChunksPlugin test
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