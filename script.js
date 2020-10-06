// page elements
var currentDayEl = $('#currentDay');
var timeConatinerEl = $('.container');

//global variables
var date = moment().format('MMMM Do, YYYY');
var day = moment().format('dddd');
var currentTime = moment().format('HH');


// times
var timeSlots = [
  {
    hour: '9',
    hourLong:'09',
    period: 'am',
    note: '',
  },
  {
    hour: '10',
    hourLong:'10',
    period: 'am',
    note: '',
  },
  {
    hour: '11',
    hourLong:'11',
    period: 'am',
    note: '',
  },
  {
    hour: '12',
    hourLong:'12',
    period: 'pm',
    note: '',
  },
  {
    hour: '1',
    hourLong:'13',
    period: 'pm',
    note: '',
  },
  {
    hour: '2',
    hourLong:'14',
    period: 'pm',
    note: '',
  },
  {
    hour: '3',
    hourLong:'15',
    period: 'pm',
    note: '',
  },
  {
    hour: '4',
    hourLong:'16',
    period: 'pm',
    note: '',
  },
  {
    hour: '5',
    hourLong:'17',
    period: 'pm',
    note: '',
  },
];


//header
var dayDate = $('<div>').text(day + ', ' + date);
currentDayEl.append(dayDate);

// display reminder notes
function displayReminders() {
  timeSlots.forEach(time => {
    var hourText = JSON.parse(localStorage.getItem(time.hour));
    time.note = hourText;
  });
}

displayReminders();

// add items  and styling
timeSlots.forEach(time => {
  var hourRow = $('<form>').addClass('class: row');
  hourRow.attr('id', 'planner');

  timeConatinerEl.append(hourRow);

  var timeField = $('<div>')
    .text(time.hour + time.period)
    .addClass('class: col-md-1 hour');
  var appText = $('<textarea>').addClass('class: col-md-10 description p-0');
  appText.attr('id', time.hour);

  appText.text(time.note);

  if (time.hourLong < currentTime) {
    appText.addClass('class: past'); // gray
  } else if (time.hourLong === currentTime) {
    appText.addClass('class: present'); //red
  } else if (time.hourLong > currentTime) {
    appText.addClass('class : future'); //green
  }

  var saveBtn = $("<i class='far fa-save fa-lg'></i>");
  var savePlan = $('<button>').addClass('class : col-md-1 saveBtn');
  savePlan.attr('value', time.hour);

  savePlan.append(saveBtn);
  hourRow.append(timeField, appText, savePlan);
});


// save click action, save reminders
$('#planner .saveBtn').click(function (event) {
  event.preventDefault();
  var id = $(this).attr('value');

  var textBlock = document.getElementById(id);
  var textSave = textBlock.value;

  localStorage.setItem(id, JSON.stringify(textSave));
});
