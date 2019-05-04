
var app = angular.module("diabetsApp", []);
app.controller("testDiabets", function($scope) {
 $scope.products = ["Milk", "Bread", "Cheese"];

 $scope.getCircleColor = function(glucose){
   if(! glucose)
    return 'green-bullet';
   else{
     if(glucose <55 )
     return 'red-bullet';
     else {
       return 'yellow-bullet';
     }
   }
 }
 $scope.getBloodPressureParams = function(pressure){
   if(! pressure)
    return 'green-bullet';
   else{
     if(pressure <120 )
     return 'green-bullet';
     else if(pressure >120 && pressure<129) {
       return 'yellow-bullet';
     }
     else if(pressure >130 && pressure<139){
         return 'orange-bullet';
     }
     else if(pressure >140 && pressure<180){
         return 'orange-red-bullet';
     }
     else{
         return 'red-bullet';
     }
   }
 }
});
