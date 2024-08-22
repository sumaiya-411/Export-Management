var myApp = angular.module('myApp', []);

myApp.run(function ($rootScope) {

//    $rootScope.firstname;


})


myApp.controller('MainCtrl', function($scope,$rootScope) {


    $scope.add = function(prodToAdd) {

        $scope.prodsToAdd.push(angular.copy(prodToAdd));
    }

    $scope.store = function() {
        var prodString="something";
        prodString=JSON.stringify($scope.prodsToAdd);

        document.getElementById('prods').value=prodString;
        //alert("Proceed to billing");

    }

});

