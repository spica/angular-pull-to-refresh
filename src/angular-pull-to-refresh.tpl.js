angular.module('spica.pullToRefresh').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('angular-pull-to-refresh.tpl.html',
    "<div class=\"pull-to-refresh\">\n" +
    "  <i ng-class=\"icon[status]\"></i>&nbsp;\n" +
    "  <span>{{ text[status] | translate}}</span>\n" +
    "</div>\n" +
    "<div ng-transclude></div>\n"
  );

}]);
