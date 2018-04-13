(function (app) {
    'use strict';

    app.factory('CRUDService', CRUDService);

    CRUDService.$inject = ['$http'];

    function CRUDService($http) {
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

        //---CRUD---
        //Get
        services.Get = function (api) {
            return $http.get(api);
        };
        //Create
        services.Create = function (api, value) {
            return $http.post(api, value);
        };
        //Edit
        services.Edit = function (api, id, value) {
            return $http.put(api + '/' + id, value);
        };
        //Delete
        services.Delete = function (api, id) {
            return $http.delete(api + '/' + id);
        };
        //DeleteList
        services.DeleteList = function (api, ids) {
            return $http.delete(api + '?ids=' + ids);
        };
        //DeleteByRequest
        services.DeleteByRequest = function (api, request, value) {
            return $http.delete(api + '?request=' + request + '&&value=' + value);
        };

        //---DATE TIME---
        services.ToUTCDate = function (datetime) {
            return new Date(datetime + " UTC");
        };

        return services;
    }


})(angular.module('backend'));
