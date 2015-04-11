angular.module('lakesModule').controller('RoomCtrl',function($rootScope,$scope,$routeParams,$location,socket){
    socket.emit('getAllRooms',{
        name:$routeParams.name
    });
    socket.on('roomData.'+$routeParams.name,function(room){
        $scope.room = room;
    });
    socket.on('messageAdded',function(message){
        if($scope.room)
            $scope.room.messages.push(message);
    });
    socket.on('joinRoom',function(join){
        $scope.room.users.push(join.user);
    });
    $scope.back = function(){
        $location.path('/rooms');
    }
    $rootScope.$on('routeLeaveRoom',function(event,user){
        socket.emit('leaveRoom',{
            user:user,
            room:$scope.room
        });
    });
    socket.on('leaveRoom',function(leave){
        $scope.room.users = $scope.room.users.filter(function(user){
            return user.email != leave.user.email;
        });
    });
} );