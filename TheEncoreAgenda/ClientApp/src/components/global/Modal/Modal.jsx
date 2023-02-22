import './Modal.styles.css';
import React, { useEffect, useRef } from 'react';

const Modal = ({ title = 'Title', children, show, setShow }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    console.log(`Modal Open: ${show}`);
    const modal = modalRef.current;
    if (show) {
      modal.style.display = 'block';
      modal.classList.add('show');
    } else {
      modal.style.display = 'none';
      modal.classList.remove('show');
    }
  }, [show]);

  return (
    <div className='modal fade' id='modal' role='dialog' ref={modalRef}>
      <div className='modal-dialog' id='modal-dialog' role='document'>
        <div className='modal-content' id='modal-content'>
          {/* Modal Header */}
          <div className='modal-header'>
            <h3>{title}</h3>
            <a className='closeModal' onClick={() => setShow(false)}>
              <i className='bi bi-x'></i>
            </a>
          </div>
          {/* Modal Body */}
          <div className='modal-body'>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
