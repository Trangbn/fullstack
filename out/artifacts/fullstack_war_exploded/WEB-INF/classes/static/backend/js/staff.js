app.controller('staff', function ($scope) {

    $.validator.addMethod("username", function (value, element) {
        return this.optional(element) || /^[a-z0-9_-]{6,30}$/i.test(value);
    }, "Tên đăng nhập không đúng định dạng. Chỉ chưa các kí tự 'a-z', '0-9', '_' và '-'");

    $scope.validationOptions = angular.extend($scope.$parent.validationOptions, {
        rules: {
            name: {
                required: true
            },
            phone: {
                required: true
            },
            email: {
                required: false,
                email: true
            },
            isActive: {
                required: false
            },
            roleID: {
                required: false
            },
            pwd: {
                required: true,
                minlength: 6
            },
            confirmPwd: {
                required: true,
                minlength: 6,
                equalTo: "#pwd"
            }
        },
        messages: {
            name: {
                required: "Họ và tên không được để trống"
            },
            phone: {
                required: "Số điện thoại không được để trống"
            },
            email: {
                email: "Email không đúng định dạng"
            },
            pwd: {
                required: "Mật khẩu không được để trống",
                minlength: "Mật khẩu có độ dài tối thiểu 6 kí tự"
            },
            confirmPwd: {
                required: "Nhập lại mật khẩu không được để trống",
                minlength: "Nhập lại mật khẩu có độ dài tối thiểu 6 kí tự",
                equalTo: "Mật khẩu nhập lại không chính xác."
            }
        }
    });

    $scope.init = function () {
    };
});