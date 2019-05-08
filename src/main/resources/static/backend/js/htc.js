app.controller('htc_index', function ($scope) {
    $scope.isQueryString = $.getQueryParameters().length == 0;

    $scope.init = function () {
        $scope.advisorye_time = $.getQueryParameters().advisorye_time;
    };

    //In phiếu chuyển gửi
    $scope.transferOPC = function (oid) {
        $scope.dialogReport(urlTransferOPC + "?oid=" + oid, null, "Phiếu chuyển gửi cơ sở điều trị");
        $("#pdf-loading").remove();
    };
});

app.controller('htc_target', function ($scope) {
    $scope.validationOptions = angular.extend($scope.$parent.validationOptions, {
        rules: {

            years: {
                required: true,
                number: true,
                maxlength: 20
            },
            numberCustomer: {
                required: true,
                number: true,
                maxlength: 20
            },
            numberPositive: {
                required: true,
                number: true,
                maxlength: 20
            },
            numberGetResult: {
                required: true,
                number: true,
                maxlength: 20
            },
            positiveAndGetResult: {
                required: true,
                number: true,
                maxlength: 20
            },
            transferTreatment: {
                required: true,
                number: true,
                maxlength: 20
            },
            careForTreatment: {
                required: true,
                number: true,
                maxlength: 20
            }
        },
        messages: {

            years: {
                required: "Năm không được để trống",
                number: "Năm phải nhập số",
                maxlength: "Năm không quá 20 kí tự"
            },
            numberCustomer: {
                required: "Số khách hàng được xét nghiệm HIV không được để trống",
                number: "Số khách hàng được xét nghiệm HIV phải nhập số",
                maxlength: "Số khách hàng được xét nghiệm HIV không quá 20 kí tự"
            },
            numberPositive: {
                required: "Số khách hàng có kết quả xét nghiệm HIV (+) không được để trống",
                number: "Số khách hàng có kết quả xét nghiệm HIV (+) phải nhập số",
                maxlength: "Số khách hàng có kết quả xét nghiệm HIV (+) không quá 20 kí tự"
            },
            numberGetResult: {
                required: " Số khách hàng xét nghiệm và quay lại nhận kết quả không được để trống",
                number: " Số khách hàng xét nghiệm và quay lại nhận kết quả phải nhập số",
                maxlength: " Số khách hàng xét nghiệm và quay lại nhận kết quả không quá 20 kí tự"
            },
            positiveAndGetResult: {
                required: "Số khách hàng dương tính và quay lại nhận kết quả không được để trống",
                number: "Số khách hàng dương tính và quay lại nhận kết quả phải nhập số",
                maxlength: "Số khách hàng dương tính và quay lại nhận kết quả không quá 20 kí tự"
            },
            transferTreatment: {
                required: "Số khách hàng dương tính được chuyển gửi điều trị không được để trống",
                number: "Số khách hàng dương tính được chuyển gửi điều trị phải nhập số",
                maxlength: "Số khách hàng dương tính được chuyển gửi điều trị không quá 20 kí tự"
            },
            careForTreatment: {
                required: "Số KH dương tính được chuyển gửi thành công vào CSĐT không được để trống",
                number: "Số KH dương tính được chuyển gửi thành công vào CSĐT phải nhập số",
                maxlength: "Số KH dương tính được chuyển gửi thành công vào CSĐT không quá 20 kí tự"
            }
        }
    });
});

app.controller('htc_new', function ($scope, locations) {

    $scope.pOptions = pOptions;
    $scope.asanteTest = utils.getContentOfDefault(form.asanteTest, '');
    $scope.isAgreePreTest = utils.getContentOfDefault(form.isAgreePreTest, '');
    $scope.preTestTime = utils.getContentOfDefault(form.preTestTime, '');
    $scope.id = utils.getContentOfDefault(form.id, '');
    $scope.selectedItem = utils.getContentOfDefault(form.isAgreeTest, '');
    $scope.serviceID = utils.getContentOfDefault(form.serviceID, 'CD');
    $scope.advisoryeTime = utils.getContentOfDefault(form.advisoryeTime,
            ('0' + (new Date()).getDate()).slice(-2) + '/' + ('0' + ((new Date()).getMonth() + 1)).slice(-2) + '/' + (new Date()).getFullYear());
    $scope.resultsTime = utils.getContentOfDefault(form.resultsTime, '');
    $scope.permanentProvinceID = utils.getContentOfDefault(form.permanentProvinceID, '');
    $scope.permanentDistrictID = utils.getContentOfDefault(form.permanentDistrictID, '');
    $scope.permanentWardID = utils.getContentOfDefault(form.permanentWardID, '');
    $scope.confirmTime = utils.getContentOfDefault(form.confirmTime, '');
    $scope.confirmResultsID = utils.getContentOfDefault(form.confirmResultsID, '');
    $scope.resultsSiteTime = utils.getContentOfDefault(form.resultsSiteTime, '');
    $scope.resultsPatienTime = utils.getContentOfDefault(form.resultsPatienTime, '');
    $scope.exchangeConsultTime = utils.getContentOfDefault(form.exchangeConsultTime, '');
    $scope.exchangeTime = utils.getContentOfDefault(form.exchangeTime, '');
    $scope.registerTherapyTime = utils.getContentOfDefault(form.registerTherapyTime, '');
    $scope.exchangeProvinceID = utils.getContentOfDefault(form.exchangeProvinceID, '');
    $scope.exchangeDistrictID = utils.getContentOfDefault(form.exchangeDistrictID, '');
    $scope.confirmTestNo = utils.getContentOfDefault(form.confirmTestNo, '');
    $scope.staffBeforeTestID = utils.getContentOfDefault(form.staffBeforeTestID, current_user_name);
    $scope.testResultsID = utils.getContentOfDefault(form.testResultsID, '');
    $scope.partnerProvideResult = utils.getContentOfDefault(form.partnerProvideResult, '');
    $scope.referralSource = utils.getContentOfDefault(form.referralSource, '');
    $scope.staffAfterID = utils.getContentOfDefault(form.staffAfterID, '');
    $scope.isAgreeTest = typeof (form.isAgreeTest) == 'undefined' || form.isAgreeTest == null || (form.isAgreeTest + '') == '' ? '' : form.isAgreeTest + "";
    $scope.isCopyPermanentAddress = typeof (form.isDisplayCopy) == 'undefined' || form.isDisplayCopy == null ? true : form.isDisplayCopy;
    $scope.arvExchangeResult = utils.getContentOfDefault(form.arvExchangeResult, '');
    $scope.siteConfirmTest = utils.getContentOfDefault(form.siteConfirmTest, '');
    $scope.pageRedirect = utils.getContentOfDefault(form.pageRedirect, '');
    $scope.therapyRegistProvinceID = utils.getContentOfDefault(form.therapyRegistProvinceID, '');
    $scope.therapyRegistDistrictID = utils.getContentOfDefault(form.therapyRegistDistrictID, '');
    $scope.hasHealthInsurance = utils.getContentOfDefault(form.hasHealthInsurance, '');
    $scope.healthInsuranceNo = utils.getContentOfDefault(form.healthInsuranceNo, '');

    // Thêm custom validate date
    $.validator.addMethod("validDate", function (value, element) {
        return value.match(/(?:0[1-9]|[12][0-9]|3[01])\/(?:0[1-9]|1[0-2])\/(?:19|20\d{2})/);
    }, "Nhập đúng định dạng theo dd/mm/yyyy");

    // Custom validate phone Vietname
    $.validator.addMethod("validPhone", function (value, element) {
        return value.match(/^$|([0-9])\b/); // Regex valid for empty string or number only
    }, "Số điện thoại không hợp lệ");

    // Check input date with curent date
    $.validator.addMethod("invalidFutureDate", function (value, element) {

        var date = value.substring(0, 2);
        var month = value.substring(3, 5);
        var year = value.substring(6, 10);

        var dateToCompare = new Date(year, month - 1, date);
        var currentDate = new Date();

        return dateToCompare < currentDate;

    }, "Không được nhập ngày tương lai.");

    // Khai báo object items
    $scope.items = {
        serviceID: "#serviceID",
        patientPhone: "#patientPhone",
        patientID: "#patientID",
        referralSource: "#referralSource",
        testResultsID: "#testResultsID",
        reactive_result: "2",
        non_reactive_result: "1",
        siteConfirmTest: "#siteConfirmTest",
        notExchange: "2",
        fixedServiceID: "#fixedServiceID",
        raceID: "#raceID",
        jobID: "#jobID",
        isAgreeTest: "#isAgreeTest",
        modeOfTransmission: "#modeOfTransmission",
        partnerProvideResult: "#partnerProvideResult",
        confirmResultsID: "#confirmResultsID",
        arvExchangeResult: "#arvExchangeResult",
        genderID: "#genderID",
        objectGroupID: "#objectGroupID",
        asanteTest: "#asanteTest",
        currentProvinceID: "#currentProvinceID",
        currentAddress: "#currentAddress",
        currentDistrictID: "#currentDistrictID",
        currentWardID: "#currentWardID",
        permanentProvinceID: "#permanentProvinceID",
        permanentDistrictID: "#permanentDistrictID",
        permanentAddress: "#permanentAddress",
        exchangeProvinceID: "#exchangeProvinceID",
        exchangeDistrictID: "#exchangeDistrictID",
        therapyRegistProvinceID: "#therapyRegistProvinceID",
        therapyRegistDistrictID: "#therapyRegistDistrictID",
        permanentWardID: "#permanentWardID",
        riskBehaviorID: "#riskBehaviorID",
        code: "#code",
        testNoFixSite: "#testNoFixSite",
        confirmTestNo: "#confirmTestNo",
        exchangeTime: "#exchangeTime",
        arrivalSite: "#arrivalSite",
        registeredTherapySite: "#registeredTherapySite",
        registerTherapyTime: "#registerTherapyTime",
        therapyNo: "#therapyNo",
        isDisplayCopy: "#isDisplayCopy",
        isAgreePreTest: "#isAgreePreTest",
        siteConfirmTestDsp: "#siteConfirmTestDsp",
        preTestTime: "#preTestTime",
        resultsTime: "#resultsTime",
        hasHealthInsurance: "#hasHealthInsurance",
        healthInsuranceNo: "#healthInsuranceNo"
    };

    // Validate for fields on add new customer for testing HIV
    $scope.validationOptions = angular.extend($scope.$parent.validationOptions, {
        rules: {
            advisoryeTime: {
                validDate: true,
                invalidFutureDate: true,
                required: true
            },

            patientName: {
                required: function (element) {
                    return $($scope.items.testResultsID).val() === $scope.items.reactive_result;
                },
                maxlength: 100
            },

            serviceID: {
                required: true
            },

            fixedServiceID: {
                required: function (element) {
                    return $($scope.items.serviceID).val().length > 0;
                }
            },

            code: {
                required: true
            },

            patientPhone: {
                validPhone: function (element) {
                    return $($scope.items.patientPhone).val().length > 0;
                }
            },

            patientID: {
                digits: function (element) {
                    return $($scope.items.patientID).val().length > 0;
                }
            },

            raceID: {
                required: function (element) {
                    return $($scope.items.testResultsID).val() === $scope.items.reactive_result;
                }
            },

            genderID: {
                required: function (element) {
                    return $($scope.items.testResultsID).val() === $scope.items.reactive_result;
                }
            },

            yearOfBirth: {
                required: function (element) {
                    return $($scope.items.testResultsID).val() === $scope.items.reactive_result;
                },
                digits: true,
                maxlength: 4
            },

            permanentAddress: {
                required: function (element) {
                    return $($scope.items.testResultsID).val() === $scope.items.reactive_result;
                }
            },

            permanentProvinceID: {
                required: function (element) {
                    return $($scope.items.testResultsID).val() === $scope.items.reactive_result;
                }
            },

            permanentDistrictID: {
                required: function (element) {
                    return $($scope.items.testResultsID).val() === $scope.items.reactive_result;
                }
            },

            currentAddress: {
                required: function (element) {
                    return $($scope.items.testResultsID).val() === $scope.items.reactive_result;
                }
            },

            currentProvinceID: {
                required: function (element) {
                    return $($scope.items.testResultsID).val() === $scope.items.reactive_result;
                }
            },

            currentDistrictID: {
                required: function (element) {
                    return $($scope.items.testResultsID).val() === $scope.items.reactive_result;
                }
            },

            objectGroupID: {
                required: true
            },

            approacherNo: {
                required: function (element) {
                    return $($scope.items.referralSource).val().length > 0;
                }
            },

            youInjectCode: {
                required: function (element) {
                    return $($scope.items.referralSource).val().length > 0;
                }
            },

            testResultsID: {
                required: function (element) {
                    return $($scope.items.testResultsID).val() === "1";
                }
            },

            resultsTime: {
                required: function (element) {
                    return $($scope.items.testResultsID).val() === $scope.items.non_reactive_result;
                },
                validDate: true
            },

            isAgreeTest: {
                required: function (element) {
                    return $($scope.items.testResultsID).val() === $scope.items.reactive_result;
                }
            },

            staffBeforeTestID: {
                required: true
            },

            staffAfterID: {
                required: function (element) {
                    return $($scope.items.confirmResultsID).val().length > 0;
                }
            },

            isAgreePreTest: {
                required: true
            },
            
            hasHealthInsurance: {
                required: true
            },
            
            healthInsuranceNo: {
                required: function (element) {
                    return $($scope.items.hasHealthInsurance).val().length > 0;
                }
            }
        },
        messages: {
            advisoryeTime: {
                validDate: "Nhập đúng định dạng theo dd/mm/yyyy",
                invalidFutureDate: "Không được nhập ngày tương lai",
                required: "Ngày tư vấn trước xét nghiệm không được để trống",
            },
            patientName: {required: "Tên khách hàng không được để trống", maxlength: "Tên khách hàng không được quá 100 ký tự"},
            serviceID: {required: "Loại hình dịch vụ không được để trống"},
            fixedServiceID: {required: "Loại hình dịch vụ tại cơ sở cố định không được để trống"},
            code: {required: "Mã khách hàng không được để trống"},
            patientPhone: {validPhone: "Số điện thoại không hợp lệ"},
            patientID: {digits: "Số chứng minh nhân dân không hợp lệ"},
            raceID: {required: "Dân tộc không được để trống"},
            genderID: {required: "Giới tính không được để trống"},
            yearOfBirth: {required: "Năm sinh không được để trống",
                digits: "Năm sinh phải là số",
                maxlength: "Năm sinh không được quá 4 ký tự số"},
            permanentAddress: {required: "Địa chỉ thường trú không được để trống"},
            permanentProvinceID: {required: "Tỉnh thành không được để trống"},
            permanentDistrictID: {required: "Quận huyện không được để trống"},
            currentProvinceID: {required: "Tỉnh thành không được để trống"},
            currentDistrictID: {required: "Quận huyện không được để trống"},
            currentAddress: {required: "Địa chỉ cư trú hiện tại không được để trống"},
            objectGroupID: {required: "Nhóm đối tượng không được để trống"},
            approacherNo: {required: "Mã số tiếp cận cộng đồng không được để trống"},
            youInjectCode: {required: "Mã số bạn tình/bạn chích không được để trống"},
            testResultsID: {required: "Kết quả xét nghiệm sàng lọc không được để trống"},
            resultsTime: {
                required: "Ngày nhận kết quả xét nghiệm không được để trống",
                validDate: "Nhập đúng định dạng theo dd/mm/yyyy"
            },
            isAgreeTest: {required: "Câu trả lời không được để trống"},
            staffBeforeTestID: {required: "Nhân viên không được để trống"},
            staffAfterID: {required: "Nhân viên không được để trống"},
            isAgreePreTest: {required: "Câu trả lời không được trống"},
            hasHealthInsurance: {required: "Câu trả lời không được trống"},
            healthInsuranceNo: {required: "Mã số BHYT không được trống"}
        }
    });

    $scope.init = function () {
        $scope.$parent.select_search($scope.items.serviceID, "Chọn dịch vụ");
        $scope.$parent.select_search($scope.items.fixedServiceID, "Chọn dịch vụ");
        $scope.$parent.select_search($scope.items.raceID, "Chọn dân tộc");
        $scope.$parent.select_search($scope.items.jobID, "Chọn công việc");
        $scope.$parent.select_search($scope.items.referralSource, "Chọn nguồn giới thiệu");
        $scope.$parent.select_search($scope.items.isAgreeTest, "Đồng ý tiếp tục xét nghiệm");
        $scope.$parent.select_search($scope.items.modeOfTransmission, "Chọn đường lây nhiễm");
        $scope.$parent.select_search($scope.items.partnerProvideResult, "Thông tin tư vấn xét nghiệm ban tình/bạn chích");
        $scope.$parent.select_search($scope.items.testResultsID, "Kết quả xét nghiệm sàng lọc");
        $scope.$parent.select_search($scope.items.confirmResultsID, "Kết quả xét nghiệm khẳng định");
        $scope.$parent.select_search($scope.items.arvExchangeResult, "Kết quả xét nghiệm khẳng định");
        $scope.$parent.select_search($scope.items.genderID, "Chọn giới tính");
        $scope.$parent.select_search($scope.items.objectGroupID, "Chọn nhóm đối tượng");
        $scope.$parent.select_search($scope.items.asanteTest, "Chọn kết quả");
        $scope.$parent.select_search($scope.items.siteConfirmTest, "Chọn cơ sở");
        $scope.$parent.select_search($scope.items.currentProvinceID, "Chọn tỉnh thành");
        $scope.$parent.select_search($scope.items.currentDistrictID, "Chọn quận huyện");
        $scope.$parent.select_search($scope.items.currentWardID, "Chọn phường xã");
        $scope.$parent.select_search($scope.items.permanentProvinceID, "Chọn tỉnh thành");
        $scope.$parent.select_search($scope.items.permanentDistrictID, "Chọn quận huyện");
        $scope.$parent.select_search($scope.items.permanentWardID, "Chọn phường xã");
        $scope.$parent.select_search($scope.items.arvExchangeResult, "Chọn kết quả tư vấn");
        $scope.$parent.select_search($scope.items.exchangeProvinceID, "Chọn tỉnh thành");
        $scope.$parent.select_search($scope.items.exchangeDistrictID, "Chọn quận huyện");
        $scope.$parent.select_search($scope.items.therapyRegistProvinceID, "Chọn tỉnh thành");
        $scope.$parent.select_search($scope.items.therapyRegistDistrictID, "Chọn quận huyện");
        $scope.$parent.select_search($scope.items.isAgreePreTest, "Chọn câu trả lời");
        $scope.$parent.select_search($scope.items.hasHealthInsurance, "Chọn câu trả lời");

        $scope.$parent.select_mutiple($scope.items.riskBehaviorID, "Chọn hành vi nguy cơ lây nhiễm");

        //Load cơ sở xét nghiệm khẳng định
        $scope.initSiteConfirmTest();

        // Tiếp tục đồng ý xét nghiệm khẳng định
        $($scope.items.testResultsID).on("change", function () {
            if ($($scope.items.testResultsID).val() === "2") {
                $($scope.items.isAgreeTest).val("true").change();
            }
        });

        // Mặc định có xét nghiệm sàng lọc
        $($scope.items.isAgreePreTest).ready(function () {
            if (($scope.isAgreePreTest == 'undefined' || $scope.isAgreePreTest || $scope.isAgreePreTest == '') && $scope.id == '') {
                $($scope.items.isAgreePreTest).val("1").change();
                $($scope.items.siteConfirmTest).removeAttr("disabled");
            }
        });

        //Dữ liệu địa danh
        $scope.initProvince($scope.items.permanentProvinceID, $scope.items.permanentDistrictID, $scope.items.permanentWardID);
        $scope.initProvince($scope.items.currentProvinceID, $scope.items.currentDistrictID, $scope.items.currentWardID);
        $scope.initProvince($scope.items.exchangeProvinceID, $scope.items.exchangeDistrictID, null);
        $scope.initProvince($scope.items.therapyRegistProvinceID, $scope.items.therapyRegistDistrictID, null);

        $scope.addressAutocomplete($scope.items.permanentAddress, $scope.items.permanentProvinceID, $scope.items.permanentDistrictID, $scope.items.permanentWardID);
        $scope.addressAutocomplete($scope.items.currentAddress, $scope.items.currentProvinceID, $scope.items.currentDistrictID, $scope.items.currentWardID);

        //event copy
        $("#permanentProvinceID, #permanentAddress, #permanentDistrictID, #permanentWardID").change(function () {
            if ($scope.isCopyPermanentAddress) {
                $($scope.items.currentAddress).val($($scope.items.permanentAddress).val()).change();
                $($scope.items.currentProvinceID).val($($scope.items.permanentProvinceID).val()).change();
                $($scope.items.currentDistrictID).val($($scope.items.permanentDistrictID).val()).change();
                $($scope.items.currentWardID).val($($scope.items.permanentWardID).val()).change();
            }
        });

        //Get button submit value
        $("button").click(function () {
            var fired_button = $(this).val();
            if (fired_button === "continue") {
                $("#pageRedirect").val("htc-new");
            }

            if (fired_button === "save-print") {
                $("#pageRedirect").val("save-print");
                $scope.pageRedirect = "save-print";
            }

            if (fired_button === "return-list") {
                $("#pageRedirect").val("return-list");
            }
        });

        $scope.codeSupport();

        if (getURLParameter('printable') === "save-print") {
            $scope.dialogReport(urlTransferOPC + "?oid=" + $scope.id, null, "Phiếu chuyển gửi cơ sở điều trị");
            $("#pdf-loading").remove();
        }

    };

    // Set UPPERCASE sau khi nhập xong mã khách hàng
    $("#code, #testNoFixSite, #confirmTestNo").blur(function () {
        $($scope.items.code).val($($scope.items.code).val().toUpperCase());
        $($scope.items.testNoFixSite).val($($scope.items.testNoFixSite).val().toUpperCase());
        $($scope.items.confirmTestNo).val($($scope.items.confirmTestNo).val().toUpperCase());
    }
    );
    
    $("#healthInsuranceNo").blur(function () {
        $($scope.items.healthInsuranceNo).val($($scope.items.healthInsuranceNo).val().toUpperCase());
    });

    // Ràng buộc hiển thị đống ý XN sàng lọc và các trường liên quan
    if ($($scope.items.isAgreePreTest).val() !== "1") {
        $($scope.items.preTestTime).attr("disabled", 'disabled');
        $($scope.items.testResultsID).attr("disabled", 'disabled');
        $($scope.items.siteConfirmTest).attr("disabled", 'disabled');
        $($scope.items.isAgreeTest).attr("disabled", 'disabled');
        $($scope.items.resultsTime).attr("disabled", 'disabled');
    } else if ($($scope.items.isAgreePreTest).val() === "1") {
        $($scope.items.preTestTime).removeAttr("disabled");
        $($scope.items.testResultsID).removeAttr("disabled");
        $($scope.items.isAgreeTest).removeAttr("disabled");
        $($scope.items.resultsTime).removeAttr("disabled");
    }

    $("#riskBehaviorID").change(
            function () {
                if ($("#riskBehaviorID").val() !== null && $("#riskBehaviorID").val().toString().charAt(0) === ',') {
                    $("#riskBehaviorID option[value='']").removeAttr("selected");
                }
            }
    );

    // Đồng ý xn và có phản ứng mới cho nhập nơi đăng ký xn khẳng định
    $("#testResultsID, #isAgreeTest").change(
            function () {
                if ($($scope.items.testResultsID).val() == $scope.items.reactive_result
                        && $($scope.items.isAgreeTest).val() == "true") {
                    $($scope.items.siteConfirmTest).removeAttr("disabled");
                } else {
                    $($scope.items.siteConfirmTest).attr("disabled", 'disabled');
                }
            });

    $($scope.items.isAgreePreTest).change(
            function () {
                if ($($scope.items.isAgreePreTest).val() !== "1") {
                    $($scope.items.preTestTime).attr("disabled", 'disabled');
                    $($scope.items.testResultsID).attr("disabled", 'disabled');
                    $($scope.items.siteConfirmTest).attr("disabled", 'disabled');
                    $($scope.items.isAgreeTest).attr("disabled", 'disabled');
                    $($scope.items.resultsTime).attr("disabled", 'disabled');
                } else if ($($scope.items.isAgreePreTest).val() === "1") {

                    $($scope.items.preTestTime).removeAttr("disabled");
                    if (typeof ($scope.preTestTime) == 'undefined'
                            || $scope.preTestTime == null
                            || $scope.preTestTime == '') {

                        $scope.preTestTime = $scope.advisoryeTime;
                    }

                    $($scope.items.testResultsID).removeAttr("disabled");
                    $($scope.items.isAgreeTest).removeAttr("disabled");
                    $($scope.items.resultsTime).removeAttr("disabled");
                }
            }
    );

    // Ràng buộc hiển thị chuyển gửi điều trị 
    if (typeof (form.arvExchangeResult) == 'undefined' || form.arvExchangeResult == null
            || form.arvExchangeResult == '' || form.arvExchangeResult == $scope.items.notExchange) {
        $($scope.items.exchangeTime).attr("disabled", 'disabled');
    } else {
        $($scope.items.exchangeTime).removeAttr("disabled");
    }

    if (typeof (form.exchangeTime) == 'undefined' || form.exchangeTime == null || form.exchangeTime == '') {
        $($scope.items.exchangeProvinceID).attr("disabled", 'disabled');
        $($scope.items.exchangeDistrictID).attr("disabled", 'disabled');
        $($scope.items.arrivalSite).attr("disabled", 'disabled');
        $($scope.items.registerTherapyTime).attr("disabled", 'disabled');
    } else {
        $($scope.items.exchangeProvinceID).removeAttr("disabled");
        $($scope.items.exchangeDistrictID).removeAttr("disabled");
        $($scope.items.arrivalSite).removeAttr("disabled");
        $($scope.items.registerTherapyTime).removeAttr("disabled");
    }

    if (typeof (form.registerTherapyTime) === 'undefined' || form.registerTherapyTime === null || form.registerTherapyTime === '') {
        $($scope.items.therapyRegistProvinceID).attr("disabled", 'disabled');
        $($scope.items.therapyRegistDistrictID).attr("disabled", 'disabled');
        $($scope.items.registeredTherapySite).attr("disabled", 'disabled');
        $($scope.items.therapyNo).attr("disabled", 'disabled');
    } else {
        $($scope.items.therapyRegistProvinceID).removeAttr("disabled");
        $($scope.items.therapyRegistDistrictID).removeAttr("disabled");
        $($scope.items.registeredTherapySite).removeAttr("disabled");
        $($scope.items.therapyNo).removeAttr("disabled");
    }

    $($scope.items.arvExchangeResult).change(
            function () {
                if (typeof ($($scope.items.arvExchangeResult).val()) === 'undefined' || $($scope.items.arvExchangeResult).val() === null
                        || $($scope.items.arvExchangeResult).val() === '' || $($scope.items.arvExchangeResult).val() === $scope.items.notExchange) {
                    $($scope.items.exchangeTime).attr("disabled", 'disabled');
                    $($scope.items.exchangeProvinceID).attr("disabled", 'disabled');
                    $($scope.items.exchangeDistrictID).attr("disabled", 'disabled');
                    $($scope.items.arrivalSite).attr("disabled", 'disabled');
                    $($scope.items.registerTherapyTime).attr("disabled", 'disabled');
                    $($scope.items.therapyRegistProvinceID).attr("disabled", 'disabled');
                    $($scope.items.therapyRegistDistrictID).attr("disabled", 'disabled');
                    $($scope.items.registeredTherapySite).attr("disabled", 'disabled');
                    $($scope.items.therapyNo).attr("disabled", 'disabled');
                } else {
                    $($scope.items.exchangeTime).removeAttr("disabled");
                }
            }
    );

    // Hiển thị tên cơ sở xét nghiệm khẳng định
    $($scope.items.siteConfirmTest).change(
            function () {
                $($scope.items.siteConfirmTestDsp).val($("#siteConfirmTest option:selected").text()).change();
            }
    );

    $($scope.items.exchangeTime).on("change", function () {
        var regex = new RegExp('[dmy]');
        if ($($scope.items.exchangeTime).val() == null || $($scope.items.exchangeTime).val() == ''
                || regex.test($($scope.items.exchangeTime).val())) {
            $($scope.items.exchangeProvinceID).attr("disabled", 'disabled');
            $($scope.items.exchangeDistrictID).attr("disabled", 'disabled');
            $($scope.items.arrivalSite).attr("disabled", 'disabled');
            $($scope.items.registerTherapyTime).attr("disabled", 'disabled');
            $($scope.items.therapyRegistProvinceID).attr("disabled", 'disabled');
            $($scope.items.therapyRegistDistrictID).attr("disabled", 'disabled');
            $($scope.items.registeredTherapySite).attr("disabled", 'disabled');
            $($scope.items.therapyNo).attr("disabled", 'disabled');
        } else {
            $($scope.items.exchangeProvinceID).removeAttr("disabled");
            $($scope.items.exchangeDistrictID).removeAttr("disabled");
            $($scope.items.arrivalSite).removeAttr("disabled");
            $($scope.items.registerTherapyTime).removeAttr("disabled");
        }
    });

    $($scope.items.registerTherapyTime).on("change", function () {
        var regex = new RegExp('[dmy]');
        if ($($scope.items.registerTherapyTime).val() == null || $($scope.items.registerTherapyTime).val() == ''
                || regex.test($($scope.items.registerTherapyTime).val())) {
            $($scope.items.therapyRegistProvinceID).attr("disabled", 'disabled');
            $($scope.items.therapyRegistDistrictID).attr("disabled", 'disabled');
            $($scope.items.registeredTherapySite).attr("disabled", 'disabled');
            $($scope.items.therapyNo).attr("disabled", 'disabled');
        } else {
            $($scope.items.therapyRegistProvinceID).removeAttr("disabled");
            $($scope.items.therapyRegistDistrictID).removeAttr("disabled");
            $($scope.items.registeredTherapySite).removeAttr("disabled");
            $($scope.items.therapyNo).removeAttr("disabled");
        }
    });


    $scope.initSiteConfirmTest = function () {
        $.ajax({
            url: '/service/htc/site-confirmatory-test.json',
            processResults: function (result) {
                var items = [];
                for (var i = 0; i < result.data.length; i++) {
                    items[i] = {id: result.data[i].id, text: result.data[i].name};
                }
                return {
                    results: items
                };
            },
//            cache: true
        }).then(function (result) {
            if (result.data.length > 0) {
                $($scope.items.siteConfirmTest).append(new Option("Chọn cơ sở xét nghiệm", "", i == 0, false));
            }

            for (var i = 0; i < result.data.length; i++) {
                var option = new Option(result.data[i].name, result.data[i].id, false, false);
                $($scope.items.siteConfirmTest).append(option);
            }
            $($scope.items.siteConfirmTest).val(utils.getContentOfDefault(form.siteConfirmTest, '')).change();
            $($scope.items.siteConfirmTest).trigger('change');
        });
    };

    if ($scope.id != "" && $($scope.items.isDisplayCopy).val() == "") {
        $scope.isCopyPermanentAddress = false;
        $($scope.items.isDisplayCopy).val(false);
    }

    $scope.copyAddress = function () {

        $scope.isCopyPermanentAddress = !$scope.isCopyPermanentAddress;
        if (!$scope.isCopyPermanentAddress) {
            $($scope.items.currentAddress).removeAttr("disabled").val('').change();
            $($scope.items.currentProvinceID).removeAttr("disabled").val('').change();
            $($scope.items.currentDistrictID).removeAttr("disabled").val('').change();
            $($scope.items.currentWardID).removeAttr("disabled").val('').change();
            $($scope.items.isDisplayCopy).val(false);

        } else {
            $($scope.items.currentAddress).attr({disabled: "disable"}).val($("#permanentAddress").val()).change();
            $($scope.items.currentProvinceID).attr({disabled: "disable"}).val($("#permanentProvinceID").val()).change();
            $($scope.items.currentDistrictID).attr({disabled: "disable"}).val($("#permanentDistrictID").val()).change();
            $($scope.items.currentWardID).attr({disabled: "disable"}).val($("#permanentWardID").val()).change();
            $($scope.items.isDisplayCopy).val(true);
        }
    };

    /**
     * Tự động lấy visit cuối cùng để sugget cho người dùng
     * @auth vvThành
     * @returns {undefined}
     */
    $scope.codeSupport = function () {
        $.ajax({
            url: '/service/htc/last-visit.json',
            success: function (resp) {
                if (resp.success && resp.data != null) {
                    var html = '<small class="form-text text-muted">Mã KH cuối cùng: ' + resp.data.code + '</small>';
                    $("#code").after(html);
                }
            }
        });
    };

    var getURLParameter = function (sParam) {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++)
        {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam)
            {
                return sParameterName[1];
            }
        }
    }

});

//support google chart angulas http://angular-google-chart.github.io/angular-google-chart/docs/1.0.0-beta.1/examples/multi-chart/
app.controller('htc_dashboard', function ($scope) {
    $scope.fromTime = fromTime;
    $scope.toTime = toTime;

    $scope.init = function () {
        //close event enter
        $('form input').on('keypress', function (e) {
            return e.which !== 13;
        });

        $scope.$parent.select_mutiple("#service", "Tât cả");
        $scope.search();

    };
    $scope.search = function () {
        $scope.positiveTrans();
        $scope.visit();
        $scope.objectGroup();
        $scope.objectAgePercent();
        $scope.target();
        $scope.positiveObjectGroup();
    };

    //AnhDSN - sử dụng trực tiếp google chart
    $scope.target = function () {
        setTimeout(function () {
            google.charts.load('current', {'packages': ['corechart']});
            google.charts.setOnLoadCallback(function () {
                var chitieuTable = [['Năm', 'Lượt XN thực tế', "KH dương tính thực tế"]];
                var thuteTable = [['Năm', 'Lượt XN thực tế', "KH dương tính thực tế"]];
                $.ajax({
                    url: '/service/htc/dashboard-target.json',
                    data: {
                        from_time: $scope.fromTime,
                        to_time: $scope.toTime,
                        service: $("#service").val().join(",")
                    },
                    success: function (resp) {
                        if (resp.success) {
                            $.each(resp.data, function (k, v) {
                                chitieuTable.push(["Năm " + k, v[0], v[2]]);
                                thuteTable.push(["Năm " + k, v[1], v[3]]);
                            });
                            var colChartDiff = new google.visualization.ColumnChart(document.getElementById('targetChart'));
                            var options = {
                                annotations: {highContrast: true},
                                legend: {
                                    position: 'top',
                                    maxLines: 1,
                                    textStyle: {
                                        fontSize: 11
                                    }
                                },
                                chartArea: {width: '85%},
                                diff: {
                                    oldData: {
                                        opacity: 1,
                                        tooltip: {
                                            prefix: 'Chỉ tiêu'
                                        }
                                    },
                                    newData: {
                                        opacity: 1,
                                        widthFactor: 0.6,
                                        tooltip: {
                                            prefix: 'Thực tế'
                                        }
                                    },
                                    previousData:{
                                        backgroundColor: '#FF1493'
                                    }
                                }
                            };

                            var diffData = colChartDiff.computeDiff(
                                    google.visualization.arrayToDataTable(chitieuTable),
                                    google.visualization.arrayToDataTable(thuteTable));
                            google.visualization.events.addListener(colChartDiff, 'ready', function () {
                                $scope.getChart('targetChart', colChartDiff);
                            });
                            colChartDiff.draw(diffData, options);
                            $('g[column-id="-1"] > g > text').html("Chỉ tiêu");
                        }
                    }
                });
            });
        }, 300);
    };
    //AnhDSN

    /**
     * Dowload hình ảnh bản đồ
     * @param {type} id
     * @param {type} chartWrapper
     * @returns {undefined}
     */
    $scope.getChart = function (id, chart) {
        $("a#dowload-" + id).attr("href", chart.getImageURI());
        $("a#dowload-" + id).attr("download", id + ".png");
        $("a#dowload-" + id).fadeIn();

    };

    $scope.getChartImage = function (id, linkElement) {
        var myDiv = document.getElementById(id);
        var myImage = myDiv.children[0];
        linkElement.href = myImage.src;
    };

    $scope.objectGroup = function () {
        setTimeout(function () {
            google.charts.load('current', {'packages': ['corechart']});
            google.charts.setOnLoadCallback(function () {
                var options = {
                    title: 'Nhóm đối tượng TVXN từ ' + $scope.fromTime + " đến " + $scope.toTime,
                    pieHole: 0.4,
                    legend: {
                        position: 'right',
                        textStyle: {
                            fontSize: 11
                        }
                    },
                    chartArea: {left: 0, width: '100%}
                };
                $.ajax({
                    url: '/service/htc/dashboard-objectgroup.json',
                    data: {
                        from_time: $scope.fromTime,
                        to_time: $scope.toTime,
                        service: $("#service").val().join(",")
                    },
                    success: function (resp) {
                        if (resp.success) {
                            var table = new google.visualization.DataTable();
                            table.addColumn('string', 'Nhóm đối tượng');
                            table.addColumn('number', 'Đối tượng');
                            $.each(resp.data, function (k, v) {
                                table.addRow([k, v]);
                            });
                            var elm = document.getElementById('objectQuarterChart');
                            var chartTargetChart = new google.visualization.PieChart(elm);
                            google.visualization.events.addListener(chartTargetChart, 'ready', function () {
                                $scope.getChart('objectQuarterChart', chartTargetChart);
                            });
                            chartTargetChart.draw(table, options);
                        }
                    }
                });
            });
        }, 300);
    };

    /**
     * Thống kê khách hàng dương tính chuyển gửi điều trị theo tháng
     * @author TrangBN
     */
    $scope.positiveTrans = function () {
        setTimeout(function () {
            google.charts.load('current', {'packages': ['corechart']});
            google.charts.setOnLoadCallback(function () {
                var options = {
                    vAxis: {title: 'Số lượng dương tính},
                    hAxis: {title: 'Khách hàng dương tính CGĐT Từ ' + $scope.fromTime + " đến " + $scope.toTime},
                    seriesType: 'bars',
                    legend: {
                        maxLines: 3,
                        position: 'top',
                        textStyle: {
                            fontSize: 11
                        }
                    },
                    chartArea: {width: '85%},
                    series: {
                        0: {color: '#CC0000},
                        1: {type: 'line', color: '#009900', pointSize: 5},
                        2: {type: 'line', color: '#DD9900', pointSize: 5}}
                };

                $.ajax({
                    url: '/service/htc/dashboard-positive-trans.json',
                    data: {
                        from_time: $scope.fromTime,
                        to_time: $scope.toTime,
                        service: $("#service").val().join(",")
                    },
                    success: function (resp) {
                        if (resp.success) {
                            var table = new google.visualization.DataTable();
                            table.addColumn('string', 'Tháng');
                            table.addColumn('number', 'Dương tính');
                            table.addColumn('number', 'Chuyển gửi');
                            table.addColumn('number', 'Chuyển gửi điều trị thành công');
                            $.each(resp.data, function (k, v) {
                                table.addRow([k, v[0], v[1], v[2]]);
                            });
                            var chart = new google.visualization.ComboChart(document.getElementById('positiveTrans'));
                            google.visualization.events.addListener(chart, 'ready', function () {
                                $scope.getChart('positiveTrans', chart);
                            });
                            var view = new google.visualization.DataView(table);
                            view.setColumns([0,
                                1, {calc: "stringify",
                                    sourceColumn: 1,
                                    type: "string",
                                    role: "annotation"},
                                2, {calc: "stringify",
                                    sourceColumn: 2,
                                    type: "string",
                                    role: "annotation"},
                                3, {calc: "stringify",
                                    sourceColumn: 3,
                                    type: "string",
                                    role: "annotation"}]);
                            chart.draw(view, options);
                        }
                    }
                });
            })
        }, 300);
    };

    $scope.visit = function () {
        setTimeout(function () {
            google.charts.load('current', {'packages': ['corechart']});
            google.charts.setOnLoadCallback(function () {
                var options = {
                    isStacked: true,
                    colors: ['#CC0000', '#DD9900'],
                    legend: {
                        position: 'top',
                        textStyle: {
                            fontSize: 11
                        }
                    },
                    chartArea: {width: '85%},
                    series: {1: {type: 'line', pointSize: 5}},
                    vAxis: {
                        title: "Số lượt"
                    },
                    hAxis: {
                        title: "Lượt TVXN từ " + $scope.fromTime + " đến " + $scope.toTime
                    }
                };

                $.ajax({
                    url: '/service/htc/dashboard-visit.json',
                    data: {
                        from_time: $scope.fromTime,
                        to_time: $scope.toTime,
                        service: $("#service").val().join(",")
                    },
                    success: function (resp) {
                        if (resp.success) {
                            var table = new google.visualization.DataTable();
                            table.addColumn('string', 'Tháng');
                            table.addColumn('number', 'Dương tính');
                            table.addColumn('number', 'Lượt xét nghiệm');
                            $.each(resp.data, function (k, v) {
                                table.addRow([k, v[0], v[1]]);
                            });
                            var elm = document.getElementById('visitChart');
                            var chartTargetChart = new google.visualization.ColumnChart(elm);
                            google.visualization.events.addListener(chartTargetChart, 'ready', function () {
                                $scope.getChart('visitChart', chartTargetChart);
                            });
                            var view = new google.visualization.DataView(table);
                            view.setColumns([0,
                                1,
                                2, {calc: "stringify",
                                    sourceColumn: 2,
                                    type: "string",
                                    role: "annotation"}]);
                            chartTargetChart.draw(view, options);
                        }
                    }
                });
            });
        }, 300);
    };

    // Biểu đồ tỷ lệ khách hàng TVXN theo độ tuổi
    $scope.objectAgePercent = function () {

        setTimeout(function () {
            google.charts.load("current", {packages: ["corechart"]});
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                $.ajax({
                    url: '/service/htc/dashboard-age-percent.json',
                    dataType: "json",
                    data: {
                        from_time: $scope.fromTime,
                        to_time: $scope.toTime,
                        service: $("#service").val().join(",")
                    },
                    success: function (resp) {
                        if (resp.success) {
                            var arrayData = [];
                            arrayData.push(['object-age', 'object by age', 'order']);
                            var index = 0;
                            $.each(resp.data, function (k, v) {
                                switch (true) {
                                    case k === 'Dưới 15' && v > 0:
                                        index = 1;
                                        break;
                                    case k === '15 đến dưới 25' && v > 0:
                                        index = 2;
                                        break;
                                    case k === '25 đến 49' && v > 0:
                                        index = 3;
                                        break;
                                    case k === 'Trên 49' && v > 0:
                                        index = 4;
                                        break;
                                    case k === 'Không rõ' && v > 0:
                                        index = 5;
                                        break;
                                    default:
                                        return k;
                                }
                                arrayData.push([k, v, index]);
                            });
                            var dataTable = google.visualization.arrayToDataTable(arrayData);
                        }

                        var options = {
                            title: 'Khách hàng TVXN theo độ tuổi từ ' + $scope.fromTime + " đến " + $scope.toTime,
                            pieHole: 0.4,
                            legend: {
                                position: 'right',
                                textStyle: {
                                    fontSize: 11
                                }
                            },
                            chartArea: {left: 0, width: '100%}
                        };
                        var chart = new google.visualization.PieChart(document.getElementById('agePercentTestQuarterChart'));
                        google.visualization.events.addListener(chart, 'ready', function () {
                            $scope.getChart('agePercentTestQuarterChart', chart);
                        });
                        dataTable.sort([{column: 2}]);
                        chart.draw(dataTable, options);
                    }
                });
            }
        }, 300);
    };

    // Tỷ lệ khách hàng dương tính theo nhóm đối tượng
    $scope.positiveObjectGroup = function () {

        setTimeout(function () {
            google.charts.load("current", {packages: ["corechart"]});
            google.charts.setOnLoadCallback(function () {

                var options = {
                    title: 'Nhóm đối tượng dương tính từ ' + $scope.fromTime + " đến " + $scope.toTime,
                    pieHole: 0.4,
                    legend: {
                        position: 'right',
                        textStyle: {
                            fontSize: 11
                        }
                    },
                    chartArea: {left: 0, width: '100%}
                };

                $.ajax({
                    url: '/service/htc/dashboard-positive-object.json',
                    dataType: "json",
                    data: {
                        from_time: $scope.fromTime,
                        to_time: $scope.toTime,
                        service: $("#service").val().join(",")
                    },
                    success: function (resp) {
                        if (resp.success) {
                            var table = new google.visualization.DataTable();
                            table.addColumn('string', 'Nhóm đối tượng');
                            table.addColumn('number', 'Đối tượng');
                            $.each(resp.data, function (k, v) {
                                table.addRow([k, v]);
                            });
                            var elm = document.getElementById('positiveObjectGroup');
                            var chartTargetChart = new google.visualization.PieChart(elm);
                            google.visualization.events.addListener(chartTargetChart, 'ready', function () {
                                $scope.getChart('positiveObjectGroup', chartTargetChart);
                            });
                            chartTargetChart.draw(table, options);
                        }

                    }
                });
            });
        }, 300);
    };
});
