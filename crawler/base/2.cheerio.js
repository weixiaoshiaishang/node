var request = require('request');
var fs = require('fs');
var cheerio = require('cheerio');

var $ = cheerio.load('<h1 class="title">Hello Zfpx</h1>');
$('h1.title').text('hello node.js');
$('h1.title').addClass('welcome');
console.log($.html());