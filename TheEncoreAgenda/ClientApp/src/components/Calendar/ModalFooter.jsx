import { useContext } from 'react';
import { ShowContext } from './ShowContext';

export default function ModalFooter() {
    const {setIsOpen } = useContext(ShowContext);

    return (
        <div className="modal-footer">
            <button type="button" className="btn btn-primary">Save</button>
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setIsOpen(false)}>Cancel</button>
        </div>
    );
}