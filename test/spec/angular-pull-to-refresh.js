'use strict';
/* global jasmine */

describe('spica.pullToRefresh', function() {

  var $injector, $compile, $timeout, $translate, scope, sandbox;

  beforeEach(module('spica.pullToRefresh'));

  beforeEach(inject(function (_$injector_) {
    $injector = _$injector_;
    $compile = $injector.get('$compile');
    $timeout = $injector.get('$timeout');
    $translate = $injector.get('$translate');
    scope = $injector.get('$rootScope');
    sandbox = $('<div>').attr('id', 'sandbox').appendTo('body');
  }));

  afterEach(function() {
    sandbox.remove();
    scope.$destroy();
  });

  var templates = {
    basic: {
      scope: {states: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']},
      element: '<div class="content">' +
                  '<ul class="list-group list-group-table" pull-to-refresh="onReload()">' +
                    '<li class="list-group-item" ng-repeat="state in states" ng-bind="state"></li>' +
                  '</ul>' +
                '</div>'
    }
  };

  function compileDirective(template, locals) {
    template = templates[template];
    angular.extend(scope, template.scope, locals);
    var element = $(template.element).appendTo(sandbox);
    element = $compile(element)(scope);
    scope.$digest();
    return jQuery(element[0]);
  }

  function languageChange(lang) {
    $translate.uses(lang);
  }

  it('should correctly initialize and attach to DOM', function () {
    var elm = compileDirective('basic');
    var ptrElement = elm.find('.pull-to-refresh');
    expect(ptrElement.length).toBe(1);
    var config = $injector.get('pullToRefreshConfig');
    console.log(ptrElement.children('span').html());
    expect(ptrElement.children('span').html()).toBe($translate(config.text.pull));
    languageChange('ko_KR');
    elm = compileDirective('basic');
    ptrElement = elm.find('.pull-to-refresh');
    console.log(ptrElement.children('span').html());
    expect(ptrElement.children('span').html()).toBe($translate(config.text.pull));
  });

});
