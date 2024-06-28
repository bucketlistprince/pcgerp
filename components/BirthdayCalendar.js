// components/BirthdayCalendar.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const BirthdayCalendar = ({ birthdays }) => {
  const [date, setDate] = useState(new Date());

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = date.toISOString().split('T')[0];
      const birthday = birthdays.find(bday => bday.date === formattedDate);

      if (birthday) {
        return (
          <div className="bg-green-100 text-green-700 p-1 rounded text-xs">
            <span className="text-base">{birthday.name}</span>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="w-full flex justify-center">

      <Calendar
        onChange={setDate}
        value={date}
        tileContent={tileContent}
        className="w-full max-w-lg shadow-md p-4 rounded-lg"
      />
    </div>
  );
};

export default BirthdayCalendar;
