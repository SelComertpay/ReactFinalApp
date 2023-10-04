import React from "react";
import "./Popup.css";
import { CreateEventForm } from "../Form/CreateEventForm";

export function Popup(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button
          className="close-button"
          onClick={() => props.setTrigger(false)}
        >
          Close
        </button>
        {props.children}
        <CreateEventForm />
      </div>
    </div>
  ) : (
    ""
  );
}