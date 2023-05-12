function InfoTooltip(props) {
  return (
    <div className={`popup popup_tool ${props.isOpen && "popup_opened"}`}>
      <div className="popup__container">
      <button className="popup__close" type="button" onClick={props.onClose}></button>
      <img src={props.icon} className="popup__tool-logo-status" />
      <h2 className="popup__title">{props.title}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;