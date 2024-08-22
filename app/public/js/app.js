var myApp = angular.module('myApp', ['ngRoute']);


myApp.controller('MainCtrl', function($scope, srvShareData) {

    $scope.prodsToAdd = [{
        pCost: '1001',
        pName: 'fdsfd'
    }];

    $scope.shareMyData = function (prodToAdd) {

        $scope.prodsToAdd = prodToAdd;
        srvShareData.add($scope.prodsToAdd);
        }
});

myApp.controller('SecondCtrl', function($scope, srvShareData) {

    $scope.sharedData = srvShareData.getData();

});

myApp.service('srvShareData', function($window) {
    var KEY = 'App.SelectedValue';

    var add = function(newObj) {
        var mydata = $window.sessionStorage.getItem(KEY);
        if (mydata) {
            mydata = JSON.parse(mydata);
        } else {
            mydata = [];
        }
        mydata.push(newObj);
        $window.sessionStorage.setItem(KEY, JSON.stringify(mydata));
    };

    var getData = function(){
        var mydata = $window.sessionStorage.getItem(KEY);
        if (mydata) {
            mydata = JSON.parse(mydata);
        }
        return mydata || [];
    };

    return {
        add: add,
        getData: getData
    };
});