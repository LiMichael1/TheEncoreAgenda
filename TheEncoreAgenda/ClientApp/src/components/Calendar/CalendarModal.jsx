import ModalBody from "./ModalBody";
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader"

export default function CalendarModal(props) {
    const { title, date } = props;
    return (
        <div className="modal">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <ModalHeader title={title} />
                    <ModalBody />
                    <ModalFooter />
                    
                </div >
            </div >
        </div >
    );
}