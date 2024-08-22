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

        $scope.category = [{
            ccode: document.getElementById('ccode').value,
            ccategory: document.getElementById('ccategory').value,
            units: document.getElementById('units').value,
            cost: document.getElementById('cost').value
        }];

        var category = [];
        category = $scope.category;
        alert("Category to add");
//        alert(prods[0].pCode);

        $http.post('/addCategory', category).success(function (cat) {
            //alert(cat);
            alert("Submitted Data");
        });
    }

    $scope.getData = function () {
        var getcat=[];
        alert("getcat");
        $scope.category = [{
            ccode: document.getElementById('getcat').value
             }];
        getcat = $scope.category;
        $http.post('/getcat', getcat).success(function (gotcat) {
            alert("Got Data");
            var p = [];
            //double parse the string for array
            p = JSON.parse(gotcat);
            p = JSON.parse(p);

            document.getElementById('ccode').value = p[0].ccode;
            document.getElementById('ccategory').value = p[0].ccategory;
            document.getElementById('units').value = p[0].units;
            document.getElementById('cost').value = p[0].cost;

             });    
    }

    $scope.updateData = function () {
        alert('submit Data for update');

        $scope.category = [{
            ccode: document.getElementById('ccode').value,
            ccategory: document.getElementById('ccategory').value,
            units: document.getElementById('units').value,
            cost: document.getElementById('cost').value
        }];

        var cat = [];
        cat = $scope.category;
        alert("Category to update");
        //        alert(prods[0].pCode);

        $http.post('/updatecategory', cat).success(function (cat) {
            alert(cat);
            alert("Updated Data");
        });
    }

    

    $scope.deleteData = function () {
        var getcategory = [];

        $scope.catcode = [{
            ccode: document.getElementById('getcat').value
        }];
        getcategory = $scope.catcode;
        $http.post('/deletecategory', getcategory).success(function (gotcategory) {
            alert(gotcategory);
            
            document.getElementById('ccode').value = "";
            document.getElementById('ccategory').value = "";
            document.getElementById('units').value = "";
            document.getElementById('cost').value = "";
        });    
    }

});

