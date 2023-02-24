import { useContext } from 'react';
import { ShowContext } from './ShowContext';

export default function CalendarCell(props) {
    let { date, className } = props;
    const { setIsOpen } = useContext(ShowContext);
    if (className !== null) {
        className += " dayCol";
    }
    else className += " dayCol";
    return (

        <td className={className} onClick={e => { setIsOpen(true) }}>
            {date}
        </td>
        
    );

}