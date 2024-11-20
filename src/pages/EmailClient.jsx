import React, { useState, useEffect } from "react";
import EmailList from "../components/EmailList";
import EmailBody from "../components/EmailBody";
import { fetchEmails } from "../services/emailService";

const EmailClient = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchEmails().then((data) =>
      setEmails(
        data.map((email) => ({
          ...email,
          read: false, // Initialize read state
          favorite: false, // Initialize favorite state
        }))
      )
    );
  }, []);

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
    // Mark email as read when clicked
    setEmails((prevEmails) =>
      prevEmails.map((e) =>
        e.id === email.id ? { ...e, read: true } : e
      )
    );
  };

  const toggleFavorite = (emailId) => {
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        email.id === emailId ? { ...email, favorite: !email.favorite } : email
      )
    );
  };

  const filteredEmails = emails.filter((email) => {
    if (filter === "favorites") return email.favorite;
    if (filter === "read") return email.read;
    if (filter === "unread") return !email.read;
    return true;
  });

  return (
    <div className="email-client">
      <div className="header">
        <div className="filter">Filter: </div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("unread")}>Unread</button>
        <button onClick={() => setFilter("read")}>Read</button>
        <button onClick={() => setFilter("favorites")}>Favorites</button>
      </div>
      <div className="content">
        <EmailList
          emails={filteredEmails}
          onEmailClick={handleEmailClick}
          selectedEmail={selectedEmail}
        />
        {selectedEmail && (
          <EmailBody email={selectedEmail} onToggleFavorite={toggleFavorite} />
        )}
      </div>
    </div>
  );
};

export default EmailClient;