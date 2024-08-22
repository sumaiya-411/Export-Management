var myApp = angular.module('myApp', []);



myApp.run(function ($rootScope) {

    $rootScope.prodsToAdd = [{
        pCode: '',
        pCost: '',
        hosName: '',
        pImage: '',
        pDisc: ''
    }];

    $rootScope.prodToAdd = [{
        pCode: '',
        pCost: '',
        hosName: '',
        pImage: '',
        pDisc: ''
    }];

    $rootScope.prodsSold = [{
        pCode: '',
        pCost: '',
        hosName: '',
        pImage: '',
        pDisc: '',
        pQuantity: '',
        billNo: ''
    }];
    $rootScope.totalAmount = 0;
})


myApp.controller('MainCtrl', function($scope) {

    $scope.add = function(prodToAdd) {

        $scope.prodsToAdd.push(angular.copy(prodToAdd));
    }

    $scope.getData = function () {
       
        var prodStr = document.getElementById('text').value;
        
        try {
            prodArr = JSON.parse(prodStr);

        }
        catch (e) {
            alert(e.message);
        }

        $scope.prodsToAdd = prodArr;
        $scope.prodsSold = prodArr;
        angular.forEach($scope.prodsSold, function (item) { item.pQuantity = 1; item.billNo = 1001 });

    }

    $scope.del = function (index) {
        $scope.prodsSold.splice(index, 1);
    }

    $scope.showBill = function () {
        $scope.totalAmount = 0;
        angular.forEach($scope.prodsSold, function (item) {
            $scope.totalAmount = $scope.totalAmount + item.pQuantity * item.pCost;
        });

    }


    $scope.payment = function () {

        var prodString = "something";
        prodString = JSON.stringify($scope.prodsSold);
        document.getElementById('products').value = prodString;
    }


});