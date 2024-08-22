var myApp = angular.module('myApp', []);

myApp.run(function ($rootScope) {

    $rootScope.prodsToAdd = [];
    $rootScope.prodToAdd = [{
        pCode: '',
        pCost: '',
        hosName: '',
        pImage: '',
        pDisc: ''
    }];
})


myApp.controller('MainCtrl', function($scope,$http) {

  
   // $scope.cat = 0;

    $scope.prods = [{
        pCode: '',
        pCost: '',
        hosName: '',
        pImage: '',
        pDisc: '',
        pCategory:''
    }];


    $scope.getDataaPos = function () {
//        $scope.prods = $scope.womenCat;
//        $scope.cat = 1;
        
        var getpCategory = [];

        $scope.productCategory = [{
            pCategory: "BloodTypeaPos"
        }];
        getpCategory = $scope.productCategory;
        alert("aPos Category");
        $http.post('/getProductCategory', getpCategory).success(function (gotProducts) {
            //alert("Got Product Data");
            //alert(gotProducts);
             
            var p = [];
            //double parse the string for array
          p = JSON.parse(gotProducts);
           alert(p);
           p = JSON.parse(p);
           //alert(p);
            $scope.prods = p;
     //       $scope.cat = 1;
           
        });
    }



    $scope.getDataaNeg = function () {
//        $scope.prods = $scope.childrenCat;
 //       $scope.cat = 2;
        var getpCategory = [];

        $scope.productCategory = [{
            pCategory: "BloodTypeaNeg"
        }];
        getpCategory = $scope.productCategory;
        alert("aNeg Category");
        $http.post('/getProductCategory', getpCategory).success(function (gotProducts) {
        //    alert("Got Product Data");
          //  alert(gotProducts);

            var p = [];
            //double parse the string for array
            p = JSON.parse(gotProducts);
            alert(p);
            p = JSON.parse(p);
            //alert(p);
            $scope.prods = p;
       //     $scope.cat = 2;

        });
    }


    $scope.getDatabPos = function () {
//        $scope.prods = $scope.menCat;
  //      $scope.cat = 3;
        var getpCategory = [];

        $scope.productCategory = [{
            pCategory: "BloodTypebPos"
        }];
        getpCategory = $scope.productCategory;
        alert("bPos Category");
        $http.post('/getProductCategory', getpCategory).success(function (gotProducts) {
            //alert("Got Product Data");
            //alert(gotProducts);

            var p = [];
            //double parse the string for array
            p = JSON.parse(gotProducts);
            alert(p);
            p = JSON.parse(p);
            //alert(p);
            $scope.prods = p;
         //   $scope.cat = 3;

        });

    }

    $scope.getDatabNeg = function () {
    //    $scope.prods = $scope.cosmeticsCat;
     //   $scope.cat = 4;
        var getpCategory = [];

        $scope.productCategory = [{
            pCategory: "BloodTypebNeg"
        }];
        getpCategory = $scope.productCategory;
        alert("bNeg Category");
        $http.post('/getProductCategory', getpCategory).success(function (gotProducts) {
        //    alert("Got Product Data");
          //  alert(gotProducts);

            var p = [];
            //double parse the string for array
            p = JSON.parse(gotProducts);
            alert(p);
            p = JSON.parse(p);
            //alert(p);
            $scope.prods = p;
           // $scope.cat = 4;

        });
    }


    $scope.getDataabPos = function () {
      //  $scope.prods = $scope.baggagesCat;
      //  $scope.cat = 5;
        var getpCategory = [];

        $scope.productCategory = [{
            pCategory: "BloodTypeabPos"
        }];
        getpCategory = $scope.productCategory;
        alert("ABPos Category");
        $http.post('/getProductCategory', getpCategory).success(function (gotProducts) {
            //alert("Got Product Data");
            //alert(gotProducts);

            var p = [];
            //double parse the string for array
            p = JSON.parse(gotProducts);
            alert(p);
            p = JSON.parse(p);
            //alert(p);
            $scope.prods = p;
           // $scope.cat = 5;

        });

    }


    $scope.add = function (index) {
        //    alert(index);
        $scope.prodsToAdd.push(angular.copy($scope.prods[index]));

    }



    $scope.store = function () {

        var prodString = "something";
        prodString = JSON.stringify($scope.prodsToAdd);

        document.getElementById('products').value = prodString;
    }

});

