// components/BigCalendarComponent.js
import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './BigCalendarComponent.module.css'; // Import custom CSS module

// Create a localizer with date-fns
const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const BigCalendarComponent = ({ birthdays }) => {
  // Transform birthdays to events
  const events = birthdays.map(birthday => ({
    title: birthday.name,
    start: new Date(birthday.date),
    end: new Date(birthday.date),
  }));

  return (
    <div className="p-2 w-full flex text-sm justify-center">
      <div className="bg-white shadow-lg rounded-lg border border-gray-200 w-full max-w-screen-lg">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600, width: '100%' }} // Ensure full width
          className="custom-calendar"
        />
      </div>
    </div>
  );
};

export default BigCalendarComponent;
