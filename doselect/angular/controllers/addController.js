function addController($scope, authStorageAccess, $state) {
    $scope.nameEmpty = false;
    $scope.ownerEmpty = false;
    $scope.save = function() {
        // Saves into local storage	
        if ($scope.roomForm.$valid) {

            var newRoom = {};
            newRoom.roomName = $scope.roomName;
            newRoom.ownedBy = $scope.ownedBy;
            newRoom.note = $scope.note;

            if (authStorageAccess.getData("allrooms")) {
                var allRooms = authStorageAccess.getData("allrooms");
            } else {
                allRooms = [];
            }
            newRoom.roomId = $scope.roomName.toLowerCase().replace(/([^a-z])/g,'');
            allRooms.push(newRoom);
            //Stored as json for easy access
            authStorageAccess.setData("allrooms", allRooms);

            $scope.close();
        }
    }

    $scope.close = function() {
        $scope.roomName = '';
        $scope.ownedBy = '';
        $scope.note = '';
        $state.go("rooms");
    }
}
angular.module('mainApp')
    .controller('addController', addController);
