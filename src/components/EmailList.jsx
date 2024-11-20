import React, { useState } from "react";

const EmailList = ({ emails, onEmailClick, selectedEmail }) => {
  const isExpanded = !selectedEmail;
  const [page, setPage] = useState(1);
  const PageHandler = (page) => {
    setPage(page);
  };

  return (
    <div
      className="email-list"
      style={{
        width: isExpanded ? "100%" : "30%",
      }}
    >
      {emails.slice(page*10-10,page*10).map((email) => (
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
      {emails.length > 0 && (
        <div className="pagination-container">
          <div className="pagination">
            <span 
              className={page > 1 ? "pagination__button" : "pagination__button pagination__disable"}
              onClick={() => {
                if (page > 1) setPage(page - 1);
              }}>◀</span>
            {[...Array(Math.ceil(emails.length / 10))].map((_, index) => {
              return (
                <span
                  className={page === index + 1 ? "pagination__button pagination__selected" : "pagination__button"}
                  key={index}
                  onClick={() => PageHandler(index + 1)}
                >
                  {index + 1}
                </span>
              );
            })}
            <span 
              className={page < Math.ceil(emails.length / 10) ? "pagination__button" : "pagination__button pagination__disable"}
              onClick={() => {
                if (page < Math.ceil(emails.length / 10)) setPage(page + 1);
              }}>▶</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailList;
