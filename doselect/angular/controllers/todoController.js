function todoController($scope, authStorageAccess, arrayHandler, $stateParams) {
	var todoId = "todo_" + $stateParams.id;

    $scope.loadTodo = function() {
        var todo = authStorageAccess.getData(todoId);
        if (todo) {
            $scope.empty = false;
            $scope.todos = todo;
        } else {
            $scope.todos = [];
            $scope.empty = true;
        }
    }
    $scope.addTodo = function() {
        var d = new Date();

        var newToDo = {};
        newToDo.title = $scope.newTodo;
        newToDo.done = false;

        newToDo.id = d.getTime();
        newTodo.edit = false;
        $scope.todos.push(newToDo);
        $scope.save();
        if ($scope.empty)
            $scope.loadTodo();
    }

    $scope.removeTodo = function(id) {
    	arrayHandler.deleteByMatch($scope.todos,'id',id);
        
        $scope.save();
    }

    $scope.checked = function(id, status) {
        
        var id = arrayHandler.findByMatch($scope.todos,'id',id);
       	$scope.todos[id].done = status;
        $scope.save();
    }
    
    $scope.update = function(id, todo) {
        if (todo) {
        	
            var id = arrayHandler.findByMatch($scope.todos,'id',id);
            $scope.todos[id].title = todo;
            $scope.todos[id].edit = false;
        }
        $scope.save();
    }
    
    $scope.save = function() {
        authStorageAccess.setData(todoId, $scope.todos);
        $scope.newTodo = '';
    }
    
    // Initialising
    $scope.loadTodo();
}


angular.module('mainApp')
    .controller('todoController', todoController);
