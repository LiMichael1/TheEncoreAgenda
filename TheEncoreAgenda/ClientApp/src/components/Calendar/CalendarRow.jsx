import CalendarCell from './CalendarCell';

export default function CalendarRow(props) {

    const { firstDay, rowNum, daysInMonth, month, year } = props;
    
    let date = 1;
    const daysInPrevMonth = getPrevMonth(month, year);
   
    const row = [];
    let today = new Date();

  const row = [];
  let today = new Date();

    for (let i = 0; i < 7; i++) {
        let classes = "";
        if (rowNum === 0) classes += "colTop ";
        if (rowNum === 5) classes += "colBottom ";
        if (i === 0) classes += "colLeft ";
        if (i === 6) classes += "colRight ";
        if (rowNum > 0 && i === 0) {
            date = (rowNum * 7) - firstDay + 1;
        }
        if (rowNum === 0 && i < firstDay) {
            classes += "calDisabled ";
            row.push(<CalendarCell date={i - (firstDay - 1) + daysInPrevMonth} className={classes} />);
        }
        else if (date > daysInMonth) {
            classes += "calDisabled ";
            row.push(<CalendarCell date={date - daysInMonth} className={classes} />);
            date++;
        }
        else {
            if (today.getDate() === date && today.getFullYear() === year && today.getMonth() === month) {
                classes += "dateToday ";
                row.push(<CalendarCell date={date} className={classes} />);
            }
            else row.push(<CalendarCell date={date} className={classes} />);
            date++;
        }
        
    }
    if (rowNum === 0 && i < firstDay) {
      classes += 'calDisabled ';
      row.push(
        <CalendarCell
          date={i - (firstDay - 1) + daysInPrevMonth}
          className={classes}
        />
      );
    } else if (date > daysInMonth) {
      classes += 'calDisabled ';
      row.push(<CalendarCell date={date - daysInMonth} className={classes} />);
    } else {
      if (
        today.getDate() === date &&
        today.getFullYear() === year &&
        today.getMonth() === month
      ) {
        classes += 'dateToday ';
        row.push(<CalendarCell date={date} className={classes} />);
      } else row.push(<CalendarCell date={date} className={classes} />);
    }
    date++;
  }

  if (rowNum === 0) return <tr className='calRow colTop'>{row}</tr>;
  else if (rowNum === 5) return <tr className='calRow colBottom'>{row}</tr>;
  else return <tr className='calRow'>{row}</tr>;
}

function getPrevMonth(month, year) {
  if (month === 0) {
    return 32 - new Date(year - 1, 11, 32).getDate();
  }
  return 32 - new Date(year, month - 1, 32).getDate();
}
