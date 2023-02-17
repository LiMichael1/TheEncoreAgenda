
export default function ModalBody() {

    return (
        <div className="modal-body">
            <div className="input-group">
                <div className="form-group row" style={{ width: "100%" }} >
                    <div className="col-2" style={{ margin: "auto" }} >
                        <label htmlFor="titleOfEvent" >Title</label>
                    </div>
                    <div className="col-10">
                        <input type="text" className="form-control" id="eventTitle" defaultValue="" required />
                    </div>


                </div>
                <div className="form-group" style={{ width: "100%" }} >
                    <label htmlFor="exampleTextarea" className="form-label mt-4">Description</label>
                    <textarea className="form-control" id="eventDescription" rows="3" defaultValue="" />
                </div>

            </div>
            <div className="input-group">

                <fieldset className="form-group row" style={{ padding: "12px" }} >

                    <label>Starts</label>
                    <input type="date" id="eventStart" className="form-control" defaultValue="" required />
                    <label>Ends</label>
                    <input type="date" id="eventEnd" className="form-control" defaultValue="" required />
                    <div className="form-check form-switch">
                        <label className="form-check-label" htmlFor="allDayCheck">All Day</label>
                        <input className="form-check-input" type="checkbox" id="allDayCheck" defaultChecked="" />
                    </div>

                </fieldset>

            </div>
        </div>
    );
}