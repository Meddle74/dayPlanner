// page elements
var currentDayEl = $('#currentDay');
var timeConatinerEl = $('.container');

//global variables
var date = moment().format('MMMM Do, YYYY');
var day = moment().format('dddd');

var currentTime = moment().format('HH');
var currentTimeConverted = moment(currentTime, 'h:mm a').format('h');

var timeSlots = [
  {
    hour: '9',
    period: 'am',
    note: '',
  },
  {
    hour: '10',
    period: 'am',
    note: '',
  },
  {
    hour: '11',
    period: 'am',
    note: '',
  },
  {
    hour: '12',
    period: 'pm',
    note: '',
  },
  {
    hour: '1',
    period: 'pm',
    note: '',
  },
  {
    hour: '2',
    period: 'pm',
    note: '',
  },
  {
    hour: '3',
    period: 'pm',
    note: '',
  },
  {
    hour: '4',
    period: 'pm',
    note: '',
  },
  {
    hour: '5',
    period: 'pm',
    note: '',
  },
];

var dayDate = $('<div>').text(day + ', ' + date);
currentDayEl.append(dayDate);

function displayReminders() {
  timeSlots.forEach(function (time) {
    var hourText = JSON.parse(localStorage.getItem(time.hour));
    time.note = hourText;
  });
}

displayReminders();

timeSlots.forEach(function (time) {
  var hourRow = $('<form>').addClass('class: row');
  hourRow.attr('id', 'planner');

  timeConatinerEl.append(hourRow);

  var timeField = $('<div>')
    .text(time.hour + time.period)
    .addClass('class: col-md-1 hour');
  var appText = $('<textarea>').addClass('class: col-md-10 description p-0');
  appText.attr('id', time.hour);

  appText.text(time.note);

  if (time.hour < currentTimeConverted) {
    appText.addClass('class: past'); // gray
  } else if (time.hour === currentTimeConverted) {
    appText.addClass('class: present'); //red
  } else if (time.hour > currentTimeConverted) {
    appText.addClass('class : future'); //green
  }

  var saveBtn = $("<i class='far fa-save fa-lg'></i>");
  var savePlan = $('<button>').addClass('class : col-md-1 saveBtn');
  savePlan.attr('value', time.hour);

  savePlan.append(saveBtn);
  hourRow.append(timeField, appText, savePlan);
});

$('#planner .saveBtn').click(function (event) {
  event.preventDefault();
  var id = $(this).attr('value');

  var textBlock = document.getElementById(id);
  var textSave = textBlock.value;

  localStorage.setItem(id, JSON.stringify(textSave));
});
