import { useContext } from 'react';
import { ShowContext, defaultEventInfo } from './ShowContext';

const CalendarEvent = ({ event: {title, description, start, end, allDay } = defaultEventInfo }) => {

    const { setIsOpen, setEventType } = useContext(ShowContext);
    function editEvent() {
        setIsOpen(true);
        setEventType("Edit");
    }
    return (
        <div>
            {title} 
        </div>
    );
}

export default CalendarEvent;