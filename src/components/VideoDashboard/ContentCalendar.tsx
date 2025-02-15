import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import type { DropTargetMonitor } from 'react-dnd';

interface ScriptItem {
  id: string;
  // Additional script item properties here
}

const ContentCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'SCRIPT_ITEM',
    drop: (item: ScriptItem) => handleSchedule(item),
    collect: (monitor: DropTargetMonitor) => ({
      isOver: !!monitor.isOver()
    })
  }));

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      console.log('Selected date:', date);
      // Add additional date change logic here
    }
  };

  return (
    <div ref={drop} className={`calendar ${isOver ? 'active' : ''}`}>
      <DatePicker 
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd HH:mm"
        showTimeSelect
      />
    </div>
  );
};

function handleSchedule(item: ScriptItem) {
  console.log('Scheduled item:', item);
  // Implement scheduling logic
}

export default ContentCalendar;