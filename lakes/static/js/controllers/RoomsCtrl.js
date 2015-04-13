angular.module('lakesModule').controller('RoomsCtrl',function($rootScope,$scope,$http,$location,socket){
    if($rootScope.me){
        socket.emit('getAllRooms');
        socket.on('roomsData',function(rooms){
            $scope.filteredRooms = $scope.rooms = rooms;
        })
    }
    $scope.searchRoom = function(){
        if($scope.searchKey){
            $scope.filteredRooms = $scope.rooms.filter(function(room){
                return room.name.indexOf($scope.searchKey)>-1;
            });
        }else{
            $scope.filteredRooms = $scope.rooms;
        }
    }
    $scope.createRoom = function(){
        socket.emit('createRoom',{
            name:$scope.searchKey
        });
    }
    socket.on('roomAdded',function(room){
        $scope.rooms.push(room);
        $scope.searchRoom();
    })
    $scope.enterRoom = function(room){
        socket.emit('joinRoom',{
            user:$rootScope.me,
            room:room
        });
    }
    socket.on('joinRoom.'+$rootScope.me.email,function(join){
        $location.path('/rooms/'+join.room.name);
    });
});