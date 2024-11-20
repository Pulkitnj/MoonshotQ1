import React, { useState } from "react";

const EmailList = ({ emails, onEmailClick, selectedEmail }) => {
  const isExpanded = !selectedEmail; // 100% width if no email is selected, otherwise 30%.

  return (
    <div
      className="email-list"
      style={{
        width: isExpanded ? "100%" : "30%",
      }}
    >
      {emails.map((email) => (
        <div
          key={email.id}
          className={`email-item ${email.read ? "read" : "unread"}`}
          onClick={() => onEmailClick(email)}
        >
          <div className="email-item-content">
            <div className="avatar"> {email.from.name.charAt(0)}</div>
            <div className="details">
              <div className="from">From: {email.from.name}</div>
              <div className="subject">Subject: {email.subject}</div>
              <div className="snippet">{email.short_description}</div>
              <div className="favdate">
                <div className="date">{email.date}</div>
                <div>{email.favorite ? "❤️ Favorite" : "♡ Favorite"}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmailList;
