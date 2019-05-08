app.controller('role', function ($scope) {
    $scope.event = null;
    $scope.delayTime = 0;

    $scope.validationOptions = angular.extend($scope.$parent.validationOptions, {
        rules: {
            name: {
                required: true,
                minlength: 3,
                maxlength: 100
            },
            action: {
                required: false
            }
        },
        messages: {
            name: {
                required: "Tên quyền không được để trống.",
                minlength: "Tên quyền có độ dài tối thiểu 3 kí tự.",
                maxlength: "Tên quyền có độ dàu tối đa 100 ký tự."
            }
        }
    });

    $scope.init = function () {
        $scope.switchConfig();
        $scope.eventChange();
    };

    $scope.changeSwitchery = function (element, checked) {
        if ((element.is(':checked') && checked == false) || (!element.is(':checked') && checked == true)) {
            element.parent().find('.switchery').trigger('click');
        }
    };
    
    $scope.checkAll = function () {
        $('input.checkbox-switch').each(function () {
            $scope.changeSwitchery($(this), true);
        });
    };

    $scope.unCheckAll = function () {
        $('input.checkbox-switch').each(function () {
            $scope.changeSwitchery($(this), false);
        });
    };

    $scope.switchConfig = function () {
        var options = {
            size: 'small',
            secondaryColor: '#a94442',
            jackColor: '#fff',
            offJackColor: '#fff'
        };

        $('input.checkbox-switch').each(function (_index, o) {
            var value = Number($(this).val());
            if (typeof roles != 'undefined' && roles != null && roles.length > 0 && roles.includes(value)) {
//                $scope.switchs[_index].on();
                $(this).attr("checked", "checked");
            }
            new Switchery(this, options);
        });

        $('input.checkbox-switch-service').each(function (_index, o) {
            var value = String($(this).val());
            if (typeof services != 'undefined' && services != null && services.length > 0 && services.includes(value)) {
//                $scope.switchsService[_index].on();
                $(this).attr("checked", "checked");
            }
            new Switchery(this, options);

        });
    };

    $scope.eventChange = function () {
        $('#role-form').find('input').blur(function () {
            var object = this;

            var name = $(object).attr("data-name");
            $scope.loading(true, '', object);

            clearTimeout($scope.event);
            $scope.event = setTimeout(function () {
                var val = $(object).val();
                if (val == '') {
                    $scope.loading(false, 'fa fa-times-circle text-danger', object);
                    return false;
                }
                var data = {
                    name: name,
                    title: val
                };
                $scope.save(data, object);
            }, $scope.delayTime);
        });
    };

    $scope.save = function (data, object) {
        $.ajax({
            url: '/service/role/save-action-define.json',
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: 'json',
            method: 'POST',
            success: function (resp) {
                if (!resp.success) {
                    if (resp.message) {
                        bootbox.alert(resp.message);
                    }
                    $scope.loading(false, 'fa fa-ban text-danger', object);
                    return false;
                }
                $scope.loading(false, 'fa fa-check-circle text-success', object);
            }
        });
    };

    $scope.loading = function (_show, _icon, _parent) {
        var _action = '.loading_config';
        if (_show == true) {
            $(_parent).parent().find(_action).html('<i class="fa fa-sun-o fa-spin" for="loading" style="border-right:none;" ></i>');
        } else {
            $(_parent).parent().find(_action).html('<i class="' + _icon + '" ></i> ');
        }
    };

});