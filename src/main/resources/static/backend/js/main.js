jQuery.expr[':'].contains = function (a, i, m) {
    return jQuery(a).text().toUpperCase()
            .indexOf(m[3].toUpperCase()) >= 0;
};

$.ajaxSetup({
    dataType: 'json',
    error: function (xhr, status, error) {
        console.log(xhr);
//        $("button").removeAttr("disabled");
        loading.hide();
        if (xhr.status == 403) {
            bootbox.alert('Bạn không có quyền thực hiện hành động này');
        } else if (xhr.status == 500) {
            bootbox.alert('<h3>500: Lỗi kỹ thuật trên hệ thống</h3></div>');
        } else if (xhr.status == 404) {
            bootbox.alert('<h3>Lỗi 404: Không tìm thấy yêu cầu</h3></div>');
        } else if (xhr.status == 405) {
            bootbox.alert('<h3>Lỗi 405: Lỗi kỹ thuật</h3></div>');
        } else {
            var dialog = bootbox.alert(error == '' ? 'Mất kết nối!' : error);
            setTimeout(function () {
                dialog.modal('hide');
            }, 5000);
//            window.location.reload();
        }
    }
});


var menu = {};
menu.active = function () {
    if (typeof user_action == 'undefined' || user_action.length == 0) {
        user_action = [];
    }
    var bUrl = null;
    var cUrl = null;
    if ($(".breadcrumb").find("a").length > 2) {
        var b = $(".breadcrumb").find("a")[1];
        bUrl = $(b).attr("href");
        bUrl = bUrl.split("?")[0];

        var c = $(".breadcrumb").find("a")[2];
        cUrl = $(c).attr("href");
        cUrl = cUrl.split("?")[0];
    }

    //active menu
    $(".sidebar-active-link").find("a").each(function () {
        var aObject = this;
        var aUrl = $(aObject).attr("href");
        var lUrl = window.location.pathname;

        if (user_action.includes(aUrl)
                || aUrl == "/backend/index.html"
                || aUrl == "/index.html"
//                || aUrl == "#"
                ) {
            $(aObject).parent().css("display", "block");
            $(aObject).parent().parent().parent().css("display", "block");
        }

        if (aUrl == '/backend/site/index.html'
                && (window.location.pathname + window.location.search).indexOf(user_staff_url_301) != -1) {
            $("a[href='/profile/staff.html']").parent().addClass("active");
            $("a[href='/profile/staff.html']").parent().parent().parent().addClass("active");
        } else {
            if ((aUrl == lUrl)
                    || (bUrl != null && aUrl == bUrl && $(".sidebar-active-link").find("a[href='" + cUrl + "']").length == 0)) {
                $(aObject).parent().addClass("active");
                $(aObject).parent().parent().parent().addClass("active");
            }
        }
    });
};

menu.role = function () {
    if (!app_security) {
        return false;
    }
    $("[data-role]").each(function () {
        var aUrl = $(this).attr("data-role");
        aUrl = aUrl.split("?")[0];
        if (!user_action.includes(aUrl)) {
            $(this).addClass("disabled");
            $(this).removeAttr("ng-click");
        } else {
            $(this).removeClass("disabled");
        }
    });
};

menu.active();
menu.role();

jQuery.extend({
    getQueryParameters: function (str) {
        var q = (str || document.location.search).replace(/(^\?)/, '');
        if (q == null || q == '') {
            return [];
        }
        return q.split("&").map(function (n) {
            return n = n.split("="), this[n[0]] = decodeURIComponent(n[1]), this
        }.bind({}))[0];
    }
});

$(document).ready(function () {
    $.scrollUp({
        animation: 'fade',
        scrollImg: {active: true, type: 'background', src: '/static/backend/images/top.png}
    });

    //active link
    var cUrl = window.location.pathname;
    $(".header-tabs a").each(function () {
        var aUrl = $(this).attr("href");
        if (aUrl.indexOf(cUrl) != -1) {
            $(this).parent().addClass("active");
        }
    });

    //set alaias
    var blur = [];
    $("[action=alias]").each(function () {

        var action = this;
        var id = $(action).attr("id");
        blur[id] = false;

        var from = $(action).attr("from");
        var copy = $(action).attr("copy");
        if ($(action).val() != "") {
            blur[id] = true;
        } else {
            blur[id] = false;
        }
        //alias blur
        $(action).blur(function () {
            if ($(action).val() != "") {
                blur[id] = true;
            } else {
                blur[id] = false;
            }
        });

        //alias keyup change
        $('#' + from).keyup(function () {
            var from = this;
            var string = $(from).val();
            if (string == '') {
                blur[id] = false;
            }
            if (!blur[id]) {
                if (!copy) {
                    $(action).val(utils.createAlias(string)).change();
                } else {
                    $(action).val(string).change();
                }
            }
        });
    });

    //Set maxlength
//    $('input[maxlength], textarea[maxlength]').maxlength({
//        placement: 'top-left',
//        alwaysShow: true,
//        threshold: 10,
//        warningClass: "label label-success",
//        limitReachedClass: "label label-danger",
//        separator: '/',
//        preText: '',
//        postText: ' kí tự.',
//        validate: true
//    });

    setInterval(function () {
        $.ajax({
            url: '/ping.json',
            method: 'GET'
        });
    }, 60000);

    //Bắt sự kiện khi click nút back trình duyệt
    if ($("[data-confirm]").length > 0
            && $("[data-confirm]").attr("data-confirm-browsers") != undefined
            && window.history && history.pushState) {
        history.pushState(null, null, null);
        window.onpopstate = function (event) {
            bootbox.confirm({
                message: "Bạn chắc chắn muốn rời khỏi trang này ?",
                buttons: {
                    confirm: {
                        label: '<i class="fa fa-check" ></i> Đồng ý',
                        className: 'btn-success'
                    },
                    cancel: {
                        label: '<i class="fa fa-remove" ></i> Ở lại',
                        className: 'btn-danger'
                    }

                },
                callback: function (result) {
                    if (result) {
                        window.onpopstate = null;
                        history.back();
                    } else {
                        history.pushState(null, null, null);
                    }
                }
            });
        };
    }

    $("[data-confirm]").on('click', function (event) {
        event.preventDefault();
        var elm = this;
        bootbox.confirm({
            message: this.getAttribute('data-confirm'),
            buttons: {
                confirm: {
                    label: '<i class="fa fa-check" ></i> Đồng ý',
                    className: 'btn-success'
                },
                cancel: {
                    label: '<i class="fa fa-remove" ></i> Không',
                    className: 'btn-danger'
                }

            },
            callback: function (result) {
                if (result) {
                    window.location.href = elm.getAttribute('href');
                }
            }
        });
    });

    //input file
    $(document).on('change', '.file_custom:file', function () {
        var input = $(this),
                numFiles = input.get(0).files ? input.get(0).files.length : 1,
                label = input.val().replace(/\\/g, '/').replace(/.*\//, '');

        if (label != '') {
            $(".file_custom_name").html("Tệp tin được chọn: " + label);
        }

        input.trigger('fileselect', [numFiles, label]);
    });

    //table customer
    var tableElm = $('.table-full');
    if (typeof tableElm != 'undefined' && tableElm.length > 0) {
        var tableOption = {
            language: {
                emptyTable: "<b class='text-red text-center' >Không có thông tin</b>"
            },
            scrollX: true,
            paging: false,
            searching: false,
            ordering: false,
            info: false,
            scrollCollapse: true,
            processing: true
        };
        if (tableElm.attr("data-scrollY") != undefined && tableElm.attr("data-scrollY") == 'auto') {
            tableOption.scrollY = String($(window).height() - 150) + 'px';
        }
        if (tableElm.attr("data-rightColumns") !== undefined && !isNaN(Number(tableElm.attr("data-rightColumns")))) {
            if (typeof tableOption.fixedColumns === 'undefined') {
                tableOption.fixedColumns = {};
            }
            tableOption.fixedColumns.rightColumns = Number(tableElm.attr("data-rightColumns"));
        }
        if (tableElm.attr("data-leftColumns") !== undefined && !isNaN(Number(tableElm.attr("data-leftColumns")))) {
            if (typeof tableOption.fixedColumns === 'undefined') {
                tableOption.fixedColumns = {};
            }
            tableOption.fixedColumns.leftColumns = Number(tableElm.attr("data-leftColumns"));
        }
        tableElm.DataTable(tableOption);
    }
    $(tableElm).find("td").on('click', function (event) {
        $(this).parent("tr").addClass('active').siblings().removeClass('active');
    });

});

