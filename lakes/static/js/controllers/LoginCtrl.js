angular.module('lakesModule').controller('LoginCtrl',function($scope,$http,$location){
    $scope.email = 'zfpx@126.com';
    $scope.login = function(){
        $http({
            url:'/api/login',
            method:'POST',
            data:{email:$scope.email},
            dataType:'json'
        }).success(function(data){
            if(data['code'] == 1){
                $scope.$emit('login',data['user']);
                $location.path('/rooms');
            }
        }).error(function(){
            $location.path('/login');
        });
    }
});