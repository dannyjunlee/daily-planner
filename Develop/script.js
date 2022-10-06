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
        var renderItem = localStorage.getItem(i);
        if (timeBlockEl.children().eq(i).children().eq(1).text() !== "") {
            timeBlockEl.children().eq(i).children().eq(1).text(renderItem);
        };
    }
};

var example = timeBlockEl.children().eq(0).children().eq(0).text().trim();
console.log(example);

console.log(JSON.parse(localStorage.getItem(example)));

console.log(localStorage.getItem("12PM"));

// USER INTERACTIONS
    // When user scrolls down, user is presented with time blocks for standard business hours
    // When user clicks time block, user can enter event
    // When user clicks save icon, the event will be saved to Local Storage
$(".custom-save-box").on("click", function() {
    var scheduledEvent = $(this).siblings("input").val();
    var scheduledTime = $(this).siblings(".custom-time-border").text().trim();
    localStorage.setItem(scheduledTime, JSON.stringify(scheduledEvent));
});

// INITIALIZATION
displayTime();
timeBlockCheck();
renderSchedule();