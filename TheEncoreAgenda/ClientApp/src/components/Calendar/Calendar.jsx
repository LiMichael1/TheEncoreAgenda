import CalendarCard from "./CalendarCard";
import CalendarTable from "./CalendarTable";
import { getCurrentMonth, getCurrentMonthDate, getCurrentYear } from "./CalendarFunctions";

export default function Calendar() {
    //const title = getTitle();
    const month = getCurrentMonth();
    const monthDate = getCurrentMonthDate();
    const year = getCurrentYear();
    return (
        <div className="container">
            <div className="card">
                <CalendarCard month={month} year={year} />
                <CalendarTable month={monthDate} year={year} />
            </div>
            
        </div>
        )
}