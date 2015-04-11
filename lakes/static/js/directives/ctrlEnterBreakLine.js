angular.module('lakesModule').directive('ctrlEnterBreakLine',function(){
    return function(scope,element,attrs){
        var ctrl = false;
        element.bind('keydown',function(event){
            if(event.which == 17){//ctrl键
                ctrl = true;
                setTimeout(function(){
                    ctrl = false;
                },1000);
            }
            if(event.which == 13){
                if(ctrl){
                    element.val(element.val()+"\n");
                }else{
                    scope.$apply(function(){
                        scope.$eval(attrs.ctrlEnterBreakLine);
                    });
                    event.preventDefault();
                }
            }
        });
    }
});