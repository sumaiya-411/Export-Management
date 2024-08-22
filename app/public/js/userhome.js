var myApp = angular.module('myApp', []);

myApp.run(function ($rootScope) {

    $rootScope.prodsToAdd = [];


})


myApp.controller('MainCtrl', function($scope,$http) {

    $scope.category = [];
    $scope.route = [];
    $scope.cargo = [];
    
    $scope.addCategory = [];


    $scope.getCargoCategory = function () {
        alert("Get Category Details");
        $http.post('/getCategoryDetails').success(function (gotBooks) {
            var p = [];
            //double parse the string for array
            p = JSON.parse(gotBooks);
            p = JSON.parse(p);
            //alert(p);
            $scope.category = p;
        });
    }

    $scope.add = function (categorycode) {
        document.getElementById('ccategory').value = $scope.category[categorycode - 1].ccategory;

        //        document.getElementById('ccategory').value = "Medical";
        document.getElementById('units').value = $scope.category[categorycode - 1].units;
        document.getElementById('cost').value = $scope.category[categorycode - 1].cost;
    }

    $scope.getRouteCategory = function () {
        alert("Get Category Details");
        $http.post('/getRouteDetails').success(function (gotBooks) {
            var p = [];
            //double parse the string for array
            p = JSON.parse(gotBooks);
            p = JSON.parse(p);
            //alert(p);
            $scope.route = p;
        });
    }



    $scope.addroute = function (routecode) {
        document.getElementById('source').value = $scope.route[routecode - 1].source;
        document.getElementById('destination').value = $scope.route[routecode - 1].destination;
        document.getElementById('noofdays').value = $scope.route[routecode - 1].noofdays;
        document.getElementById('charges').value = $scope.route[routecode - 1].charges;
    }

    $scope.addCargo = function () {

        cc = document.getElementById('ccode').value - 1;
        rc = document.getElementById('rcode').value - 1;
        cc = $scope.category[cc].ccode;
        rc = $scope.route[rc].rcode;

        //alert($scope.route[cc].rcode);
        //alert($scope.category[rc].ccode);
        ch = parseInt(document.getElementById('charges').value);
        co = parseInt(document.getElementById('cost').value);
        qu = parseInt(document.getElementById('quantity').value);
        total = ch + co * qu;

        document.getElementById('total').value = total;
        $scope.cargo.push({
            'ccode': cc,
            'ccategory': document.getElementById('ccategory').value,
            'units': document.getElementById('units').value,
            'cost': document.getElementById('cost').value,
            'rcode': rc,
            'charges': document.getElementById('charges').value,
            'quantity': document.getElementById('quantity').value,
            'total': document.getElementById('total').value,
            'billNo': document.getElementById('billNo').value
        });

    }


    $scope.order = function () {
        alert('submit Data');

        var json = JSON.stringify($scope.cargo, function (key, value) {
            if (key === "$$hashKey") {
                return undefined;
            }
            return value;
        });

        alert(json);
        var car = [];
        car = JSON.parse(json);
        //alert(books);
        $http.post('/addCargoOrder', car).success(function (books) {
            //alert(books);
            alert("Order Placed");
        });
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

