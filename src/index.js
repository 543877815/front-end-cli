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
var x = new Promise()