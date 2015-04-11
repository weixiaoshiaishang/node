angular.module('lakesModule').controller('MessageCreatorCtrl',function($rootScope,$scope,socket){
    $scope.createMessage= function(){
        if($scope.newMessage){
            socket.emit('createMessage',{content:$scope.newMessage,creator:$rootScope.me,name:$scope.room.name});
            $scope.newMessage = '';
        }
    }
});