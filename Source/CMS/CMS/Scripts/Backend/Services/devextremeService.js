(function (app) {
    'use strict';

    app.factory('DevExtremeService', DevExtremeService);

    DevExtremeService.$inject = ['$http'];

    function DevExtremeService($http) {
        var services = {};

        //Default Grid
        services.DefaultGrid = {
            accessKey: null,
            activeStateEnabled: false,
            allowColumnReordering: false,
            allowColumnResizing: true,
            cacheEnabled: true,
            cellHintEnabled: true,
            columnAutoWidth: true,
            columnChooser: {
                emptyPanelText: "Kéo và thả cột muốn ẩn vào đây",
                enabled: true,
                mode: "select",
                title: "Lựa chọn cột"
            },
            columnFixing: {
                enabled: true,
                texts: {
                    fix: "Cố định cột",
                    leftPosition: "Bên trái",
                    rightPosition: "Bên phải",
                    unfix: "Hủy cố định"
                }
            },
            columnHidungEnabled: false,
            columnMinWidth: null,
            columnResizingMode: "widget",
            editing: {
                mode: "cell",
                allowAdding: false,
                allowDeleting: false,
                allowUpdating: false,
                texts: {
                    addRow: "Thêm",
                    cancelAllChanges: "Không thay đổi",
                    cancelRowChanges: "Hủy",
                    confirmDeleteMessage: "Bạn có chắc chắn muốn xóa?",
                    deleteRow: "Xóa",
                    editRow: "Sửa",
                    saveAllChanges: "Lưu thay đổi",
                    saveRowChanges: "Lưu",
                    undeleteRow: "Không xóa",
                    validationCancelChanges: "Hủy thay đổi"
                }
            },
            filterRow: {
                applyFilterText: "Áp dụng bộ lọc",
                betweenEndText: "Kết thúc",
                betweenStartText: "Bắt đầu",
                resetOperationText: "Thiết lập lại",
                showAllText: "(Tất cả)",
                visible: true
            },
            grouping: {
                contextMenuEnabled: true,
                expandMode: "rowClick",
                texts: {
                    groupByThisColumn: "Nhóm theo Cột này",
                    groupContinuedMessage: "Tiếp tục từ trang trước",
                    groupContinuesMessage: "Tiếp tục trên các trang tiếp theo",
                    ungroup: "Bỏ nhóm",
                    ungroupAll: "Bỏ tất cả nhóm"
                }
            },
            groupPanel: {
                emptyPanelText: "Kéo một cột vào đây để nhóm theo cột đó",
                visible: false
            },
            headerFilter: {
                texts: {
                    cancel: "Hủy",
                    emptyValue: "(Trống)",
                    ok: "Đồng ý"
                },
                visible: true
            },
            height: "100%",
            hoverStateEnabled: true,
            loadPanel: {
                enabled: true,
                indicatorSrc: '/Content/Backend/Templates/metronic475/my/ajax-loader.gif',
                text: "Đang tải ..."
            },
            noDataText: "Không có dữ liệu",
            pager: {
                infoText: "Trang {0} của {1}",
                showInfo: true,
                showNavigationButtons: true,
                showPageSizeSelector: true,
                visible: true
            },
            paging: {
                enabled: true,
                pageIndex: 0,
                pageSize: 100
            },
            remoteOperations: {
                grouping: false,
                summary: false
            },
            rowAlternationEnabled: false,
            scrolling: {
                preloadEnabled: true
            },
            searchPanel: {
                placeholder: "Tìm kiếm ..."
            },
            selection: {
                mode: "multiple",
                showCheckBoxesMode: "onClick"
            },
            showBorders: true,
            showRowLines: true,
            stateStoring: {
                enabled: false,
                type: "localStorage",
                storageKey: "storage"
            },
            sorting: {
                ascendingText: "Sắp xếp Tăng dần",
                clearText: "Xóa Sắp xếp",
                descendingText: "Sắp xếp Giảm dần",
                mode: "multiple"
            },
            wordWrapEnabled: false
        };

        //Default ContextMenu Grid
        services.DefaultContextMenuGrid = [
            { value: 'add', text: ' Thêm', icon: 'fa fa-plus' },
            { value: 'edit', text: ' Sửa', icon: 'fa fa-pencil' },
            { value: 'delete', text: ' Xóa', icon: 'fa fa-times' }
        ];

        //Template ContextMenu Grid
        services.TemplateContextMenuGrid = function (itemData, itemIndex, itemElement) {
            var template = $('<div></div>');
            if (itemData.icon) {
                template.append('<span class="' + itemData.icon + '"><span>');
            }
            template.append(itemData.text);
            return template;
        };

        return services;
    }


})(angular.module('backend'));
