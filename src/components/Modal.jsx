import { GoXCircle } from "react-icons/go";

function Modal({ title, children, onOpen,open }) {
    if(!open) return null
  return (
    <div>
      <div className="backdrop" onClick={() => onOpen(false)}></div>
      <div className="modal">
        <div className="modal__header">
          <h2 className="title">{title}</h2>
          <button onClick={() => onOpen(false)}>
            <GoXCircle className="icon" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
