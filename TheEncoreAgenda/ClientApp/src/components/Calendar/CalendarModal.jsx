import { useEffect, useRef, useContext } from "react";
import ModalBody from "./ModalBody";
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";
import { defaultEventInfo, ShowContext } from './ShowContext';

export default function CalendarModal() {
    let { isOpen, setIsOpen, eventType, eventInfo, setEventInfo } = useContext(ShowContext);
    if (!eventInfo) {
        eventInfo = defaultEventInfo;
    }

    console.log(eventInfo);
    console.log(eventInfo.allDay);
    console.log(eventInfo.title);

    if (eventType === "New") {

    }

    //eventType += " Event";
    const modalRef = useRef(null);

    useEffect(() => {
        const modal = modalRef.current;
        if (isOpen) {
            modal.style.display = 'block';
            modal.classList.add('show');
        } else {
            modal.style.display = 'none';
            modal.classList.remove('show');
        }
    }, [isOpen]);


    return (
        <div className="modal" ref={modalRef}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    {/*header*/}
                    <div className="modal-header">
                        <h5 className="modal-title">{eventType + ` Event`}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setIsOpen(false)}>
                            <span aria-hidden="true"></span>
                        </button>
                    </div>
                    {/*body*/}
                    <div className="modal-body">
                        <div className="input-group">
                            <div className="form-group row" style={{ width: "100%" }} >
                                <div className="col-2" style={{ margin: "auto" }} >
                                    <label htmlFor="titleOfEvent" >Title</label>
                                </div>
                                <div className="col-10">
                                    <input type="text" className="form-control" id="eventTitle" defaultValue={eventInfo.title} required />
                                </div>


                            </div>
                            <div className="form-group" style={{ width: "100%" }} >
                                <label htmlFor="eventDescription" className="form-label mt-4">Description</label>
                                <textarea className="form-control" id="eventDescription" rows="3" defaultValue={eventInfo.desc} />
                            </div>

                        </div>
                        <div className="input-group">

                            <fieldset className="form-group row" style={{ padding: "12px" }} >

                                <label>Starts</label>
                                <input type="date" id="eventStart" className="form-control" defaultValue={eventInfo.start} required />
                                <label>Ends</label>
                                <input type="date" id="eventEnd" className="form-control" defaultValue={eventInfo.end} required />
                                <div className="form-check form-switch">
                                    <label className="form-check-label" htmlFor="allDayCheck">All Day</label>
                                    <input className="form-check-input" type="checkbox" id="allDayCheck" defaultChecked={eventInfo.allDay} />
                                </div>

                            </fieldset>

                        </div>
                    </div>
                    {/*footer*/}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary">Save</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setIsOpen(false)}>Cancel</button>
                    </div>
                </div >
            </div >
        </div >
    );
}