import CalendarRow from "./CalendarRow";
import React from 'react';
import { ShowContext } from "./ShowContext";
import { useContext, useEffect, useRef } from 'react';
import { fixDate, getCurrentMonth } from './CalendarFunctions';
import CalendarEvent from "./CalendarEvent";

export default function CalendarTable({ calendar }) {
    const month = calendar.month;
    const year = calendar.year;
    const {events, setEvents} = useContext(ShowContext);
    const tableRef = useRef();

    useEffect(() => {
        const getEvent = async () => {
            await fetch('/api/CalendarEvents').then(res => res.json())
                .then(data => {
                    
                    data.map(function (event) {
                        showEvent(event);
                    });
                })
        };
        getEvent();
    }, []);

    const showEvent = (e) => {
        const table = tableRef.current;
        const startDate = new Date(fixDate(e.start.substring(0, 10)));
        const endDate = new Date(fixDate(e.end.substring(0, 10)));

        //if (startDate.getMonth() !== getCurrentMonth()) return;

        for (let i = startDate.getDate(); i <= endDate.getDate(); i++) {
            let t = table.querySelector("#td" + i);
            if (t.childElementCount == 3) continue;

            const calEvent = <CalendarEvent event={e} />;
            console.log(calEvent);

            const x = document.createElement("p");
            x.innerHTML = "something";

            t.append(calEvent);

        }
    }

    return (
        <table ref={tableRef} className="table table-bordered">
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

const checkDate = () => {

}



//async function getEvents() {
//    const { events } = useContext(ShowContext);

//    await fetch('/api/CalendarEvents').then((response) => {
//        return response.json();
//    })
//        .then((data) => {
//            data.map(function () {

//            })
//        }
//}
