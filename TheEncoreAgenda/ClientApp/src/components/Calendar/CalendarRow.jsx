import CalendarCell from './CalendarCell';

export default function CalendarRow(props) {
    const { firstDay, rowNum, daysInMonth, month, year } = props;

    let date = 1;
    const daysInPrevMonth = getPrevMonth(month, year);

    const data = [];
    let today = new Date();

    for (let i = 0; i < 7; i++) {
        let classes = '';
        if (rowNum === 0) classes += 'colTop ';
        if (rowNum === 5) classes += 'colBottom ';
        if (i === 0) classes += 'colLeft ';
        if (i === 6) classes += 'colRight ';
        if (rowNum > 0 && i === 0) {
            date = rowNum * 7 - firstDay + 1;
        }
        if (rowNum === 0 && i < firstDay) {
            classes += 'calDisabled ';

            data.push({
                date: i - (firstDay - 1) + daysInPrevMonth,
                month: month + 1,
                className: classes,
                year: year,
            });
        }
        else if (date > daysInMonth) {
            classes += 'calDisabled ';

            data.push({
                date: date - daysInMonth,
                month: month + 1,
                className: classes,
                year: year,
            });

            date++;
        }
        else {
            if (today.getDate() === date && today.getFullYear() === year && today.getMonth() === month) {
                classes += 'dateToday ';


                data.push({
                    date: date,
                    month: month + 1,
                    className: classes,
                    year: year,
                });
            }
            else {


                data.push({
                    date: date,
                    month: month + 1,
                    className: classes,
                    year: year,
                });
            };
            date++;
        }
    }

    let rowClasses = 'calRow ';
    if (rowNum === 0) rowClasses += 'colTop ';
    else if (rowNum === 5) rowClasses += 'colBottom ';


    return (
        <tr className={rowClasses}>
        {
                data.map(({ className, date, month, year }, index) =>
                    <CalendarCell key={index} className={className} date={date} month={month} year={year} />)
        }
        </tr>
    );
    
}

function getPrevMonth(month, year) {
    if (month === 0) {
        return 32 - new Date(year - 1, 11, 32).getDate();
    }
    return 32 - new Date(year, month - 1, 32).getDate();
}
