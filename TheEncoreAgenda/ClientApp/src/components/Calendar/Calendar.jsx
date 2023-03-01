import CalendarCard from "./CalendarCard";
import CalendarTable from "./CalendarTable";
import { getCurrentMonthDate, getCurrentYear } from "./CalendarFunctions";
import { useState } from "react";
import CalendarModal from './CalendarModal';
import { ShowProvider } from './ShowContext';

function Calendar() {

    const [calendar, setCalendar] = useState({ month: getCurrentMonthDate(), year: getCurrentYear() });
    

    return (
        <div className="container">
            <ShowProvider>
                <CalendarModal />
                <div className="card">
                    <CalendarCard calendar={calendar} setCalendar={setCalendar} />
                    <CalendarTable calendar={calendar} setCalendar={setCalendar} />
                </div>
            </ShowProvider>
        </div>
        )
}

export default Calendar;

