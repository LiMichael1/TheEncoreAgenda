import { useContext } from 'react';
import CalendarEvent from './CalendarEvent';
import { ShowContext, defaultEventInfo } from './ShowContext';

export default function CalendarCell(props) {
    let { date, month, year, className } = props;
    const { setIsOpen, setEventType, setEventInfo ,events, matchEvents } = useContext(ShowContext);

    const key = month + '-' + date + '-' + year;
    
    if (className !== null) {
        className += " dayCol";
    }
    else className += " dayCol";

    const handleClick = (e) => {
        if (!matchEvents[key]) {
            setIsOpen(true);
            setEventType('New');
            const day = new Date(year, month, date);
            // ????????????????????????????????????????????????????
            setEventInfo({ ...defaultEventInfo, start: day, end: day });
        }
        
    }

    return (

        <td className={className} id={`td` + date} onClick={handleClick}>
            {date}

            {!className.includes('calDisabled') && matchEvents[key] ? matchEvents[key].map((event, index) => {
                return <CalendarEvent key={index} event={event} />
            }) : ''}

        {/*    {list && !className.includes('calDisabled') ? list.map((event, index) => <CalendarEvent key={index} event={event} />) : ""}*/}
        </td>
        
    );

}

//const showEvent = () => {
//    if(checkDate()) return <CalendarEvent event={ } />
//}

const checkDate = (date1, date2, today) => {
    date1 = new Date(date1);
    date2 = new Date(date2);
    if (today >= date1.getDate() && today <= date2.getDate()) {
        return true;
    }
    else return false;
}