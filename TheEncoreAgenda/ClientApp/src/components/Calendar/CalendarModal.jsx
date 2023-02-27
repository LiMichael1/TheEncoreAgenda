import { useEffect, useRef, useContext } from "react";
import { defaultEventInfo, ShowContext } from './ShowContext';

export default function CalendarModal() {
    let { isOpen, setIsOpen, eventType, eventInfo, setEventInfo, setEvents, events } = useContext(ShowContext);
    if (!eventInfo) {
        eventInfo = defaultEventInfo;
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


    if (eventType === "New") {
       
    }

    async function saveEvent() {
        // do all the stuff
        await fetch('/api/CalendarEvents', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventInfo)
        });

        setEvents([...events, eventInfo ]);
        setIsOpen(false);
        setEventInfo(defaultEventInfo);

    }

    function deleteEvent() {

        //await fetch('/api/CalendarEvents', {
        //    method: 'DELETE',
            
        //});

        setIsOpen(false);
        setEventInfo(defaultEventInfo);
    }

    function handleChange(event) {
        if (event.target.name === "allDay") {
            setEventInfo({ ...eventInfo, [event.target.name]: event.target.checked });
        }
        else setEventInfo({ ...eventInfo, [event.target.name]: event.target.value });
    }

    return (
        <div className="modal" ref={modalRef}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    {/*header*/}
                    <div className="modal-header">
                        <h5 className="modal-title">{eventType + ` Event`}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { setIsOpen(false); setEventInfo = defaultEventInfo; }}>
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
                                    <input type="text" className="form-control" name="title" id="eventTitle" value={eventInfo.title} onChange={handleChange} required />
                                </div>


                            </div>
                            <div className="form-group" style={{ width: "100%" }} >
                                <label htmlFor="eventDescription" className="form-label mt-4">Description</label>
                                <textarea className="form-control" name="description" id="eventDescription" rows="3" value={eventInfo.description} onChange={handleChange} />
                            </div>

                        </div>
                        <div className="input-group">

                            <fieldset className="form-group row" style={{ padding: "12px" }} >

                                <label>Starts</label>

                                <input type={`${eventInfo.allDay ? 'date' : 'datetime-local'}`} id="eventStart" className="form-control" name="start" value={eventInfo.start} onChange={handleChange} required />
                                
                                <label>Ends</label>
                                <input type={`${eventInfo.allDay ? 'date' : 'datetime-local'}`} id="eventEnd" className="form-control" name="end" value={eventInfo.end} onChange={handleChange} required />
                                
                                <div className="form-check form-switch">
                                    <label className="form-check-label" htmlFor="allDayCheck">All Day</label>
                                    <input className="form-check-input" type="checkbox" id="allDayCheck" name="allDay" checked={eventInfo.allDay} onChange={handleChange} />
                                </div>

                            </fieldset>

                        </div>
                    </div>
                    {/*footer*/}
                    <div className="modal-footer">
                        <button type="submit" className="btn btn-primary" onClick={() => saveEvent()}>Save</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setIsOpen(false)}>Cancel</button>
                        <button type="button" id="btnDelete" className="btn btn-warning" onClick={deleteEvent}>Delete</button>
                    </div>
                </div >
            </div >
        </div >
    );
}

const fixDateModal = (date, allDay) => {
    let newFormat = new Date(date);
    let month = newFormat.getMonth() < 9 ? "0" + parseInt(newFormat.getMonth()) : parseInt(newFormat.getMonth());
    let day = newFormat.getDate() < 10 ? "0" + newFormat.getDate() : newFormat.getDate();
    let outputDate = newFormat.getFullYear() + "-" + month + "-" + day;    
    return allDay ? outputDate : outputDate + "T" + newFormat.toTimeString().substring(0,5);
}