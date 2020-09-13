import React from "react";
import "./Message.css";

function Message() {
  return (
    <div className="message">
      <div className="message__name">
        <p>Patrick Wehbe</p>
      </div>
      <div className="message__content">
        Hello There
        <span className="message__timestamp">{new Date().toUTCString()}</span>
      </div>
    </div>
  );
}

export default Message;
