  var myApp = angular.module('myApp', []);

myApp.run(function ($rootScope) {

    $rootScope.prodsToAdd = [];


})


myApp.controller('MainCtrl', function($scope,$http) {

    
    $scope.imageName = "";

    $scope.add = function(prodToAdd) {

        $scope.prodsToAdd.push(angular.copy(prodToAdd));
    }

    $scope.store = function() {
        var prodString="something";
        prodString=JSON.stringify($scope.prodsToAdd);

        document.getElementById('prods').value=prodString;
        //alert("Proceed to billing");

    }


    $scope.submitData = function () {
        alert('submit Data');

        $scope.route = [{
            rcode: document.getElementById('rcode').value,
            source: document.getElementById('source').value,
            destination: document.getElementById('destination').value,
            noofdays: document.getElementById('noofdays').value,
            charges: document.getElementById('charges').value
        }];

        var route = [];
        route = $scope.route;
        alert("Route to add");
//        alert(prods[0].pCode);

        $http.post('/addRoute', route).success(function (cat) {
            //alert(cat);
            alert("Submitted Data");
        });
    }

    $scope.getData = function () {
        var getr=[];
        alert("getroute");
        $scope.route = [{
            rcode: document.getElementById('getroute').value
             }];
        getr = $scope.route;
        $http.post('/getroute', getr).success(function (gotr) {
            alert("Got Data");
            var p = [];
            //double parse the string for array
            p = JSON.parse(gotr);
            p = JSON.parse(p);


            document.getElementById('rcode').value = p[0].rcode;
            document.getElementById('source').value = p[0].source;
            document.getElementById('destination').value = p[0].destination;
            document.getElementById('noofdays').value = p[0].noofdays;
            document.getElementById('charges').value = p[0].charges;
             });    
    }

    $scope.updateData = function () {
        alert('submit Data for update');

        $scope.route = [{
            rcode: document.getElementById('rcode').value,
            source: document.getElementById('source').value,
            destination: document.getElementById('destination').value,
            noofdays: document.getElementById('noofdays').value,
            charges: document.getElementById('charges').value
         }];

        var r = [];
        r = $scope.route;
        alert("route to update");
        //        alert(prods[0].pCode);

        $http.post('/updateroute', r).success(function (r) {
            alert(r);
            alert("Updated Data");
        });
    }

    

    $scope.deleteData = function () {
        var getr = [];
        $scope.rcode = [{
            rcode: document.getElementById('getroute').value
        }];
        getr = $scope.rcode;
        $http.post('/deleteroute', getr).success(function (gotr) {
            alert(gotr);
            document.getElementById('rcode').value ="";
            document.getElementById('source').value = "";
            document.getElementById('destination').value = "";
            document.getElementById('noofdays').value = "";
            document.getElementById('charges').value = "";
        });    
    }
});

