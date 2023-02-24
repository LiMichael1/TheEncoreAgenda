import { useContext } from 'react';
import CalendarEvent from './CalendarEvent';
import { ShowContext } from './ShowContext';

export default function CalendarCell(props) {
    let { date, className } = props;
    const { setIsOpen, events } = useContext(ShowContext);
    const list = events.filter(x => checkDate(x.start, x.end, date));
    
    if (className !== null) {
        className += " dayCol";
    }
    else className += " dayCol";
    return (

        <td className={className} onClick={e => { setIsOpen(true) }}>
            {date}
            
            {list ? list.map(event => <CalendarEvent event={event} />) : ""}
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