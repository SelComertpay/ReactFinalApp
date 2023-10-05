import React from "react";
import "./ShowUp2.css";

export function Popup2(props) {
  return props.trigger ? (
    <div className="popup2">
      <div className="popup2-inner">
        <button
          className="close-button2"
          onClick={() => props.setTrigger(false)}
        >
          Close
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}