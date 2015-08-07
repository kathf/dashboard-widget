//= require jquery
//= require jquery_ujs
//= require angular
//= require angular-resource
//= require angular-route
//= require angular-rails-templates
//= require bootstrap
//= require_tree ./templates
//= require_tree .


(function(){

  var app = angular.module('myApp', [
    // 'ngRoute',
    // 'ngResource',
    'dashboardModule',
    'widgetModule',
    'mapModule',
  ])

})();
