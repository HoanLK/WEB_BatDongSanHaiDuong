(function (app) {
    'use strict';

    app.controller('listPostController', listPostController);

    listPostController.$inject = ['$scope', '$http', '$window', '$cookies', 'ArrayService', 'CRUDService', 'DateTimeService', 'DevExtremeService', 'StringService'];

    function listPostController($scope, $http, $window, $cookies, ArrayService, CRUDService, DateTimeService, DevExtremeService, StringService) {
        //---VAR---
        //Page
        $scope.page = {
            title: "Danh sách Bài viết"
        };
        $scope.filter = false;
        $scope.filterPost = {
            Published: 1
        };
        //Post
        $scope.posts = [];
        $scope.tempPosts = [];
        $scope.post = {};
        $scope.selectedPosts = [];
        var apiPost = "/API/PostAPI";
        //CategoryPost
        $scope.categoryPosts = [];
        var apiCategoryPost = "/API/CategoryPostAPI";

        //Var form Control
        $scope.status = [
            {
                text: "-- Tất cả --",
                value: null
            },
            {
                text: "Xuất bản",
                value: true
            },
            {
                text: "Chưa xuất bản",
                value: false
            }
        ];

        //---POPUP---
        //Delete
        $scope.deletePost = {
            status: false,
            title: "Bạn có chắc chắn muốn xóa?",
            popup: {
                width: "auto",
                height: "auto",
                contentTemplate: "templateDeletePost",
                showTitle: false,
                bindingOptions: {
                    visible: "deletePost.status"
                }
            }
        };

        //---FILTER---
        //Control
        $scope.controlFilter = {

            //SelectBox
            Published: {
                displayExpr: 'text',
                valueExpr: "value",
                searchEnabled: true,
                noDataText: "Không có dữ liệu",
                placeholder: "Chọn ...",
                bindingOptions: {
                    items: "status",
                    value: "filterPost.Published"
                }
            },
            //DateBox
            StartDate: {
                type: "date",
                displayFormat: "dd/MM/yyyy",
                bindingOptions: {
                    value: "filterPost.StartDate"
                }
            },
            EndDate: {
                type: "date",
                displayFormat: "dd/MM/yyyy",
                bindingOptions: {
                    value: "filterPost.EndDate"
                }
            }

            //Button
        }

        //---LIST---
        //Posts
        $scope.gridPosts = angular.copy(DevExtremeService.DefaultGrid);
        $scope.gridPosts.bindingOptions = {
            dataSource: 'posts',
            'columns[5].lookup.dataSource': 'categoryPosts',
            'filterRow.visible': 'filter'
        };
        $scope.gridPosts.columns = [
            {//0
                caption: "ID",
                dataField: "Id",
                width: 90
            },
            {//1
                caption: "Trạng thái",
                dataField: "Published",
                cellTemplate: "publishedCellTemplate",
                width: 90
            },
            {//2
                caption: "Nổi bật",
                dataField: "Featured",
                cellTemplate: "featuredCellTemplate",
                width: 90
            },
            {//3
                caption: "Tiêu đề",
                dataField: "Title",
                dataType: "string"
            },
            {//4
                caption: "Alias",
                dataField: "Alias",
                dataType: "string",
                visible: false
            },
            {//5
                caption: "Danh mục",
                dataField: "CategoryId",
                lookup: {
                    displayExpr: 'Title',
                    valueExpr: 'Id'
                }
            },
            {//6
                alignment: "left",
                caption: "Ngày tạo",
                dataField: "TimeCreated",
                dataType: "date",
                format: "dd/MM/yyyy",
                customizeText: function (cellInfo) {
                    return cellInfo.valueText;
                },
                width: 100
            },
            {//7
                alignment: "center",
                caption: "Lượt xem",
                dataField: "Views",
                cellTemplate: "viewsCellTemplate",
                width: 90
            },
            {//7
                alignment: "left",
                caption: "Ghi chú",
                dataField: "Note",
                dataType: "string",
                visible: false
            }
        ];
        $scope.gridPosts.export = {
            allowExportSelectedData: true,
            enabled: true,
            excelFilterEnabled: true,
            excelWrapTextEnabled: true,
            fileName: "Danh sách Danh mục bài viết",
            texts: {
                exportAll: "Xuất toàn bộ Dữ liệu",
                exportSelectedRows: "Xuất dữ liệu đang chọn",
                exportTo: "Trích xuất"
            }
        };
        $scope.gridPosts.headerFilter.visible = false;
        $scope.gridPosts.summary = {
            texts: {
                count: "{0}",
                sum: "{0}"
            },
            groupItems: [
                {
                    column: "Id",
                    summaryType: "count"
                }
            ],
            totalItems: [
                {
                    column: "Id",
                    summaryType: "count"
                }
            ]
        };
        $scope.gridPosts.onToolbarPreparing = function (e) {
            var dataGrid = e.component;

            e.toolbarOptions.items.unshift(
            //RIGHT
                {//Thêm
                    location: "after",
                    widget: "dxButton",
                    options: {
                        hint: "Thêm",
                        icon: "add",
                        type: "success",
                        onClick: function () {
                            $scope.Create();
                        }
                    }
                },
                {//Sửa
                    location: "after",
                    widget: "dxButton",
                    options: {
                        hint: "Sửa",
                        icon: "edit",
                        type: "default",
                        onClick: function () {
                            $scope.Edit();
                        }
                    }
                },
                {//Xóa
                    location: "after",
                    widget: "dxButton",
                    options: {
                        hint: "Xóa",
                        icon: "trash",
                        type: "danger",
                        onClick: function () {
                            $scope.Delete();
                        }
                    }
                },
                {//Load lại
                    location: "after",
                    widget: "dxButton",
                    options: {
                        hint: "Load lại Dữ liệu",
                        icon: "refresh",
                        onClick: function () {
                            GetAllPost();
                        }
                    }
                },
                {//Lọc
                    location: "after",
                    widget: "dxButton",
                    options: {
                        hint: "Lọc dữ liệu",
                        icon: "filter",
                        onClick: function () {
                            ToggleFilter();
                        }
                    }
                }
            );
        };
        $scope.gridPosts.onRowClick = function (e) {
            var component = e.component;

            if (!component.clickCount)
                component.clickCount = 1;
            else
                component.clickCount = component.clickCount + 1;

            if (component.clickCount === 1) {
                component.lastClickTime = new Date();
                setTimeout(function () { component.lastClickTime = 0; component.clickCount = 0; }, 350);
            }
            else if (component.clickCount === 2) {
                var now = new Date();
                if (now - component.lastClickTime < 300) {
                    $scope.post = angular.copy(e.data);
                    $scope.Edit();
                }

                // Reset your click info
                component.clickCount = 0;
                component.lastClickTime = 0;
            }
        };
        $scope.gridPosts.onSelectionChanged = function (e) {
            $scope.selectedPosts = angular.copy(e.selectedRowsData);
        };

        //---CONTEXTMENU---
        var itemContextMenus = angular.copy(DevExtremeService.DefaultContextMenuGrid);
        $scope.contextMenuPost = {
            dataSource: itemContextMenus,
            width: 100,
            target: '#post',
            itemTemplate: angular.copy(DevExtremeService.TemplateContextMenuGrid),
            onItemClick: function (e) {
                if (!e.itemData.items) {
                    switch (e.itemData.value) {
                        case "add":
                            $scope.Create();
                            break;
                        case "edit":
                            $scope.Edit();
                            break;
                        case "delete":
                            $scope.Delete();
                            break;
                    }

                }
            }
        };


        Init();

        //---FUNCTION---
        function Init() {
            //Get All Category
            GetAllCategoryPost();
            //Get All Post
            GetAllPost();
        }

        //Get All Category Post
        function GetAllCategoryPost() {
            CRUDService.Get(apiCategoryPost + "?viewmodel=true&&type=select")
                .then(function success(response) {
                    $scope.categoryPosts = angular.copy(CRUDService.GenMultiLevel(response.data));
                }, function error(response) {
                    toastr.error("Không lấy được Danh sách danh mục");
                });

        }

        //Get All Post
        function GetAllPost() {
            CRUDService.Get(apiPost + '?viewmodel=true&&type=table')
                .then(function success(response) {
                    $scope.posts = angular.copy(response.data);
                }, function error(response) {
                    toastr.error("Không lấy được Danh sách bài viết");
                });
        }

        //Get Posts
        $scope.GetPosts = function () {
            $scope.filterPost.StartDate = new Date($scope.filterPost.StartDate).toUTCString();
            $scope.filterPost.EndDate = new Date($scope.filterPost.EndDate).toUTCString();
            $scope.filterPost.ViewModel = true;
            $scope.filterPost.Type = "table"

            CRUDService.Get(apiPost + '?filter=' + $scope.filterPost)
                .then(function success(response) {
                    //$scope.posts = angular.copy(response.data);
                    console.log(response.data);
                }, function error(response) {
                    toastr.error("Không lấy được Danh sách bài viết");
                });
        }

        //Toggle Filter
        function ToggleFilter() {
            $scope.filter = !$scope.filter;
        }

        //Create
        $scope.Create = function () {
            $window.location.href = '/Admin#!/post/edit';
        };
        //Edit
        $scope.Edit = function () {
            if ($scope.selectedPosts.length === 0) {
                toastr.error("Chọn 1 dòng để sửa");
            } else {
                $scope.post = angular.copy($scope.selectedPosts[0]);
                $window.location.href = '/Admin#!/post/edit/' + $scope.post.Id;
            }
        };
        //Delete
        $scope.Delete = function () {
            if ($scope.selectedPosts.length === 0) {
                toastr.error("Chọn dòng để xóa");
            } else {
                $scope.deletePost.status = true;
            }
        };
        $scope.ConfirmDelete = function () {
            //Lấy mảng id cần xóa "id1,id2,id3..."
            var arrayIds = ArrayService.GetArrayIds($scope.selectedPosts);

            //Xóa
            CRUDService.DeleteList(apiPost, arrayIds)
                .then(function success(response) {
                    if (response.data === 1) {

                        GetAllPost();

                        $scope.deletePost.status = false;
                        toastr.success("Xóa thành công");
                    } else {
                        toastr.error("Không thể xóa");
                    }
                }, function error(response) {
                    toastr.error("Không thể xóa");
                });
        };
        $scope.CancelDelete = function () {
            $scope.deletePost.status = false;
        };
    }

})(angular.module('backend'));
