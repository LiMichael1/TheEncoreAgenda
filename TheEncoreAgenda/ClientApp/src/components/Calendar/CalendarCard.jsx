import { next, previous, getCurrentMonth} from "./CalendarFunctions";
import { useEffect } from "react";

export default function CalendarCard(props) {
    const { calendar, setCalendar } = props;

    return (
        <div className="card-header">
            <div className="row">
                <div className="col">
                    <h3 id="monthAndYear">{getCurrentMonth(calendar.month)} {calendar.year}</h3>
                </div>
                <div className="col card-icons">
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
                            