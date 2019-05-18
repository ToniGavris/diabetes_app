
var app = angular.module("diabetsApp", ['zingchart-angularjs', 'angularjs-gauge']);
app.controller("testDiabets", function($scope, $http, $timeout, $anchorScroll) {
  $scope.baseUrl = "http://127.0.0.1:5000/";
  $scope.showForm = true;

  $scope.thresholdsGlucose={
     "0": {"color": "green"},
     "140": {"color": "yellow"},
     "190": {"color": "red"}
   };

  $scope.thresholdsPressure={
     '0': {color: 'red'},
     '40': {color: '#d9ff66'},
     '60': {color: 'green'},
     '80': {color: 'yellow'},
     '190': {color: 'red'}
   };
   $scope.thresholdsInsulin={
      '0': {color: 'green'},
      '2.6': {color: 'yellow'},
      '24.9': {color: 'red'}
    };
    $scope.thresholdsBmi={
       '0': {color: 'yellow'},
       '18.5': {color: 'green'},
       '24.9': {color: 'red'}
     };
 $scope.getCircleColor = function(glucose){
   if(! glucose)
    return 'green-bullet';
   else{
     if(glucose < 140)
       return 'green-bullet';
     else if(glucose >= 140 && glucose <= 190){
       return 'yellow-bullet';
     }
     else if(glucose > 190) {
       return 'red-bullet';
     }
   }
 }
 $scope.getBloodPressureParams = function(pressure){
   if(! pressure)
    return 'green-bullet';
   else{
     if(pressure < 40)
     return 'red-bullet';
     else if(pressure >= 40 && pressure < 60) {
       return 'yellow-green-bullet';
     }
     else if(pressure >= 60 && pressure <= 80){
         return 'green-bullet';
     }
     else if(pressure > 80 && pressure <= 90){
         return 'yellow-bullet';
     }
     else if(pressure > 90){
         return 'red-bullet';
     }
   }
 }

   $scope.getInsulinParams = function(insulin) {
     if(! insulin)
      return 'green-bullet';
     else {
       if(insulin < 2.6) {
         return 'yellow-bullet';
       }
       else if(insulin >= 2.6 && insulin <= 24.9) {
         return 'green-bullet';
       }
       else if(insulin > 24.9) {
         return 'red-bullet';
       }
     }
   }

     $scope.getBMIParams = function(bmi) {
       if(! bmi)
        return 'green-bullet';
       else {
         if(bmi < 18.5) {
           return 'yellow-bullet';
         }
         else if(bmi >= 18.5 && bmi <= 24.9) {
           return 'green-bullet';
         }
         else if(bmi > 24.9) {
           return 'red-bullet';
         }
       }
   }
   $scope.goBack = function(){
     $scope.showForm = true;
   }
   $scope.testDiabets = function(glucose, pregnancies,pressure,skin,insulin,bmi,pedigree,age){
     $scope.error=false;
     $scope.showForm = false;
     if(glucose && pregnancies && pressure && skin && insulin && bmi && pedigree && age){
     $scope.dataLoading = true;
     var data = {
       "pregnancies": pregnancies,
       "glucose":glucose,
       "blood_pressure":pressure,
       "skin_thickness":skin,
       "insulin":insulin,
       "bmi":bmi,
       "diabetes_pedigree":pedigree,
       "age":age
     }

    $http({

     method: 'POST',
     url: $scope.baseUrl + 'predict',
     data: data

   }).then(function successCallback(response) {

     if(response.data.status == "success"){
       $scope.result = response.data.result;
     }else{
       $scope.message = response.data.message;
     }
     $timeout( function(){
       $scope.dataLoading = false;
       $scope.glucoseValue = glucose;
       $scope.pressureValue = pressure;
       $scope.insulinValue = insulin;
       $scope.bmiValue = bmi;
        $anchorScroll();
       // var arr = [];
       // arr.push(parseInt(glucose));
       // var myJson = {
       //     "type":"gauge",
       //     "backgroundColor":"transparent",
       //     "scale-r":{
       //       "aperture":200,
       //       "values":"0:300:20",
       //       "center":{
       //         "size":5,
       //         "background-color":"#66CCFF #FFCCFF",
       //         "border-color":"none"
       //       },
       //       "ring":{  //Ring with Rules
       //         "size":10,
       //         // "rules":[
       //         //   {
       //         //     "rule":"%v >= 0 && %v <= 140",
       //         //     "background-color":"green"
       //         //   },
       //         //   {
       //         //     "rule":"%v > 140 && %v <= 190",
       //         //     "background-color":"yellow"
       //         //   },
       //         //   {
       //         //     "rule":"%v >= 190",
       //         //     "background-color":"red"
       //         //   }
       //         // ]
       //       }
       //     },
       //     "plot":{
       //       "csize":"5%",
       //       "size":"100%",
       //       "background-color":"#000000"
       //     },
       //   }
       //   $scope.myJson = {};
       //   Object.keys(myJson).forEach(function(el){
       //     $scope.myJson[el] = myJson[el];
       //   });
       //   $scope.myJson.series = [{"values":arr}];
       //   // $scope.myJson["scale-r"]['ring']['rules'] = [
       //   //   {
       //   //     "rule":"%v >= 0 && %v <= 140",
       //   //     "background-color":"#348746"
       //   //   },
       //   //   {
       //   //     "rule":"%v > 140 && %v <= 190",
       //   //     "background-color":"#eaef4c"
       //   //   },
       //   //   {
       //   //     "rule":"%v >= 190",
       //   //     "background-color":"#c40d0d"
       //   //   }
       //   // ];
       //   $scope.myJson["scale-r"]['ring']['rules'] =[];
       //   $scope.myJson["scale-r"]['ring']['rules'].push({
       //     "rule":"%v >= 0 && %v <= 140",
       //     "background-color":"#348746"
       //   });
       //    $scope.myJson["scale-r"]['ring']['rules'].push({
       //      "rule":"%v > 140 && %v <= 190",
       //      "background-color":"#eaef4c"
       //    });
       //    $scope.myJson["scale-r"]['ring']['rules'].push({
       //      "rule":"%v >= 190",
       //      "background-color":"#c40d0d"
       //    });
       //   $scope.jsonBloodPressure = {};
       //   Object.keys(myJson).forEach(function(el){
       //     $scope.jsonBloodPressure[el] = myJson[el];
       //   });
       //   var arrBloodPressure = [];
       //   arrBloodPressure.push(parseInt(pressure));
       //   $scope.jsonBloodPressure.series = [{"values":arrBloodPressure}];
       //   $scope.jsonBloodPressure["scale-r"]['ring']['rules'] =[];
       //   $scope.jsonBloodPressure["scale-r"]['ring']['rules'].push({
       //     "rule":"%v < 40",
       //     "background-color":"#c40d0d"
       //   });
       //   $scope.jsonBloodPressure["scale-r"]['ring']['rules'].push({
       //     "rule":"%v >= 40 && %v < 60",
       //     "background-color":"#d9ff66"
       //   });
       //   $scope.jsonBloodPressure["scale-r"]['ring']['rules'].push({
       //     "rule":"%v >= 60 && %v <= 80",
       //     "background-color":"#348746"
       //   });
       //   $scope.jsonBloodPressure["scale-r"]['ring']['rules'].push( {
       //      "rule":"%v > 80 && %v <= 90",
       //      "background-color":"#eaef4c"
       //    });
       //    $scope.jsonBloodPressure["scale-r"]['ring']['rules'].push( {
       //      "rule":"%v > 90",
       //      "background-color":"#c40d0d"
       //    });
       //   // $scope.jsonBloodPressure["scale-r"]['ring']['rules'] = [
       //   //   {
       //   //     "rule":"%v < 40",
       //   //     "background-color":"#c40d0d"
       //   //   },
       //   //   {
       //   //     "rule":"%v >= 40 && %v < 60",
       //   //     "background-color":"#d9ff66"
       //   //   },
       //   //   {
       //   //     "rule":"%v >= 60 && %v <= 80",
       //   //     "background-color":"#348746"
       //   //   },
       //   //   {
       //   //     "rule":"%v > 80 && %v <= 90",
       //   //     "background-color":"#eaef4c"
       //   //   },
       //   //   {
       //   //     "rule":"%v > 90",
       //   //     "background-color":"#c40d0d"
       //   //   }
       //   // ];
       //   console.log( $scope.jsonBloodPressure);

     },600)
   }, function errorCallback(response) {
     $scope.dataLoading = false;

   });
 }else{
   $scope.error = true;
 }
   }

});
