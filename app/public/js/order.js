var myApp = angular.module('myApp', []);

myApp.run(function ($rootScope) {



})


myApp.controller('MainCtrl', function ($scope, $http) {
    $scope.cargo = [];
    $scope.shipment = [{
        ccode: '',
        ccategory: '',
        units: '',
        cost: '',
        rcode: '',
        charges: '',
        quantity: '',
        total: ''
    }];


    
    $scope.getData = function () {
        var getbillNum = [];

        $scope.billNum = [{
            billNo: document.getElementById('billNum').value
        }];
        getbillNum = $scope.billNum;
        $http.post('/getOrder', getbillNum).success(function (gotOrder) {
            alert("Got Product Data");
            var p = [];
            //double parse the string for array
            p = JSON.parse(gotOrder);
            p = JSON.parse(p);
            $scope.cargo = p;
        });
    }
});

