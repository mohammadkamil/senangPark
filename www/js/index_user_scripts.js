/*jshint browser:true */
/*global $ */
(function () {
    "use strict";
    /*
      hook up event handlers 
    */
    function register_event_handlers() {

        /* button  #send */
        $(document).on("click", "#send", function (evt) {
            /* your code goes here */
            var notel= $("#notel").val();
            console.log(notel);
            var messageInfo = {
                phoneNumber: notel,
                textMessage: "This is a test message"
            };

            sms.sendMessage(messageInfo, function (message) {
                console.log("success: " + message);
            }, function (error) {
                console.log("code: " + error.code + ", message: " + error.message);
            });
            
            return false;
        });

    }
    document.addEventListener("app.Ready", register_event_handlers, false);
})();