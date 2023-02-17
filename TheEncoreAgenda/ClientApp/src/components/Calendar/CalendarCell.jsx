

export default function CalendarCell(props) {
    let { date, className } = props;
    if (className !== null) {
        className += " dayCol";
    }
    else className += " dayCol";
    return <td className={className}>{date}</td>;
}