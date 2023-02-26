import { useContext } from 'react';
import { ShowContext, defaultEventInfo } from './ShowContext';

const CalendarEvent = ({ event = defaultEventInfo }) => {
    const { title, description, start, end, allDay } = event;
    const { setIsOpen, setEventType, setEventInfo } = useContext(ShowContext);
    function editEvent() {
        setIsOpen(true);
        setEventType("Edit");
        setEventInfo(event);
    }

    return (
        <div onClick={() => editEvent()} style={{ backgroundColor: 'red', borderBottom: '1px solid black' } }>
            {title !== '' ? title : 'Empty Title'} 
        </div>
    );
}

export default CalendarEvent;