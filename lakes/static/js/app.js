angular.module('lakesModule',['ngRoute']);
angular.module('lakesModule').run(function($rootScope,$http,$location){
    $http({
        url:'/api/validate',
        method:'GET',
        dataType:'json'
    }).success(function(data,code){
        if(data['code']==1){
            $rootScope.me = $rootScope._me=data['user'];
            $location.path('/rooms');
        }else{
            $location.path('/login');
        }
    })
    $rootScope.$on('login',function(event,me){
        $rootScope.me = $rootScope._me = me;
    });

    $rootScope.logout = function(){
        $http({
            url:'/api/logout',
            method:'GET',
            dataType:'json'
        }).success(function(data,code){
            if(data['code']==1){
                $rootScope.me =null
                $location.path('/login');
            }else{
                $location.path('/login');
            }
        })
    }

    $rootScope.$on('$routeChangeStart',function(evt,next,current){
        if(current&& current.originalPath&& current.originalPath=='/rooms/:name'){
            $rootScope.$broadcast('routeLeaveRoom',$rootScope.me);
        }

    });
});
angular.module('lakesModule').config(function($routeProvider){
    $routeProvider.when('/login',{
        templateUrl:'/pages/login.html',
        controller:'LoginCtrl'
    }).when('/rooms',{
        templateUrl:'/pages/rooms.html',
        controller:'RoomsCtrl'
    }).when('/rooms/:name',{
        templateUrl:'/pages/room.html',
        controller:'RoomCtrl'
    }).otherwise({
        redirectTo:'/login'
    });
});
