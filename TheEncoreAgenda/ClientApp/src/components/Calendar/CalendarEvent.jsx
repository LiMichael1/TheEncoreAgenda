import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShowContext, defaultEventInfo } from './ShowContext';
import useSingleAndDoubleClick from '../global/useSingleAndDoubleClick';

const CalendarEvent = ({ event = defaultEventInfo }) => {
    const { id, title, description, start, end, allDay } = event;
    const { setIsOpen, setEventType, setEventInfo } = useContext(ShowContext);
    const navigate = useNavigate();

    const editEvent = () => {
        setIsOpen(true);
        setEventType("Edit");
        setEventInfo(event);
    }

    const goToEvent = () => {
        navigate('/leaderboard/' + id);
    }

    const handleClick = useSingleAndDoubleClick(goToEvent, editEvent);

    return (
        <div onClick={handleClick} className='calendar-event' >
            {title !== '' ? title : 'Empty Title'} 
        </div>
    );
}

export default CalendarEvent;

