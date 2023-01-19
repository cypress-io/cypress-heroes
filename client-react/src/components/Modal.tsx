import React, { useEffect, useState } from 'react';
import './Modal.scss';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  component: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, component }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(open);
  }, [open]);

  if (!open) {
    return null;
  }

  const close = () => {
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 150);
  };

  return (
    <div>
      <div
        className={`${
          showModal ? 'open' : ''
        } modal-container fixed flex flex-col justify-center items-center top-0 left-0 insert-0 overflow-y-auto h-full w-full`}
        onMouseDown={close}
      >
        <div
          className={`${
            showModal ? 'open' : ''
          } modal p-8 border shadow-lg rounded-md bg-white relative`}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {component}
        </div>
      </div>
    </div>
  );
};

export default Modal;
