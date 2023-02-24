import CalendarRow from "./CalendarRow";

export default function CalendarTable({ calendar }) {
    const month = calendar.month;
    const year = calendar.year;
    return (
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th className="weekCol">Sun</th>
                    <th className="weekCol">Mon</th>
                    <th className="weekCol">Tue</th>
                    <th className="weekCol">Wed</th>
                    <th className="weekCol">Thu</th>
                    <th className="weekCol">Fri</th>
                    <th className="weekCol">Sat</th>
                </tr>
            </thead>
            <tbody id="calendar-body">{showCalendarInternal(month, year)}</tbody>
        </table>
    );
}

function showCalendarInternal(month, year) {
    let firstDay = (new Date(year, month)).getDay();
    
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    
    const rows = [];

    let date = 1;
    for (let i = 0; i < 6; i++) {
        
        rows.push(<CalendarRow
            key={i}
            date={date}
            firstDay={firstDay}
            rowNum={i}
            daysInMonth={daysInMonth}
            month={month}
            year={year}
        />);
        //date = 
    }
    return rows;
}

