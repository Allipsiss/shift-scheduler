let calendar;
let selectedDate = null;
let shifts = {}; // Store shifts for each date

document.addEventListener('DOMContentLoaded', function() {
  const calendarEl = document.getElementById('calendar');
  calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'fa',
    dateClick: function(info) {
      selectedDate = info.dateStr;
      showPopup();
    }
  });

  calendar.render();
});

function showPopup() {
  document.getElementById('shift-popup').style.display = 'block';
}

function setShift(shiftType, colorClass) {
  shifts[selectedDate] = { type: shiftType, class: colorClass };
  closePopup();
  updateCalendar();
}

function clearShift() {
  delete shifts[selectedDate];
  closePopup();
  updateCalendar();
}

function closePopup() {
  document.getElementById('shift-popup').style.display = 'none';
}

function updateCalendar() {
  document.querySelectorAll('.shift-label').forEach(el => el.remove());
  document.querySelectorAll('.fc-daygrid-day').forEach(day => {
    day.classList.remove('morning', 'evening', 'night', 'off');
  });

  Object.keys(shifts).forEach(date => {
    const dayCell = document.querySelector(`[data-date="${date}"]`);
    if (dayCell) {
      let label = document.createElement('div');
      label.className = 'shift-label';
      label.textContent = shifts[date].type;
      dayCell.appendChild(label);
      dayCell.classList.add(shifts[date].class);
    }
  });
}

function printCalendar() {
  window.print();
}

