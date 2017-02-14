angular.module('woele', ['ng', 'ngRoute', 'ngAnimate']).
  controller('parentCtrl', function($scope, $location){
    $scope.phone = ''
    $scope.jump = function(routeUrl){
      $location.path(routeUrl);
    }
  }).
  controller('startCtrl', function ($scope, $location,$interval) {
  	$scope.enterTime = 3;
  	stop = $interval(function(){
  		$scope.enterTime--;
  		if(!$scope.enterTime){
  			$scope.jump('/main');
  			$interval.cancel(stop);
  			stop = null;
  		}
  	},1000)
  	
  }).
  controller('mainCtrl', function ($scope,$http) {
    $scope.hasMore = true;  //是否还有更多数据可供加载
    $scope.dishList = [];  //用于保存所有菜品数据的数组
  
    $http.get('data/dish_listbypage.php?start=0').
      success(function(data){
        $scope.dishList = $scope.dishList.concat(data);
      });
    //“加载更多”按钮的单击事件处理函数：每点击一次，加载更多的5条数据
    $scope.loadMore = function(){
      $http.get('data/dish_listbypage.php?start='+$scope.dishList.length).
        success(function(data){
          if(data.length<5){  
            $scope.hasMore = false;
          }
          $scope.dishList = $scope.dishList.concat(data);
        });
    }
    //监视搜索框中的内容是否改变——监视 kw Model变量
    $scope.$watch('kw', function(){
      if( $scope.kw ){
        $http.get('data/dish_listbykw.php?kw='+$scope.kw).
          success(function(data){
            $scope.dishList = data;
          })
      }
    })
  }).
  controller('detailCtrl', function ($scope,$http, $routeParams) {
    $http.get('data/dish_listbydid.php?did='+$routeParams.did).
      success(function(data){
        $scope.dish = data[0];
      })
  }).
  controller('orderCtrl', function($rootScope, $scope,$routeParams,$http){
    
    $scope.order = {};
    $scope.order.did = $routeParams.did;
    $scope.order.phone = '15573294740';
    $scope.order.sex = '1';
    $scope.order.user_name = '周凯';
    $scope.order.addr = '琴湖10栋';

 

    $scope.submitOrder = function(){
      
      $rootScope.phone = $scope.order.phone;
      //把客户端输入的数据转换
      var str = jQuery.param($scope.order);

      $http.post('data/order_add.php', str).
        success(function(data){
          $scope.result = data[0];
        })
    }
  }).
  controller('myorderCtrl',function($rootScope, $scope,$routeParams,$http){
      console.log($rootScope.phone);
      $http.get('data/order_listbyphone.php?phone='+$rootScope.phone).success(function(data){
        $scope.orderList = data;
      });
  }).
  config(function ($routeProvider) {
    $routeProvider.
      when('/start', {
        templateUrl: 'tpl/start.html',
        controller: 'startCtrl'
      }).
      when('/main', {
        templateUrl: 'tpl/main.html',
        controller: 'mainCtrl'
      }).
      when('/detail/:did', {
        templateUrl: 'tpl/detail.html',
        controller: 'detailCtrl'
      }).
      when('/order/:did', {
        templateUrl: 'tpl/order.html',
        controller: 'orderCtrl'
      }).
      when('/myorder',{
        templateUrl: 'tpl/myorder.html',
        controller: 'myorderCtrl'
      }).
      otherwise({
        redirectTo: '/start'
      })
  }).
  run(function($http){
    //设置$http.post请求的默认请求消息头部
    $http.defaults.headers.post = {
      'Content-Type':'application/x-www-form-urlencoded'
    }
  })
