app.controller('emailoutbox', function ($scope, localStorageService) {
    $scope.init = function () {
        $scope.sendDate = search_send_date;

        if (localStorageService.isSupported) {
            $('[data-toggle="collapse"]').click(function () {
                localStorageService.set('emailoutbox_search', $('#collapseOne').hasClass('in'));
            });
            
            if (localStorageService.get('emailoutbox_search') != null && !localStorageService.get('emailoutbox_search')) {
                $('[data-toggle="collapse"]').click();
            }
        }
    };

    $scope.popup1 = {
        opened: false
    };
    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };
});

app.controller('emailOutbox', function ($scope) {

    $scope.validationOptions = angular.extend($scope.$parent.validationOptions, {
        rules: {
            to: {
                required: true
            },
            subject: {
                required: true
            },
            content: {
                required: true
            }
        },
        messages: {
            to: {
                required: "Người nhận không được để trống"
            },
            subject: {
                required: "Tiêu đề thư không được để trống"
            },
            content: {
                required: "Nội dung thư không được để trống"
            }
        }
    });
});