import React from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendarStyles.css';

function LessonCalendar({ onSelectDate, lessons, resets, payments, texts }) {

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const lessonDates = lessons.map(lesson => new Date(lesson.lesson_date).toDateString());
      const textDates = texts.map(text => new Date(text.created_date).toDateString());
      const resetDates = resets.map(reset => new Date(reset.reset_lesson_date).toDateString());
      const paymentDates = payments.map(payment => new Date(payment.payment_date).toDateString());

      const hasLesson = lessonDates.includes(date.toDateString());
      const hasText = textDates.includes(date.toDateString());
      const hasReset = resetDates.includes(date.toDateString());
      const hasPayment = paymentDates.includes(date.toDateString());

      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '5px' }}>
          {hasLesson && <div style={{ width: '30px', height: '10px', backgroundColor: 'blue', borderRadius: '5px', margin: '2px' }} />}
          {hasText && <div style={{ width: '30px', height: '10px', backgroundColor: '#00bbf0', borderRadius: '5px', margin: '2px' }} />}
          {hasReset && <div style={{ width: '30px', height: '10px', backgroundColor: '#ffc107', borderRadius: '5px', margin: '2px' }} />}
          {hasPayment && <div style={{ width: '30px', height: '10px', backgroundColor: 'green', borderRadius: '5px', margin: '2px' }} />}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="d-flex justify-content-center">
      <Calendar
        onClickDay={(date) => onSelectDate(date)} // Use onClickDay instead of onSelectSlot
        className="shadow-none border-0" // Remove default calendar shadow and border
        tileContent={tileContent}
      />
    </div>
  );
}

export default LessonCalendar;
