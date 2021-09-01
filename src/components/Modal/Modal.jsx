import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ src, onClose }) {

  const handleKeyDownClick = useCallback(
    (e) => { 
      if(e.code === 'Escape') {
        onClose('');
      }
    },
    [onClose],
  );
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDownClick);
    return () => window.removeEventListener('keydown', handleKeyDownClick);   
  }, [handleKeyDownClick]);
  

  const handleBackdropClick = e => {
    if(e.currentTarget === e.target) {
      onClose('');
    }
  };

  return createPortal(
    <div className="Overlay" onClick={handleBackdropClick}>
      <div className="Modal">
        <img src={src} alt="" />
      </div>
    </div>,
    modalRoot);   
};

