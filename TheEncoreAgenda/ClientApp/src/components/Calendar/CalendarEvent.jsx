import { ShowContext } from './ShowContext';
import { useContext } from 'react';

export default CalendarEvent();

function CalendarEvent() {
    const { setIsOpen, setEventType } = useContext(ShowContext);
    function editEvent() {
        setIsOpen(true);
        setEventType("Edit");
    }
    return <div onClick={() => editEvent()}>{eventTitle}</div>;
}

