import { next, previous } from "./CalendarFunctions";

export default function CalendarCard(props) {
    const { year, month } = props;
    return (
        <div className="card-header">
            <div className="row">
                <div className="col">
                    <h3 id="monthAndYear">{month} {year}</h3>
                </div>
                <div>
                    <i className="bi bi-arrow-left-short icon-size" id="previous" onClick={previous} />
                    <i className="bi bi-arrow-right-short icon-size" id="next" onClick={next} />
                    {/*<button id="previous" onClick={previous}>Previous</button>*/}
                    {/*<button id="next" onClick={next}>Next</button>*/}
                </div>
            </div>
        </div>
    );
}