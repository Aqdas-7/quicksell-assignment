import React from "react";
import "./Ticket.css";
import {
  MdFiberManualRecord,
  MdAccountCircle,
  MdCheckCircleOutline,
  MdEmail,
} from "react-icons/md";

function Ticket({ ticket }) {
  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  return (
    <div className="ticket-main">
      <div className="ticket-header">
        <div className="ticket-id">{ticket.id}</div>
        {/* Increase the size of MdAccountCircle */}
        <MdAccountCircle style={{ fontSize: "18px", color: "gray" }} />
      </div>
      <div className="ticket-content">
        <div className="ticket-content-title">
          {/* Set consistent size for MdCheckCircleOutline */}
          <MdCheckCircleOutline
            style={{ fontSize: "14px", color: "#5D3FD3" }}
          />
          <div className="ticket-title">
            <b>{truncateText(ticket.title, 8)}</b>
          </div>
        </div>
      </div>
      <div className="ticket-metadata">
        <div className="ticket-tags">
          <div className="ticket-tag">
            <MdEmail style={{ fontSize: "14px", color: "#535353" }} />
          </div>
          {ticket.tag.map((tag, key) => {
            return (
              <div key={key} className="ticket-tag">
                <MdFiberManualRecord
                  style={{ fontSize: "14px", color: "gray" }}
                />
                <div>{tag}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Ticket;
