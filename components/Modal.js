import styles from '@/styles/Modal.module.css';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ show, onClose, children, title }) => {
  const [isBrowser, isBrowserSet] = useState(false);

  useEffect(() => isBrowserSet(true), []);

  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <a href="#" onClick={handleClose}>
            <FaTimes />
          </a>
        </div>
        {title && <div>{title}</div>}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  ) : null;

  return isBrowser ? ReactDOM.createPortal(modalContent, document.getElementById('modal-root')) : null;
};

export default Modal;
