'use strict';

angular.module('kriti', [
    'ngDialog', // Dialog Box Module
    'ngAnimate', // Animation Support
    'ui.router', // Routing Support
    'angular-loading-bar', // AJAX Loading Bar
    'bootstrapLightbox', // Lightboxes
    'ngFileUpload', // File Upload
    'kriti.filters',
    'kriti.services',
    'kriti.main',
    'kriti.home',
    'kriti.profile'
  ])
  .config(['$interpolateProvider', 'cfpLoadingBarProvider',
    function ($interpolateProvider, cfpLoadingBarProvider) {
      $interpolateProvider.startSymbol('{~'); // Prevent conflicts from Django Templating
      $interpolateProvider.endSymbol('~}');
      cfpLoadingBarProvider.parentSelector = '#circular-loader';
    }
  ])
  .config(['LightboxProvider',
    function (LightboxProvider) {
      LightboxProvider.templateUrl = '/static/views/parts/item.html';
      LightboxProvider.getImageUrl = function (item) {
        return item.entities[0].file; // Return image URL to feed lightbox
      };
      LightboxProvider.getImageCaption = function (item) {
        return item.itemName; // Return item name/title to feed lightbox
      };
  }])
  .run(function ($rootScope) {
    Messenger.options = { // Options for Notification plugin
      extraClasses: 'messenger-fixed messenger-on-top',
      theme: 'air'
    };
    // Autoscroll to top on navigating to new route
    $rootScope.$on('$stateChangeSuccess', function() {
       document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
  });
