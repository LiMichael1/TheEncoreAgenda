import CalendarCard from "./CalendarCard";
import CalendarTable from "./CalendarTable";
import { getCurrentMonth, getCurrentMonthDate, getCurrentYear } from "./CalendarFunctions";
import { useState } from "react";

function Calendar() {
    //const title = getTitle();
    //const month = getCurrentMonth();
    //const monthDate = getCurrentMonthDate();
    //const year = getCurrentYear();
    //const [ monthDate, year ] = getMonthAndYear();
    //const month = getCurrentMonth();

    const [calendar, setCalendar] = useState({ month: getCurrentMonthDate(), year: getCurrentYear() });

    return (
        <div className="container">
            <div className="card">
                <CalendarCard calendar={calendar} setCalendar={setCalendar} />
                <CalendarTable calendar={calendar} setCalendar={setCalendar} />
            </div>
            
        </div>
        )
}

export default Calendar;

//function getMonthAndYear(next = false, prev = false, month = 0, year = 0) {
//    if (!next && !prev) {
//        month = getCurrentMonthDate();
//        year = getCurrentYear();
//    }
//    else if (next) {

//    }
//    else if (prev) {

//    }
//    return [ month, year ];
//}