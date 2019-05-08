var app = angular.module('app', [
//    'ngTagsInput', 'textAngular', 'fileDialog',
//    'angularMoment', 'chart.js', 'as.sortable', 'colorpicker.module',
    'ngValidate',
//     'ngSanitize', 
    'ui.bootstrap',
    'LocalStorageModule',
    'ui.select',
    'ngMask',
    'ui.mask',
//    'googlechart'
]);

app.filter('propsFilter', function () {
    return function (items, props) {
        var out = [];
        if (angular.isArray(items)) {
            items.forEach(function (item) {
                var itemMatches = false;

                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = utils.createAlias(props[prop]);
                    if (utils.createAlias(item[prop].toString()).indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                    }
                }

                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }
        return out;
    };
});

app.service('locations', function (localStorageService) {
    this.useCache = true;
    this.get = function () {
        if (localStorageService.isSupported) {
            if (!this.useCache)
                localStorageService.remove("locations");
            if (localStorageService.get('locations') == null) {
                return this.getLocations(function (locations) {
                    localStorageService.set('locations', locations);
                });
            }
            return localStorageService.get('locations');
        }
        return this.getLocations();
    };

    this.getWards = function (districtID) {
        if (districtID == '') {
            return localStorageService.get('locations').wards;
        }
        if (localStorageService.isSupported) {
            var isExits = false;

            isExits = localStorageService.get('locations').wards.some(function (el) {
                return el.districtID === districtID;
            });

            if (!isExits) {
                this.getWardByDistrictID(districtID, function (wards) {
                    var locations = localStorageService.get('locations');
                    for (var i = 0; i < wards.length; i++) {
                        locations.wards.push(wards[i]);
                    }
                    localStorageService.set('locations', locations);
                });
            }
            return localStorageService.get('locations').wards;
        }
        return this.getWardByDistrictID(districtID);
    };

    this.getLocations = function (fn) {
        loading.show();
        var locations = [];
        $.ajax({
            url: '/service/location.json',
            method: 'GET',
            async: false,
            success: function (resp) {
                loading.hide();
                if (resp.success) {
                    locations = {};
                    locations.provinces = resp.data.province;
                    locations.districts = resp.data.district;
                    locations.wards = resp.data.ward == null ? [] : resp.data.ward;

                    locations.provinces.splice(0, 0, {id: '', name: 'Chọn tỉnh thành});
                    locations.districts.splice(0, 0, {id: '', name: 'Chọn quận huyện});
                    locations.wards.splice(0, 0, {id: '', name: 'Chọn phường xã});
                    if (fn) {
                        fn(locations);
                    }
                    return locations;
                }
            }
        });
        return locations;
    };

    this.getWardByDistrictID = function (districtID, fn) {
        loading.show();
        $.ajax({
            url: '/service/location/ward.json?district_id=' + districtID,
            method: 'GET',
            async: false,
            success: function (resp) {
                loading.hide();
                if (resp.success) {
                    if (fn) {
                        fn(resp.data);
                    }
                    return resp.data;
                }
            }
        });
        return [];
    };

});

app.controller('body', function ($scope, locations, localStorageService) {

    $scope.locations = [];

    $scope.selected = {
        province: null,
        district: null,
        ward: null
    };

    $scope.select_options = {
        maximumInputLength: 20,
        minimumResultsForSearch: 20,
        placeholder: "Select a state",
        dropdownAutoWidth: true,
        width: '100%'
    };
    $scope.select_mutiple = function (_id, placeholder) {
        if (typeof placeholder != 'undefined' && placeholder != null && placeholder != '') {
            $scope.select_options.placeholder = placeholder;
        }
        var options = $scope.select_options;
        options.closeOnSelect = false;
        $(_id).css({display: "none"});
        $(_id).attr({multiple: "multiple"});
        $(_id).select2(options);
        var values = [];
        $(_id).find("option[selected]").each(function () {
            values.push($(this).attr("value"));
        });
        $(_id).val(values).trigger('change');
    };

    $scope.select_search = function (_id, placeholder, ajax) {
        if (typeof placeholder != 'undefined' && placeholder != null && placeholder != '') {
            $scope.select_options.placeholder = placeholder;
        }
//        $(_id).css({display: "none"});
        var options = {
            width: '100%'
        };
        if (typeof ajax != 'undefined') {
            options.ajax = ajax;
        }
        if ($(_id).length > 0) {
            $(_id).select2(options);
        }
    };

    $scope.validationOptions = {
        rules: {
        },
        messages: {
        },
        errorElement: "em",
        errorPlacement: function (error, element) {
            error.addClass("help-block");
            element.parents().addClass("has-feedback");

            if (element.prop("type") === "checkbox") {
                error.insertAfter(element.parent("label"));
            }
            if (element.prop("class").indexOf('select2-hidden-accessible') != -1) {
                error.insertAfter($(element.parent("div")).find("span.select2"));
            } else {
                error.insertAfter(element);
            }
        },
        success: function (label, element) {

        },
        highlight: function (element, errorClass, validClass) {
            $(element).parent().addClass("has-error").removeClass("has-success");
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).parent().addClass("has-success").removeClass("has-error");
        }
    };

    $scope.init = function () {
        $(document).ajaxStart(function () {
            Pace.restart();
//            $("button").attr("disabled", true);
        });

        $(document).ajaxComplete(function () {
//            $("button").removeAttr("disabled");
        });

        $scope.initNav();

    };

    $scope.initNav = function () {
        if (localStorageService.isSupported) {
            $('[data-toggle="offcanvas"]').click(function () {
                localStorageService.set('menu_nav', $('body').hasClass('sidebar-collapse'));
            });
            if (localStorageService.get('menu_nav') != null && !localStorageService.get('menu_nav')) {
                $('[data-toggle="offcanvas"]').click();
            }
        }

    };

    $scope.register = function (form, $event) {
        if (!form.validate()) {
            $event.preventDefault();
        }
    };


    /**
     * Hiển thị Pop pdf
     * @param {type} pdfUrl
     * @param {type} fnok
     * @param {type} title
     * @returns {undefined}
     */
    $scope.dialogReport = function (pdfUrl, fnok, title) {
        var height = String($(window).height() - 200) + 'px';
        var object = "<object id='object-pdf' style=\"background: transparent url(/static/backend/images/loading.gif) no-repeat center;\" data=\"" + pdfUrl + "\" type=\"application/pdf\" width=\"100%\" height='" + height + "'>";
        object += "If you are unable to view file, you can download from";
        object += " or download <a target = \"_blank\" href = \"http://get.adobe.com/reader/\">Adobe PDF Reader</a> to view the file.";
        object += "</object>";

        var buttons = {
            cancel: {
                label: "Đóng",
                className: 'btn-default',
                callback: function () {
                }
            }
        };
        if (fnok) {
            buttons.ok = fnok;
        }

        bootbox.dialog({
            title: title ? title : $("title").text().split("|")[0],
//            message: '<p id="pdf-loading" ><i class="fa fa-spin fa-spinner"></i> Loading...</p>' + object,
            message: object,
            size: 'large',
            buttons: buttons
        }).find("div.modal-dialog").addClass("largeWidth").find("div.bootbox-body").css({height: height});
    };

    /**
     * Hiển thị chi tiết repory
     * @param {type} params
     * @returns {undefined}
     */
    $scope.detailReportLine = function (params, type) {
        if (typeof type == 'undefined') {
            type = "";
        }
        if (typeof params.objectGroupID != 'undefined') {
            if (params.objectGroupID.indexOf(",") == -1) {
                params.objectGroupID = [params.objectGroupID];
            } else {
                params.objectGroupID = params.objectGroupID.split(",");
            }
        }

        loading.show();
        $.ajax({
            url: '/service/htc/search.json?type=' + type,
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(params),
            success: function (resp) {
                loading.hide();
                var dTable = [];
                var options = resp.data.options;
                $.each(resp.data.models, function () {
                    var item = this;
                    dTable.push([
                        item.code, item.patientName, item.yearOfBirth,
                        (typeof options.gender[item.genderID] == 'undefined' ? '' : options.gender[item.genderID]),
                        item.currentAddressFull,
                        utils.timestampToStringDate(item.advisoryeTime),
                        utils.timestampToStringDate(item.preTestTime),
                        utils.timestampToStringDate(item.resultsTime),
                        (typeof options['test-results'][item.testResultsID] == 'undefined' ? '' : ('<span class="' + (item.testResultsID == 2 ? 'text-danger' : '') + '" >' + options['test-results'][item.testResultsID] + '</span>')),
                        utils.timestampToStringDate(item.confirmTime),
                        utils.timestampToStringDate(item.resultsSiteTime),
                        utils.timestampToStringDate(item.resultsPatienTime),
                        (typeof options['test-result-confirm'][item.confirmResultsID] == 'undefined' ? '' : ('<span class="' + (item.confirmResultsID == 2 ? 'text-danger' : '') + '" >' + options['test-result-confirm'][item.confirmResultsID] + '</span>')),
                        (typeof options['test-object-group'][item.objectGroupID] == 'undefined' ? '' : options['test-object-group'][item.objectGroupID]),
                        item.staffBeforeTestID,
                        item.staffAfterID
                    ]);
                });
                if (dTable.length == 0) {
                    return false;
                }

                bootbox.dialog({
                    title: "Danh sách khách hàng",
                    message: '<table id="grid-report" class="table-report-view table-sm table-report table table-bordered table-hover"></table>',
                    size: 'large',
                    buttons: {
                        cancel: {
                            label: "Đóng",
                            className: 'btn-default',
                            callback: function () {
                            }
                        }
                    }
                }).find("div.modal-dialog").addClass("largeWidth");

                setTimeout(function () {
                    $("#grid-report").DataTable({
                        paging: false,
                        searching: false,
                        ordering: false,
                        info: false,
                        scrollX: true,
                        scrollCollapse: true,
                        processing: true,
                        language: {
                            emptyTable: "<b class='text-red text-center' >Không có thông tin</b>"
                        },
                        data: dTable,
                        columns: [
                            {title: "Mã KH", className: "text-center"},
                            {title: "Họ và tên"},
                            {title: "Năm sinh", className: "text-center"},
                            {title: "Giới tính", className: "text-center"},
                            {title: "Địa chỉ thường trú"},
                            {title: "Ngày tư vấn", className: "text-center"},
                            {title: "Ngày XN sàng lọc", className: "text-center"},
                            {title: "Ngày nhận KQ sàng lọc", className: "text-center"},
                            {title: "Kết quả XN sàng lọc", className: "text-center"},
                            {title: "Ngày XN khẳng định", className: "text-center"},
                            {title: "Ngày CS nhận KQKĐ", className: "text-center"},
                            {title: "Ngày KH nhận KQKĐ", className: "text-center"},
                            {title: "Kết quả XN khẳng định", className: "text-center"},
                            {title: "Nhóm đối tượng"},
                            {title: "Tư vấn viên trước XN"},
                            {title: "Tư vấn viên sau XN"}
                        ]
                    });
                }, 300);
            }
        });
    };

    /**
     * google auto suggets địa chỉ
     * @param {type} inputID
     * @param {type} provinceID
     * @param {type} districtID
     * @param {type} wardID
     * @returns {Boolean}
     */
    $scope.addressAutocomplete = function (inputID, provinceID, districtID, wardID) {
        if ($(inputID).length == 0) {
            return false;
        }
        var autocomplete = new google.maps.places.Autocomplete(document.getElementById(inputID.replace("#", "")), {types: ['geocode']});
        autocomplete.setComponentRestrictions({'country': ['VN', 'vi']});
        autocomplete.setFields(['address_components', 'name', 'formatted_address']);
        autocomplete.addListener('place_changed', function () {
            var place = autocomplete.getPlace();
            var provinceName = districtName = wardName = null;
            for (var i = 0; i < place.address_components.length; i++) {
                if (place.address_components[i].types['0'] == "administrative_area_level_1") {
                    provinceName = place.address_components[i].long_name;
                } else if (place.address_components[i].types['0'] == "administrative_area_level_2" || place.address_components[i].types['0'] == "locality") {
                    districtName = place.address_components[i].long_name;
                } else if (place.address_components[i].types['0'] == "sublocality_level_1") {
                    wardName = place.address_components[i].long_name.replace("tt.", "");
                }
            }
            if (wardName == null) {
                let regexp = /phường.*,|xã.*,/ig;
                var s = place.formatted_address.match(regexp);
                if (s != null && s.length > 0) {
                    wardName = s[0].split(",")[0];
                }
            }

            if (wardName != null && wardName.search(/.*\d{1}/ig) != -1) {
                var cs = wardName.split(" ");
                wardName = cs[0] + " 0" + cs[1];
            }

            if (provinceName != null) {
                var elm = $(provinceID + ' option:contains(' + provinceName + ')');
                $(provinceID).val(elm.attr("value")).change();
            }
            if (districtName != null) {
                var elm = $(districtID + ' option:contains(' + districtName + ')');
                $(districtID).val(elm.attr("value")).change();
            }
            setTimeout(function () {
                if (wardName != null) {
                    var elm = $(wardID + ' option:contains(' + wardName + ')');
                    $(wardID).val(elm.attr("value")).change();
                }
            }, 500);
        });
    };

    $scope.initProvince = function (provinceID, districtID, ward) {
        if ($(provinceID).length == 0) {
            return false;
        }
        if ($(districtID).length > 0) {
            $(districtID).append($('<option>', {value: '', text: "Chọn quận huyện"}));
        }
        if (typeof ward != 'undefined' && ward != null && $(ward).length > 0) {
            $(ward).append($('<option>', {value: '', text: "Chọn phường xã"}));
        }

        $scope.locations = locations.get();
        var pID = form[provinceID.replace("#", '')];
        var dID = form[districtID.replace("#", '')];
        var wID = null;
        //vẽ option
        angular.forEach($scope.locations.provinces, function (value, key) {
            $(provinceID).append($('<option>', {value: value.id, text: value.name}));
        });

        $(provinceID).change(function () {
            $(districtID).find("option").remove();
            if (typeof ward != 'undefined' && ward != null && $(ward).length > 0) {
                $(ward).find("option").remove();
                $(ward).append($('<option>', {value: '', text: "Chọn phường xã"}));
            }
            angular.forEach($scope.locations.districts, function (value, key) {
                if ($(provinceID).val() == value.provinceID || value.id == '') {
                    $(districtID).append($('<option>', {value: value.id, text: value.name}));
                }
            });
        });

        if (typeof ward != 'undefined' && ward != null && $(ward).length > 0) {
            wID = form[ward.replace("#", '')];
            $(districtID).change(function () {
                var dID = $(districtID).val();
                $(ward).find("option").remove();
                if (dID != '') {
                    $scope.locations.wards = locations.getWards(dID);
                }
                angular.forEach($scope.locations.wards, function (value, key) {
                    if (dID == value.districtID || value.id == '') {
                        $(ward).append($('<option>', {value: value.id, text: value.name}));
                    }
                });
            });
        }

        //selected value
        if (utils.getContentOfDefault(pID, null) != null) {
            $(provinceID).val(pID).change();
        } else if (provinceID === "#permanentProvinceID") {
            $(provinceID).val(province_id).change();
        }

        if (utils.getContentOfDefault(dID, null) != null) {
            $(districtID).val(dID).change();
        } else if (districtID === "#permanentDistrictID") {
            $(districtID).val(district_id).change();
        }

        if (typeof (wID) != 'undefined' && utils.getContentOfDefault(wID, null) != null) {
            $(ward).val(wID).change();
        } else if (ward === "#permanentWardID") {
            $(ward).val(ward_id).change();
        }
    };
});


var loading = {};

loading.show = function () {
    if ($('#loading').length <= 0) {
        $('body').append('<div id="loading" style="display:none;" class="loading"></div>');
    }
    $('#loading').show();
};

loading.hide = function () {
    $('#loading').hide();
};
