(function (app) {
    'use strict';

    app.controller('listPostController', listPostController);

    listPostController.$inject = ['$scope', '$http', '$window', 'ArrayService', 'CommonService', 'DevExtremeService', 'StringService', 'CategoryPostService', 'PostService'];

    function listPostController($scope, $http, $window, ArrayService, CommonService, DevExtremeService, StringService, CategoryPostService, PostService) {
        //---VAR---
        //Page
        $scope.page = {
            title: "Danh sách Bài viết"
        };
        //Post
        $scope.posts = [];
        $scope.post = {};
        $scope.selectedPosts = [];
        //CategoryPost
        $scope.categoryPosts = [];

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

        //---LIST---
        //Posts
        $scope.gridPosts = angular.copy(DevExtremeService.DefaultGrid);
        $scope.gridPosts.onInitialized = function (e) {
            $scope.gridPostsInstance = e.component;
        };
        $scope.gridPosts.dataSource = DevExpress.data.AspNet.createStore({
            key: "Id",
            loadUrl: "api/PostAPI"
        });
        $scope.gridPosts.bindingOptions = {
            //dataSource: 'posts',
            'columns[5].lookup.dataSource': 'categoryPosts'
        };
        $scope.gridPosts.columns = [
            {//0
                caption: "ID",
                dataField: "Id",
                minWidth: 60
            },
            {//1
                caption: "Trạng thái",
                dataField: "Published",
                cellTemplate: "publishedCellTemplate",
                trueText: "Xuất bản",
                falseText: "Chưa xuất bản",
                minWidth: 90
            },
            {//2
                caption: "Nổi bật",
                dataField: "Featured",
                cellTemplate: "featuredCellTemplate",
                trueText: "Có",
                falseText: "Không",
                minWidth: 90
            },
            {//3
                caption: "Tiêu đề",
                dataField: "Title",
                dataType: "string",
                minWidth: 150
            },
            {//4
                caption: "Alias",
                dataField: "Alias",
                dataType: "string",
                visible: false,
                minWidth: 150
            },
            {//5
                caption: "Danh mục",
                dataField: "CategoryId",
                lookup: {
                    displayExpr: 'Title',
                    valueExpr: 'Id'
                },
                minWidth: 100
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
                minWidth: 100
            },
            {//7
                alignment: "center",
                caption: "Lượt xem",
                dataField: "Views",
                cellTemplate: "viewsCellTemplate",
                minWidth: 90
            },
            {//8
                alignment: "left",
                caption: "Ghi chú",
                dataField: "Note",
                dataType: "string",
                visible: false,
                minWidth: 100
            }
        ];
        $scope.gridPosts.export = {
            allowExportSelectedData: true,
            enabled: true,
            excelFilterEnabled: true,
            excelWrapTextEnabled: true,
            fileName: "Danh sách Bài viết",
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
                    location: "before",
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
                    location: "before",
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
                    location: "before",
                    widget: "dxButton",
                    options: {
                        hint: "Xóa",
                        icon: "trash",
                        type: "danger",
                        onClick: function () {
                            $scope.Delete();
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
            GetCategoryPosts();
        }

        //Get All Category Post
        function GetCategoryPosts() {
            CategoryPostService.GetListViewModel('select')
                .then(function success(response) {
                    $scope.categoryPosts = angular.copy(CommonService.GenMultiLevel(response.data));
                }, function error(response) {
                    toastr.error("Không lấy được Danh sách danh mục");
                });
        }

        //Create
        $scope.Create = function () {
            PostService.RedirectCreate();
        };
        //Edit
        $scope.Edit = function () {
            if ($scope.selectedPosts.length === 0) {
                toastr.error("Chọn 1 dòng để sửa");
            } else {
                $scope.post = angular.copy($scope.selectedPosts[0]);
                PostService.RedirectEdit($scope.post.Id);
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
            PostService.DeleteList(arrayIds)
                .then(function success(response) {
                    //Refresh
                    $scope.gridPostsInstance.refresh();

                    $scope.deletePost.status = false;
                    toastr.success("Xóa thành công");
                }, function error(response) {
                    toastr.error("Không thể xóa");
                });
        };
        $scope.CancelDelete = function () {
            $scope.deletePost.status = false;
        };
    }

})(angular.module('backend'));
