
let defaultDuration ;

chrome.alarms.onAlarm.addListener( function (alarm) {
    console.log("alarm" , alarm);

    // create notification code
    chrome.notifications.create("Alert Notification", {
            type: "basic",
            iconUrl : "./icons/64.png",
            title: "Time Up Buddy"  ,
            "message": "Current Timer is Over Set Your Next Goal!"
        }, function(notificationID){
            console.log("Notification Displayed Successfully!")
        })

});


function createAlarm(){
    chrome.alarms.create("Demo Alarm" , { delayInMinutes : defaultDuration});
}

createAlarm();


// recieving msg from index.js

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log("Event recieved in backround page");
      defaultDuration = request.minutes * 1.0;
      createAlarm();
      sendResponse({success: true});
    });