import { useEffect } from 'react';
import PropTypes from 'prop-types';
import disableScroll from 'disable-scroll';
import './Modal.css';

export const Modal = ({ alt, src, closeModal }) => {
  const closeModalWindow = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };
  const windowEventListner = e => {
    if (e.key === 'Escape') {
        closeModal();
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', windowEventListner);
    disableScroll.on();
    return () => {
      window.removeEventListener('keydown', windowEventListner);
      disableScroll.off();
    };
  });

  return (
    <div className="Overlay" onClick={closeModalWindow}>
      <div className="Modal">
        <img src={src} alt={alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
