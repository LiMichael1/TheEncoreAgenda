import { useContext } from 'react';
import { ShowContext } from './ShowContext';

export default function ModalHeader() {
    const { setIsOpen, eventType } = useContext(ShowContext);
    const insertEventType = eventType + " Event";

    return (
        <div className="modal-header">
            <h5 className="modal-title">{insertEventType}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setIsOpen(false) }>
                <span aria-hidden="true"></span>
            </button>
        </div>
    );
}