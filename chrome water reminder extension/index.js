// ** things we need to do here **
//add event listner on button
//grab the value from input
//create an alarm for that value

var button = document.getElementById("myBtn");

button.addEventListener("click", () => {
    var minutes = parseInt(document.getElementById("num").value);
    console.log(minutes);
    if (minutes < 0) {
        alert("Re-Enter -> Time Cannot be Negative");
    } else if (minutes >= 0) {
        alert(`Reminder is Active now! ${minutes}`);
        document.getElementById("num").value = null;

        chrome.runtime.sendMessage({ minutes }, function (response) {
            console.log(response);
        });
    }
});

