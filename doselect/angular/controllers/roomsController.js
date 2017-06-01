function roomsController($scope, authStorageAccess, $rootScope, $state) {
    $scope.loadRooms = function() {
        $scope.rooms = authStorageAccess.getData("allrooms");
    }
    $scope.loadRooms();
    $rootScope.$on('$stateChangeSuccess', function() {
        if ($state.current.name == "rooms")
            $scope.loadRooms();
    });
}
angular.module('mainApp')
    .controller('roomsController', roomsController);
