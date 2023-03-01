import { next, previous, getCurrentMonth} from "./CalendarFunctions";
import { useEffect, useContext } from "react";
import { ShowContext, defaultEventInfo } from './ShowContext';

export default function CalendarCard(props) {
    const { calendar, setCalendar } = props;
    const { setIsOpen, setEventType, setEventInfo, events, matchEvents } = useContext(ShowContext);

    const handleClick = () => {
        setIsOpen(true);
        setEventType("New");
        setEventInfo(defaultEventInfo);
    }

    return (
        <div className="card-header">
            <div className="row">
                <div className="col">
                    <h3 id="monthAndYear">{getCurrentMonth(calendar.month)} {calendar.year}</h3>
                </div>
                <div className="col card-icons">
                    <button onClick={() => handleClick()} className="cal-glow-button">Create Event</button>

                    {/*handles the next and previous arrows to change month displayed on calendar*/}
                    <i
                        className="bi bi-arrow-left-short"
                        id="previous"
                        onClick={e => {
                            const [newMonth, newYear] = previous();
                            setCalendar({ month: newMonth, year: newYear });
                        }}
                    />
                    <i
                        className="bi bi-arrow-right-short"
                        id="next"
                        onClick={e => {
                            const [newMonth, newYear] = next();
                            setCalendar({ month: newMonth, year: newYear });
                        }}
                    />
                    
                </div>
            </div>
        </div>
    );
}
                            