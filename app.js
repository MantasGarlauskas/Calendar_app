let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const newEventModal2 = document.getElementById('newEventModal2');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const eventStartTimeInput = document.getElementById('eventStartTimeInput');
const eventEndTimeInput = document.getElementById('eventEndTimeInput');
const eventTypeInput = document.getElementById('EventTypeInput');
const eventDescriptionInput = document.getElementById('eventDescriptionInput');
const eventTitleInput2 = document.getElementById('eventTitleInput2');
const eventNewDate = document.getElementById('eventNewDate');
const eventStartTimeInput2 = document.getElementById('eventStartTimeInput2');
const eventEndTimeInput2 = document.getElementById('eventEndTimeInput2');
const eventTypeInput2 = document.getElementById('eventTypeInput2');
const eventDescriptionInput2 = document.getElementById('eventDescriptionInput2');

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const openModal = (date) => {
    clicked = date;

    const eventForDay = events.find(e => e.date === clicked);
    if (eventForDay) {
        document.getElementById('eventText').innerText = eventForDay.title;
        document.getElementById('date').innerText = eventForDay.date;
        document.getElementById('start_time').innerText = eventForDay.start_time;
        document.getElementById('end_time').innerText = eventForDay.end_time;
        document.getElementById('type').innerText = eventForDay.type;
        document.getElementById('description').innerText = eventForDay.description;
        deleteEventModal.style.display = 'block';
    } else {
        newEventModal.style.display = 'block';
    }

    backDrop.style.display = 'block';
}

const load = () => {
    const dt = new Date();
    if (nav !== 0) {
        dt.setMonth(new Date().getMonth() + nav);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

    document.getElementById('monthDisplay').innerText =
        `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

    calendar.innerHTML = '';

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');
        const dayString = `${month + 1}/${i - paddingDays}/${year}`;
        if (i > paddingDays) {
            daySquare.innerText = i - paddingDays;
            const eventForDay = events.find(e => e.date === dayString);
            if (i - paddingDays === day && nav === 0) {
                daySquare.id = 'currentDay';
            }

            if (eventForDay) {
                const eventDiv = document.createElement('div');
                if (eventForDay.type == 'Meeting') {
                    eventDiv.classList.add('eventTypeMeeting');
                    eventDiv.innerText = eventForDay.title;
                    daySquare.appendChild(eventDiv);
                } else if (eventForDay.type == 'Call') {
                    eventDiv.classList.add('eventTypeCall');
                    eventDiv.innerText = eventForDay.title;
                    daySquare.appendChild(eventDiv);
                } else {
                    eventDiv.classList.add('eventTypeOther');
                    eventDiv.innerText = eventForDay.title;
                    daySquare.appendChild(eventDiv);
                }
            }
            daySquare.addEventListener('click', () => openModal(dayString));
        } else {
            daySquare.classList.add('padding');
        }
        calendar.appendChild(daySquare);
    }
}
const closeModal = () => {
    newEventModal.style.display = 'none';
    newEventModal2.style.display = 'none';
    deleteEventModal.style.display = 'none';
    backDrop.style.display = 'none';
    eventTitleInput.value = '';
    eventStartTimeInput.value = '';
    eventEndTimeInput.value = '';
    eventTypeInput.value = 'Meeting';
    eventDescriptionInput.value = '';
    eventTitleInput2.value = '';
    eventStartTimeInput2.value = '';
    eventEndTimeInput2.value = '';
    eventTypeInput2.value = 'Meeting';
    eventDescriptionInput2.value = '';
    eventNewDate.value = '';
    clicked = null;
    load();
}

const saveEvent = () => {
    if (eventTitleInput.value && eventStartTimeInput.value && eventEndTimeInput.value && eventTypeInput) {
        events.push({
            date: clicked,
            title: eventTitleInput.value,
            start_time: eventStartTimeInput.value,
            end_time: eventEndTimeInput.value,
            type: eventTypeInput.value,
            description: eventDescriptionInput.value
        });
        localStorage.setItem('events', JSON.stringify(events));
        closeModal();
    }
}

const saveNewEvent = () => {
    if (eventNewDate.value && eventTitleInput2.value && eventStartTimeInput2.value && eventEndTimeInput2.value && eventTypeInput2.value) {
        let newDateString = new Date(eventNewDate.value)
        events.push({
            date: newDateString.toLocaleDateString('en-US'),
            title: eventTitleInput2.value,
            start_time: eventStartTimeInput2.value,
            end_time: eventEndTimeInput2.value,
            type: eventTypeInput2.value,
            description: eventDescriptionInput2.value
        });
        localStorage.setItem('events', JSON.stringify(events));
        closeModal();
    }
    load();
}

const deleteEvent = () => {
    events = events.filter(e => e.date !== clicked);
    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
}

const openNewEventWindow = () => {
    newEventModal2.style.display = 'block';
    backDrop.style.display = 'block';
}

const initButtons = () => {
    document.getElementById('nextButton').addEventListener('click', () => {
        nav++;
        load();
    });
    document.getElementById('backButton').addEventListener('click', () => {
        nav--;
        load();
    });
    document.getElementById('saveButton').addEventListener('click', saveEvent);
    document.getElementById('cancelButton').addEventListener('click', closeModal);
    document.getElementById('deleteButton').addEventListener('click', deleteEvent);
    document.getElementById('closeButton').addEventListener('click', closeModal);
    document.getElementById('saveButton2').addEventListener('click', saveNewEvent);
    document.getElementById('cancelButton2').addEventListener('click', closeModal);
    document.getElementById('createNewEvent').addEventListener('click', openNewEventWindow)
}

initButtons();
load();