function test(a,b){
    return function(){
        return a+b;
    }
}

var t = test(1,2);

var arr = [3,444,556,7,33];
arr.sort(function(a,b){
    return b-a;
});
console.log(arr);

var isType = function(type){
    return function(obj){
        return toString.call(obj) == '[object '+type+']'
    }
}

console.log(toString.call("ddd"));
var isString = isType('String');
console.log(isString("dfdfd"));

function repair(name){
    return function(thing){
        console.log(name+" repair " +thing);
    }
}

var zfRepair = repair('zf');
zfRepair('table');

var eatApple = function(mouths,func){
    return function(){
        if(--mouths<=0){
            return func.apply(this,arguments);
        }

    }
}

var e = eatApple(3,function(){
    console.log('我吃完了');
})

e();
e();
e();