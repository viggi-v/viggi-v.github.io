function roomController($scope, authStorageAccess, arrayHandler, $stateParams, $state) {
    var todoId = "todo_" + $stateParams.id;
    var rooms = [];
    $scope.roomEditing = false;
    $scope.loadRoom = function() {
        rooms = authStorageAccess.getData("allrooms");
        $scope.rooms = null;
        if(rooms){
            var index = arrayHandler.findByMatch(rooms,'roomId',$stateParams.id);
            $scope.room = rooms[index];
        }
        // If the room is not present, just redirect to rooms
        if(!$scope.room)
            $state.go("rooms");

    }
    $scope.editRoom = function(){
        $scope.roomEditing = true;
    }
    $scope.deleteRoom = function(){
        arrayHandler.deleteByMatch(rooms,'roomId',$stateParams.id);
        authStorageAccess.setData("allrooms",rooms);
        $state.go("rooms");
    }
    $scope.saveRoom = function(){
        if($scope.roomForm.$valid){
            var index = arrayHandler.findByMatch(rooms,'roomId',$stateParams.id);
            rooms[index] = $scope.room;
            $scope.roomEditing =false;
            authStorageAccess.setData("allrooms",rooms);
        }
    }
 // Initializing
    $scope.loadRoom();
}

angular.module('mainApp')
    .controller('roomController', roomController);
