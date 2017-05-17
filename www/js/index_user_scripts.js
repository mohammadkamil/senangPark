/*jshint browser:true */
/*global $ */
var patch = "http://senangpark.com/parking/";
var login = patch + "loginMobile.php";
var registeruser = patch + "attendent/registerUser.php";
var topupUser = patch + "attendent/topupMobile.php";
var getfreelot = patch + "attendent/checkLot.php";
var usernameL, passwordL;
var attendentBarCode;
var nameReg, notelReg, plateNoReg, barcodeReg, passwordReg;
(function () {
    "use strict";
    /*
      hook up event handlers 
    */
    function register_event_handlers() {


        /* button  #btnLogin */
        $(document).on("click", "#btnLogin", function (evt) {
            usernameL = $("#barAttenLogin").val();
            passwordL = $("#passwordLogin").val();
           
            if (usernameL === "" || passwordL === "") {
                bootbox.alert("Please Enter Barcode/Password");
            } else {
                 bootbox.alert(login);
                $.ajax({
                    //Getting the url of the uploadphp from action attr of form 
                    //this means currently selected element which is our form 
                    url: login,

                    //For file upload we use post request
                    type: "POST",

                    //Creating data from form 
                    data: {
                        usernameL: usernameL,
                        passwordL: passwordL,

                    },
                    //Setting these to false because we are sending a multipart request
                    contentType: "application/x-www-form-urlencoded",
                    cache: false,
                    //processData: false,
                    success: function (data) {
                        if (data == "Error") {
                          bootbox.alert("Please enter correct username/password");
                        } else {
                            data = JSON.parse(data);
                            attendentBarCode = data.userBarCode;
                            var table = document.getElementById("loginTable");
                            var row = table.insertRow(0);
                            var row1 = table.insertRow(1);
                            // var row2 = table.insertRow(2);
                            var row3 = table.insertRow(2);
                            var cellrow = row.insertCell(0);
                            var cell2row = row.insertCell(1);
                            var cellrow1 = row1.insertCell(0);
                            var cell2row1 = row1.insertCell(1);
                            //                            var cellrow2 = row2.insertCell(0);
                            //                            var cell2row2 = row2.insertCell(1);
                            var cellrow3 = row3.insertCell(0);
                            var cell2row3 = row3.insertCell(1);
                            cellrow.innerHTML = "Name";
                            cell2row.innerHTML = data.senangName;
                            cellrow1.innerHTML = "Nombor Telephone";
                            cell2row1.innerHTML = data.userNotel;
                            //                            cellrow2.innerHTML = "Address";
                            //                            cell2row2.innerHTML = data.alamatSenang;
                            cellrow3.innerHTML = "Area Center";
                            cell2row3.innerHTML = data.senangAreaAttendent;

                            activate_page("#menupage");
                        }
                    },
                    error: function () {
                    }
                });
            }
            return false;
        });

        /* button  #slider */
        $(document).on("click", "#slider", function (evt) {
            /*global uib_sb */
            /* Other possible functions are: 
              uib_sb.open_sidebar($sb)
              uib_sb.close_sidebar($sb)
              uib_sb.toggle_sidebar($sb)
               uib_sb.close_all_sidebars()
             See js/sidebar.js for the full sidebar API */

            uib_sb.toggle_sidebar($(".uib_w_12"));
            return false;
        });

        /* button  #slideRegister */
        $(document).on("click", "#slideRegister", function (evt) {
            uib_sb.toggle_sidebar($(".uib_w_12"));
            /*global activate_subpage */
            activate_subpage("#register");
            return false;
        });

        /* button  #btnRegister */
        $(document).on("click", "#btnRegister", function (evt) {
            nameReg = $("#registerName").val();
            notelReg = $("#registerNotel").val();
            plateNoReg = $("#registerCar").val();
            barcodeReg = $("#registerBarcode").val();
            passwordReg = $("#registerPassword").val();
            if (nameReg === "" || notelReg === "" || plateNoReg === "" || barcodeReg === "" || passwordReg === "") {
                bootbox.alert("Please complete registeration form");
            } else {
                $.ajax({
                    //Getting the url of the uploadphp from action attr of form 
                    //this means currently selected element which is our form 
                    url: registeruser,

                    //For file upload we use post request
                    type: "POST",

                    //Creating data from form 
                    data: {
                        name: nameReg,
                        noTel: notelReg,
                        plateNo: plateNoReg,
                        barCode: barcodeReg,
                        passwordR: passwordReg,
                    },

                    //Setting these to false because we are sending a multipart request
                    contentType: "application/x-www-form-urlencoded",
                    cache: false,
                    //processData: false,
                    success: function (dataa) {
                        console.log(dataa);
                        dataa = JSON.parse(dataa);
                        if (dataa == "success") {
                            $("#registerName").val("");
                            $("#registerNotel").val("");
                            $("#registerCar").val("");
                            $("#registerBarcode").val("");
                            $("#registerPassword").val("");
                        }

                    },
                    error: function () {}
                });
            }

            return false;
        });

        /* button  #btncancelRegister */
        $(document).on("click", "#btncancelRegister", function (evt) {
            /*global activate_subpage */
            activate_subpage("#uib_page_2");
            return false;
        });

        /* button  #slideTopup */
        $(document).on("click", "#slideTopup", function (evt) {
            uib_sb.toggle_sidebar($(".uib_w_12"));
            /*global activate_subpage */
            activate_subpage("#topup");
            return false;
        });


        /* button  #slideLogout */
        $(document).on("click", "#slideLogout", function (evt) {
            /*global activate_page */
            activate_page("#mainpage");
            return false;
        });

        /* button  #btnTopup */
        $(document).on("click", "#btnTopup", function (evt) {
            var barcodeTopup = $("#barcodeTopup").val();
            var topupValue = $("#valueTopup").val();
            if (barcodeTopup === "" || topupValue === "") {
                bootbox.alert("Please complete TopUp Form");
            } else {
                bootbox.confirm({
                    message: "Please Confirm barcode user and Topup Value<br>Barcode: "+barcodeTopup+"<br>Topup Value: "+topupValue,
                    buttons: {
                        confirm: {
                            label: 'Yes',
                            className: 'btn-success'
                        },
                        cancel: {
                            label: 'No',
                            className: 'btn-danger'
                        }
                    },
                    callback: function (result) {
                        if(result===true){
                              $.ajax({
                    //Getting the url of the uploadphp from action attr of form 
                    //this means currently selected element which is our form 
                    url: topupUser,

                    //For file upload we use post request
                    type: "POST",

                    //Creating data from form 
                    data: {
                        barcodTopup: barcodeTopup,
                        topupValue: topupValue,

                    },

                    //Setting these to false because we are sending a multipart request
                    contentType: "application/x-www-form-urlencoded",
                    cache: false,
                    //processData: false,
                    success: function (dataa) {
                        console.log(dataa);
                        dataa = JSON.parse(dataa);
                        if (dataa == "Success") {
                            $("#barcodeTopup").val("");
                            $("#valueTopup").val("");
                        }

                    },
                    error: function () {}
                });
                        }else{
                            bootbox.alert("Please enter new information");
                            $("#barcodeTopup").val("");
                            $("#valueTopup").val("");
                        }
                    }
                });
              
            }

            return false;
        });

        /* button  #btnTopCan */
        $(document).on("click", "#btnTopCan", function (evt) {
            /*global activate_subpage */
            activate_subpage("#uib_page_2");
            return false;
        });

        /* button  #btnScanBarcodeL */
        $(document).on("click", "#btnScanBarcodeL", function (evt) {
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    $("#barAttenLogin").val(result.text);
                    bootbox.alert("We got a barcode\n" +
                        "Result: " + result.text + "\n" +
                        "Format: " + result.format + "\n" +
                        "Cancelled: " + result.cancelled);
                },
                function (error) {
                    bootbox.alert("Scanning failed: " + error);
                }, {

                    preferFrontCamera: true, // iOS and Android 
                    showFlipCameraButton: true, // iOS and Android 
                    showTorchButton: true, // iOS and Android 
                    torchOn: true, // Android, launch with the torch switched on (if available) 
                    prompt: "Place a barcode inside the scan area", // Android 
                    resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500 
                    formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED 
                    orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device 
                    disableAnimations: true, // iOS 
                    disableSuccessBeep: false // iOS 
                }
            );
        });

        /* button  #chkBsr */
        $(document).on("click", "#chkBsr", function (evt) {
            /* your code goes here */
            return false;
        });


        /* button  #slideFree */
        $(document).on("click", "#slideFree", function (evt) {
            $("#olist").empty();
            uib_sb.toggle_sidebar($(".uib_w_12"));
            $.ajax({
                //Getting the url of the uploadphp from action attr of form 
                //this means currently selected element which is our form 
                url: getfreelot,

                //For file upload we use post request
                type: "POST",

                //Creating data from form 


                //Setting these to false because we are sending a multipart request
                contentType: "application/x-www-form-urlencoded",
                cache: false,
                //processData: false,
                success: function (dataa) {
                    // console.log(dataa);
                    dataa = JSON.parse(dataa);
                    if (dataa.status.type == "Success") {
                        console.log(dataa.status.result.length);
                        activate_subpage("#enforcement");
                    }

                },
                error: function () {}
            });

            return false;
        });

        /* button  #btnScanTopup */
        $(document).on("click", "#btnScanTopup", function (evt) {
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    $("#barcodeTopup").val(result.text);
                },
                function (error) {
                    bootbox.alert("Scanning failed: " + error);
                }, {

                    preferFrontCamera: true, // iOS and Android 
                    showFlipCameraButton: true, // iOS and Android 
                    showTorchButton: true, // iOS and Android 
                    torchOn: true, // Android, launch with the torch switched on (if available) 
                    prompt: "Place a barcode inside the scan area", // Android 
                    resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500 
                    formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED 
                    orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device 
                    disableAnimations: true, // iOS 
                    disableSuccessBeep: false // iOS 
                }
            );
            return false;
        });

        /* button  #btnScanRegister */
        $(document).on("click", "#btnScanRegister", function (evt) {
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    $("#registerBarcode").val(result.text);
                },
                function (error) {
                    bootbox.alert("Scanning failed: " + error);
                }, {

                    preferFrontCamera: true, // iOS and Android 
                    showFlipCameraButton: true, // iOS and Android 
                    showTorchButton: true, // iOS and Android 
                    torchOn: true, // Android, launch with the torch switched on (if available) 
                    prompt: "Place a barcode inside the scan area", // Android 
                    resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500 
                    formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED 
                    orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device 
                    disableAnimations: true, // iOS 
                    disableSuccessBeep: false // iOS 
                }
            );
            return false;
        });

    }
    document.addEventListener("app.Ready", register_event_handlers, false);
})();