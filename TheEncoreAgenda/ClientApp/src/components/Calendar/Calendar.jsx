import CalendarCard from "./CalendarCard";
import CalendarTable from "./CalendarTable";
import { getCurrentMonthDate, getCurrentYear } from "./CalendarFunctions";
import { useState } from "react";
import CalendarModal from './CalendarModal';
import { ShowProvider } from './ShowContext';

function Calendar() {

    const [calendar, setCalendar] = useState({ month: getCurrentMonthDate(), year: getCurrentYear() });
    //const [show, setShow] = useState(false);
    //const [eventType, setEventType] = useState("");

    //const modalData = {
    //    show: [show, setShow],
    //    eventType: [eventType, setEventType]
    //};

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