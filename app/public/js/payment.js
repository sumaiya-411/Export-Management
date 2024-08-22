var myApp = angular.module('myApp', []);

myApp.run(function ($rootScope) {

    $rootScope.prodsSold = [{
        pCode: '',
        pCost: '',
        hosName: '',
        pImage: '',
        pDisc: '',
        pQuantity: '',
        billNo:''
    }];
    $rootScope.totalAmount = 0;
    $rootScope.months = [];
    $rootScope.years = [];
})



myApp.controller('MainCtrl', function ($scope) {


    $scope.getData = function () {
        
        /*
        var prodStr = document.getElementById('text').value;

        try {
            prodArr = JSON.parse(prodStr);
        }
        catch (e) {
            alert(e.message);
        }
        $scope.prodsSold = prodArr;
        
        $scope.totalAmount = 0;
        angular.forEach($scope.prodsSold, function (item) {
            $scope.totalAmount = $scope.totalAmount + item.pQuantity * item.pCost;
        });
*/
        $scope.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var range = [];
        for (var i = 1970; i < 2050; i++) {
            range.push(i);
        }
        $scope.years = range;
    }
/*
    $scope.makePayment = function () {
        
        var json = JSON.stringify($scope.prodsSold, function (key, value) {
            if (key === "$$hashKey") {
                return undefined;
            }
            return value;
        });
        document.getElementById('products').value = json;
        document.getElementById('totalAmount').value = $scope.totalAmount;   
    }
*/


});
