import React, { useRef, useEffect } from "react";

const Modal = ({ children, isOpen, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); // Close the modal if the click is outside the modal content
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded shadow-lg w-96 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

const Header = ({ children }) => (
  <div className="mb-4 text-xl font-semibold border-b pb-2">{children}</div>
);

const Body = ({ children }) => (
  <div className="mb-4 text-gray-700">{children}</div>
);

const Footer = ({ children }) => (
  <div className="pt-4 border-t flex justify-end gap-2">{children}</div>
);

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
