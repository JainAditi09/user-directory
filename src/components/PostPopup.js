import React from "react";
import "./popup.css";

const PostPopup = ({ content, title, onClose }) => {
  const hidePopup = () => {
    onClose();
  };

  const handlePopupClick = (e) => {
    // Prevent the click inside the popup from closing it
    e.stopPropagation();
  };

  return (
    <div>
      <div className="popup-overlay" onClick={hidePopup}>
        <div className="popup-content" onClick={handlePopupClick}>
          <span className="close-button" onClick={hidePopup}>
            &times;
          </span>
          <h1>{title || ""}</h1>
          <p>{content || ""}</p>
        </div>
      </div>
    </div>
  );
};

export default PostPopup;
