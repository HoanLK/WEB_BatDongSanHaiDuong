(function (app) {
    'use strict';

    app.factory('CommonService', CommonService);

    CommonService.$inject = ['$http'];

    function CommonService($http) {
        var services = {};

        //Get Current Account
        services.GetCurrentAccount = function () {
            return $http.get('/Account/GetCurrentAccount');
        };

        //Check Null && Undefinend
        services.CheckNull = function (input) {
            if (input === null || input === '' || input === undefined) {
                return false;
            } else {
                return true;
            }
        };

        //Generate Multi Level
        services.GenMultiLevel = function (input) {
            var temp = angular.copy(input);
            var output = [];

            angular.forEach(temp, function (value, index) {
                MultiLevel(value, 0);
            });

            function MultiLevel(category, count) {
                if (output.indexOf(category) === -1) {
                    for (var i = 1; i <= count; i++) {
                        category.Title = "– " + category.Title;
                    }
                    count++;
                    output.push(category);
                    angular.forEach(temp, function (value, index) {
                        if (value.ParentId === category.Id) {
                            MultiLevel(value, count);
                        }
                    });
                }
            }

            return output;
        };

        return services;
    }


})(angular.module('backend'));
