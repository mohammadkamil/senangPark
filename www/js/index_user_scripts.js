/*jshint browser:true */
/*global $ */
var patch = "http://localhost/ParkingWebsite/";
var login = patch + "loginMobile.php";
var registeruser = patch + "attendent/registerUser.php";
var topupUser = patch + "attendent/topupMobile.php";
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
                alert("Please Enter Barcode/Password");
            } else {
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
                            console.log("Errorrr");
                        } else {
                            data = JSON.parse(data);
                            attendentBarCode = data.userBarCode;
                            var table = document.getElementById("loginTable");
                            var row = table.insertRow(0);
                            var row1 = table.insertRow(1);
                            var row2 = table.insertRow(2);
                            var row3 = table.insertRow(3);
                            var cellrow = row.insertCell(0);
                            var cell2row = row.insertCell(1);
                            var cellrow1 = row1.insertCell(0);
                            var cell2row1 = row1.insertCell(1);
                            var cellrow2 = row2.insertCell(0);
                            var cell2row2 = row2.insertCell(1);
                            var cellrow3 = row3.insertCell(0);
                            var cell2row3 = row3.insertCell(1);
                            cellrow.innerHTML = "Name";
                            cell2row.innerHTML = data.senangName;
                            cellrow1.innerHTML = "Nombor Telephone";
                            cell2row1.innerHTML = data.userNotel;
                            cellrow2.innerHTML = "Address";
                            cell2row2.innerHTML = data.alamatSenang;
                            cellrow3.innerHTML = "Area Center";
                            cell2row3.innerHTML = data.senangAreaAttendent;

                            activate_page("#menupage");
                        }
                    },
                    error: function () {}
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
                    address: "null"
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
            return false;
        });

        /* button  #btnTopCan */
        $(document).on("click", "#btnTopCan", function (evt) {
            /*global activate_subpage */
            activate_subpage("#uib_page_2");
            return false;
        });

    }
    document.addEventListener("app.Ready", register_event_handlers, false);
})();