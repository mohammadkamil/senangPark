/*jshint browser:true */
/*global $ */
(function () {
    "use strict";
    /*
      hook up event handlers 
    */
    function register_event_handlers() {


        /* button  #btnSemdSMS */
        $(document).on("click", "#btnSemdSMS", function (evt) {
            var app = {
                checkSMSPermission: function () {
                    var success1 = function (hasPermission) {
                        if (hasPermission) {
                            var number =$("#notel").val();
                            var message = $("#msg").val();
                            console.log("number=" + number + ", message= " + message);
 bootbox.alert("number=" + number + ", message= " + message);
                            //CONFIGURATION
                            var options = {
                                replaceLineBreaks: false, // true to replace \n by a new line, false by default
                                android: {
                                    intent: 'INTENT' // send SMS with the native android SMS messaging
                                        //intent: '' // send SMS without open any other app
                                }
                            };

                            var success = function () {
                                bootbox.alert('Message sent successfully');
                            };
                            var error = function (e) {
                                 bootbox.alert('Message Failed:' + e);
                            };
                            sms.send(number, message, options, success, error);
                           
                        } else {
                            // show a helpful message to explain why you need to require the permission to send a SMS
                            // read http://developer.android.com/training/permissions/requesting.html#explain for more best practices
                        }
                    };
                    var error1 = function (e) {
                         bootbox.alert('Something went wrong:' + e);
                    };
                    sms.hasPermission(success1, error1);
                }
            };
            return false;
        });

    }
    document.addEventListener("app.Ready", register_event_handlers, false);
})();