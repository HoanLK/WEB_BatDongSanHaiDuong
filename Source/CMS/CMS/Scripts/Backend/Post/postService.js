(function (app) {
    'use strict';

    app.factory('PostService', PostService);

    PostService.$inject = ['$http', '$window', 'ArrayService', 'DateTimeService', 'DevExtremeService', 'StringService'];

    function PostService($http, $window, ArrayService, DateTimeService, DevExtremeService, StringService) {
        var services = {};

        var apiPost = "/API/PostAPI";

        //--- CRUD ---

        //Create
        services.Create = function (post) {
            return $http.post(apiPost, post);
        };

        //Edit
        services.Edit = function (id, post) {
            return $http.put(apiPost + '/' + id, post);
        };

        //Get
        services.GetById = function (id) {
            return $http.get(apiPost + '/' + id);
        };

        //Delete List
        services.DeleteList = function (ids) {
            return $http.delete(apiPost + '?ids=' + ids);
        };


        //--- REDIRECT ---

        //Redirect List
        services.RedirectList = function (id) {
            $window.location.href = '/Admin#!/post';
        };

        //Redirect Edit
        services.RedirectEdit = function (id) {
            $window.location.href = '/Admin#!/post/edit/' + id;
        };

        //Redirect After Edit
        services.RedirectAfterEdit = function (request) {
            switch (request) {
                case 'Edit':
                    Init();
                    break;
                case 'New':
                    $window.location.href = '/Admin#!/post/edit';
                    break;
                case 'Exit':
                    $window.location.href = '/Admin#!/post';
                    break;
            }
        };

        //Redirect Create
        services.RedirectCreate = function () {
            $window.location.href = '/Admin#!/post/edit';
        };

        //Redirect After Create
        services.RedirectAfterCreate = function (request, id) {
            switch (request) {
                case 'Edit':
                    $window.location.href = '/Admin#!/post/edit/' + id;
                    break;
                case 'New':
                    Init();
                    break;
                case 'Exit':
                    $window.location.href = '/Admin#!/post';
                    break;
            }
        };
        //Redirect Cancel
        services.RedirectCancel = function () {
            $window.location.href = '/Admin#!/post';
        };

        return services;
    }


})(angular.module('backend'));
