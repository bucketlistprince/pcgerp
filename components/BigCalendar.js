import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faCalendarDay,
  faCalendarWeek,
  faCalendar,
  faList,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styles from "./BigCalendar.module.css"; // Import the CSS module

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const BigCalendar = ({ birthdays }) => {
  const [view, setView] = useState("month");

  const events = birthdays.map((birthday) => ({
    title: birthday.name,
    start: new Date(birthday.date),
    end: new Date(birthday.date),
    className: styles["birthday-event"], // Apply the custom class for birthday events
  }));

  const Toolbar = ({ label, onNavigate, onView }) => (
    <div className={`rbc-toolbar ${styles.toolbar}`}>
      <div className={`rbc-btn-group ${styles["rbc-btn-group"]}`}>
        <button
          type="button"
          onClick={() => onNavigate("PREV")}
          aria-label="Previous"
          className={styles["rbc-btn"]}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button
          type="button"
          onClick={() => onNavigate("TODAY")}
          aria-label="Today"
          className={styles["today-btn"]}
          style={{fontSize: '0.90rem'}}
        >
          Today
        </button>
        <button
          type="button"
          onClick={() => onNavigate("NEXT")}
          aria-label="Next"
          className={styles["rbc-btn"]}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      <div className={`rbc-toolbar-label ${styles["rbc-toolbar-label"]}`}>
        {label}
      </div>
      <div className={`rbc-btn-group ${styles["rbc-btn-group"]}`}>
        <button
          type="button"
          onClick={() => onView("month")}
          aria-label="Month view"
          className={styles["rbc-btn"]}
        >
          <FontAwesomeIcon icon={faCalendarAlt} />
        </button>
        <button
          type="button"
          onClick={() => onView("week")}
          aria-label="Week view"
          className={styles["rbc-btn"]}
        >
          <FontAwesomeIcon icon={faCalendarWeek} />
        </button>
        <button
          type="button"
          onClick={() => onView("work_week")}
          aria-label="Work Week view"
          className={styles["rbc-btn"]}
        >
          <FontAwesomeIcon icon={faCalendar} />
        </button>
        <button
          type="button"
          onClick={() => onView("day")}
          aria-label="Day view"
          className={styles["rbc-btn"]}
        >
          <FontAwesomeIcon icon={faCalendarDay} />
        </button>
        <button
          type="button"
          onClick={() => onView("agenda")}
          aria-label="Agenda view"
          className={styles["rbc-btn"]}
        >
          <FontAwesomeIcon icon={faList} />
        </button>
      </div>
    </div>
  );

  return (
    <div className={`w-full flex justify-center ${styles["custom-calendar"]}`}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600, width: "100%" }}
        className="shadow-md p-4 rounded-lg"
        components={{
          toolbar: Toolbar,
        }}
        defaultView={view}
        onView={(newView) => setView(newView)}
        onNavigate={(date, newView) => {
          if (newView) {
            setView(newView);
          }
        }}
      />
    </div>
  );
};

export default BigCalendar;
