
function MiddleWare(){
    this._stack = [];
}

MiddleWare.prototype.use = function(cb){
    this._stack.push(cb);
}

MiddleWare.prototype.run = function(callback){
    var index = 0;
    var self = this;
    function next(){
        if(index<self._stack.length){
            self._stack[index++](next);
        }else{
            callback();
        }
    }
    next();
}

var ware = new MiddleWare();
ware.use(function(next){
    console.log(1);
    next();
});
ware.use(function(next){
    console.log(2);
});
ware.use(function(next){
    console.log(3);
});
ware.run(function(){
    console.log('over');
});