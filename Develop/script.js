// DEPENDENCIES
var timeEl = $("#currentDay");
var timeBlockEl = $("#timeBlocks");

// DATA

// FUNCTIONS
    // Current day is displayed at the top of the calendar;
function displayTime() {
    var current = moment().format("dddd, MMMM Do");
    timeEl.text(current);
};

    // Time blocks are color-coded indicating past, present, or future;
function timeBlockCheck() {
    for (let i=0; i < timeBlockEl.children().length; i++) {
        var timeTest = i+9;
        if (moment().format("H") == timeTest) {
            timeBlockEl.children().eq(i).children().eq(1).addClass("bg-danger");
        } else if (moment().format("H") > timeTest) {
            timeBlockEl.children().eq(i).children().eq(1).addClass("bg-secondary");
        } else {
            timeBlockEl.children().eq(i).children().eq(1).addClass("bg-success");
        }
    }
};
    // Click into time block to enter event
        // Accomplished by just setting type in HTML to input;

    // Save event to local storage


    // When user refreshes page, saved events will be rendered back to page
function renderSchedule() {
    for (let i = 0; i < timeBlockEl.children().length; i++) {
        var index = timeBlockEl.children().eq(i).children().eq(0).text().trim();
        if (localStorage.getItem(index) !== null) {
            console.log("Event exists at " + index + " time");
            eventRender = JSON.parse(localStorage.getItem(index));
            console.log(eventRender);
            timeBlockEl.children().eq(i).children().eq(1).text(eventRender);
        } else {
            console.log("There is no event for " + index);
        }
    }
};

var example = timeBlockEl.children().eq(0).children().eq(0).text().trim();
console.log(example);

console.log(JSON.parse(localStorage.getItem(example)));

if (localStorage.getItem(example) !== null) {
    console.log("9AM exists");
} else {
    console.log("Object does not exist");
};

console.log(JSON.parse(localStorage.getItem("9AM")));

// USER INTERACTIONS
    // When user scrolls down, user is presented with time blocks for standard business hours
    // When user clicks time block, user can enter event
    // When user clicks save icon, the event will be saved to Local Storage
$(".custom-save-box").on("click", function() {
    var scheduledEvent = $(this).siblings("input").val();
    var scheduledTime = $(this).siblings(".custom-time-border").text().trim();
    localStorage.setItem(scheduledTime.trim(), JSON.stringify(scheduledEvent));
});

// INITIALIZATION
displayTime();
timeBlockCheck();
renderSchedule();