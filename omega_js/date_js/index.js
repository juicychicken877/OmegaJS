const timeZoneOffsets = [14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10, -11, -12];

const timeZoneSelect = document.getElementById('time_zone_select');
var timeZoneOffsetIndex = null;
var currentSelectedTimeZone = null;
var userTimeZone = null;
var currentDate = new Date();

// get new year
var newYear = new Date(currentDate.getFullYear()+1, 0, 1);
// user timezone from computer
var timeZoneOffset = (currentDate.getTimezoneOffset())*(-1);

function Build() {
    document.getElementById('reset_time_zone').addEventListener('click', () => ResetTimeZone());
    SetDefaultTimeZone();
    SetTimeZoneSelect();
    SetTimers();
}

function ResetTimeZone() {
    timeZoneSelect.selectedIndex = timeZoneOffsetIndex;
    currentSelectedTimeZone = userTimeZone;
}

function SetTimers() {
    // set timers
    setInterval(UpdateCurrentDate, 1000);
    setInterval(DisplayCurrentDate, 1000);
    setInterval(DisplayTimeTillNewYear, 1000);
}

function UpdateCurrentDate() {
    // 3600 seconds in an hour * 1000 you get miliseconds
    let offset = (currentSelectedTimeZone * 3600 * 1000) - (userTimeZone * 3600 * 1000);
    currentDate = new Date() - offset;
}

function SetDefaultTimeZone() {
    for (let i=0; i<timeZoneOffsets.length; i++) {
        if ((timeZoneOffsets[i]*60) == timeZoneOffset) {
            userTimeZone = timeZoneOffsets[i];

            // set default timezone as users timezone
            currentSelectedTimeZone = userTimeZone;
            // change select
            timeZoneSelect.selectedIndex = i;
            timeZoneOffsetIndex = i;
        }
    }
}

function DisplayCurrentDate() {
    // cut the miliseconds
    let newDate = Math.floor(currentDate / 1000);

    let days = Math.floor(newDate / 86400);
    newDate -= days * 86400;

    let hours = Math.floor(newDate / 3600);
    newDate -= hours * 3600;

    let minutes = Math.floor(newDate / 60);
    newDate -= minutes * 60;

    let seconds = newDate;

    // dont display the 24th hour
    if (hours == 23)
        hours = 0;
    else
        hours += 1;

    document.getElementById('current_date').textContent = `${FixDateItem(hours) + ':' + FixDateItem(minutes) + ':' + FixDateItem(seconds)}`;
}

function ChangeCurrentTimeZone(index) {
    currentSelectedTimeZone = timeZoneOffsets[index];
}

function DisplayTimeTillNewYear() {
    // date in miliseconds so cut the miliseconds - divide by 1000
    let tillNewYear = Math.floor((newYear - currentDate) / 1000);
    // days
    let newYearDays = Math.floor(tillNewYear / 86400);
    tillNewYear -= newYearDays * 86400;

    // hours
    let newYearHours = Math.floor(tillNewYear / 3600);
    tillNewYear -= newYearHours * 3600;

    // minutes
    let newYearMinutes = Math.floor(tillNewYear / 60);
    tillNewYear -= newYearMinutes * 60;

    // seconds
    let newYearSeconds = tillNewYear;

    document.getElementById('till_new_year').textContent = `${newYearDays + ' DAYS ' + newYearHours + ' HOURS ' + newYearMinutes +' MINUTES ' + newYearSeconds + ' SECONDS'}`;
}

// add leading zeros
function FixDateItem(item) {
    if (item < 10)
        item = '0' + item;

    return item;
}

function SetTimeZoneSelect() {
    timeZoneSelect.addEventListener('change', () => ChangeCurrentTimeZone(timeZoneSelect.selectedIndex));
}

document.addEventListener('onload', Build());