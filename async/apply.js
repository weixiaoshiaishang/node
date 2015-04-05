var async = require('async');
//apply
//console.log('我访问了','/login');
/*
var zflog = async.apply(console.log,'我访问了');
zflog('/login');
zflog('/logout');

*/
function raise(type,mny){
    console.log(type+"涨"+mny);
}
var raiseSalary = async.apply(raise,'工资');
raiseSalary(30000);
var bonus = async.apply(raise,'资金');
bonus(30000);


//iterator(tasks)
//next hasNext
var iter = async.iterator([function(){
    console.log('1');
},function(){
    console.log('2');
},function(){
    console.log('3');
}]);
iter();
iter = iter.next();
iter();
iter = iter.next();
iter();
iter = iter.next();
