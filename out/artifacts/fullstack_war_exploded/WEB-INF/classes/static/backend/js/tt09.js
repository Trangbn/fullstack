app.service('tt09Service', function ($uibModal) {
    var elm = this;

    elm.logs = function (oid, code, name) {
        $uibModal.open({
            animation: true,
            backdrop: 'static',
            templateUrl: 'patientLogs',
            controller: 'tt09_patient_log',
            size: 'lg',
            resolve: {
                params: function () {
                    return {
                        oid: oid,
                        code: code,
                        name: name
                    };
                }
            }
        });
    };
});

app.controller('tt09_patient_log', function ($scope, $uibModalInstance, params) {
    $scope.model = {staffID: 0, patientID: params.oid, code: params.code, name: params.name};

    loading.show();
    $scope.list = function () {
        $.ajax({
            url: urlPatientLog,
            data: {oid: params.oid},
            method: 'GET',
            success: function (resp) {
                loading.hide();
                if (resp.success) {
                    $scope.$apply(function () {
                        for (var i = 0; i < resp.data.data.length; i++) {
                            resp.data.data[i].staffID = typeof resp.data.staffs[resp.data.data[i].staffID] == undefined ? 'Hệ thống' : resp.data.staffs[resp.data.data[i].staffID];
                        }
                        $scope.logs = resp.data.data;
                    });
                }
            }
        });
    };

    $scope.add = function () {
        console.log($scope.model.content);
        if ($scope.model.content === undefined || $scope.model.content === '') {
            return false;
        }
        loading.show();
        $.ajax({
            url: urlPatientLogCreate,
            type: "POST",
            contentType: "application/json",
            dataType: 'json',
            data: JSON.stringify($scope.model),
            success: function (resp) {
                loading.hide();
                if (resp.success) {
                    $scope.list();
                    $scope.$apply(function () {
                        $scope.model.content = null;
                        $scope.errors = null;
                    });
                } else {
                    $scope.$apply(function () {
                        $scope.errors = resp.data;
                    });
                    if (resp.message) {
                        bootbox.alert(resp.message);
                    }
                }
            }
        });
    };

    $scope.list();

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

app.controller('tt09_review', function ($scope, tt09Service) {
    $scope.isQueryString = $.getQueryParameters().length == 0;
    $scope.totalSwitch = 0;

    $scope.init = function () {
        //config search
        $scope.confirm_time_from = searchForm.confirmTimeFrom == '01/01/1970' ? '' : searchForm.confirmTimeFrom;
        $scope.confirm_time_to = searchForm.confirmTimeTo;
    };

    $scope.logs = function (oid, code, name) {
        tt09Service.logs(oid, code, name);
    };
});
