(function () {
    'use strict';

    angular.module('backend', ['ngRoute', 'ngCookies', 'ngSanitize', 'ngLoadingSpinner', 'dx', 'ngCkeditor'])
        .config(config);

    //---CONFIG---
    config.$inject = ['$compileProvider', '$httpProvider', '$routeProvider', '$locationProvider'];

    function config($compileProvider, $httpProvider, $routeProvider, $locationProvider) {

        $compileProvider.debugInfoEnabled(false);
        $httpProvider.useApplyAsync(1000);

        //Route
        $routeProvider
            //.when('/', {
            //    templateUrl: '/Scripts/Backend/Project/ListProject.min.html',
            //    controller: 'listProjectController'
            //})
            //--- CATEGORY POST ---
            .when('/category-post', {
                templateUrl: '/Scripts/Backend/CategoryPost/ListCategoryPost.html',
                controller: 'listCategoryPostController'
            })
            .when('/category-post/edit', {
                templateUrl: '/Scripts/Backend/CategoryPost/EditCategoryPost.html',
                controller: 'editCategoryPostController'
            })
            .when('/category-post/edit/:id', {
                templateUrl: '/Scripts/Backend/CategoryPost/EditCategoryPost.html',
                controller: 'editCategoryPostController'
            })
            //--- POST ---
            .when('/post', {
                templateUrl: '/Scripts/Backend/Post/ListPost.html',
                controller: 'listPostController'
            })
            .when('/post/edit', {
                templateUrl: '/Scripts/Backend/Post/EditPost.html',
                controller: 'editPostController'
            })
            .when('/post/edit/:id', {
                templateUrl: '/Scripts/Backend/Post/EditPost.html',
                controller: 'editPostController'
            })
            ////Category Project
            //.when('/category-project', {
            //    templateUrl: '/Scripts/Backend/CategoryProject/ListCategoryProject.min.html',
            //    controller: 'listCategoryProjectController'
            //})
            //.when('/category-project/edit', {
            //    templateUrl: '/Scripts/Backend/CategoryProject/EditCategoryProject.min.html',
            //    controller: 'editCategoryProjectController'
            //})
            //.when('/category-project/edit/:id', {
            //    templateUrl: '/Scripts/Backend/CategoryProject/EditCategoryProject.min.html',
            //    controller: 'editCategoryProjectController'
            //})
            ////Project
            //.when('/project', {
            //    templateUrl: '/Scripts/Backend/Project/ListProject.min.html',
            //    controller: 'listProjectController'
            //})
            //.when('/project/edit', {
            //    templateUrl: '/Scripts/Backend/Project/EditProject.min.html',
            //    controller: 'editProjectController'
            //})
            //.when('/project/edit/:id', {
            //    templateUrl: '/Scripts/Backend/Project/EditProject.min.html',
            //    controller: 'editProjectController'
            //})
            //--- PROPERTY ---
            .when('/property', {
                templateUrl: '/Scripts/Backend/Property/ListProperty.html',
                controller: 'listPropertyController'
            })
            .when('/property/edit', {
                templateUrl: '/Scripts/Backend/Property/EditProperty.html',
                controller: 'editPropertyController'
            })
            .when('/property/edit/:id', {
                templateUrl: '/Scripts/Backend/Property/EditProperty.html',
                controller: 'editPropertyController'
            })
            //.when('/tin-bds/edit', {
            //    templateUrl: '/Scripts/Backend/TinBDS/EditTinBDS.min.html',
            //    controller: 'editTinBDSController'
            //})
            //.when('/tin-bds/edit/:id', {
            //    templateUrl: '/Scripts/Backend/TinBDS/EditTinBDS.min.html',
            //    controller: 'editTinBDSController'
            //}).when('/video', {
            //    templateUrl: '/Scripts/Backend/Video/ListVideo.min.html',
            //    controller: 'listVideoController'
            //})
            //.when('/video/edit', {
            //    templateUrl: '/Scripts/Backend/Video/EditVideo.min.html',
            //    controller: 'editVideoController'
            //})
            //.when('/video/edit/:id', {
            //    templateUrl: '/Scripts/Backend/Video/EditVideo.min.html',
            //    controller: 'editVideoController'
            //})
            ////Album Image
            //.when('/album-image', {
            //    templateUrl: '/Scripts/Backend/AlbumImage/ListAlbumImage.min.html',
            //    controller: 'listAlbumImageController'
            //})
            //.when('/album-image/edit', {
            //    templateUrl: '/Scripts/Backend/AlbumImage/EditAlbumImage.min.html',
            //    controller: 'editAlbumImageController'
            //})
            //.when('/album-image/edit/:id', {
            //    templateUrl: '/Scripts/Backend/AlbumImage/EditAlbumImage.min.html',
            //    controller: 'editAlbumImageController'
            //})
            ////Infocompany
            //.when('/infocompany', {
            //    templateUrl: '/Scripts/Backend/System/InfoCompany.min.html',
            //    controller: 'infoCompanyController'
            //})


            .otherwise({
                redirectTo: '/'
            });
    }


})();




