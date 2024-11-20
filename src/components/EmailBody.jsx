import React, { useEffect, useState } from "react";
import { fetchEmailBody } from "../services/emailService";

const EmailBody = ({ email, onToggleFavorite }) => {
  const [body, setBody] = useState("");

  useEffect(() => {
    fetchEmailBody(email.id).then((data) => setBody(data.body));
  }, [email]);

  return (
    <div className="email-body">
      <h2>{email.subject}</h2>
      <p>{body}</p>
      <button onClick={() => onToggleFavorite(email.id)}>
        {email.favorite ? "Unmark Favorite" : "Mark as Favorite"}
      </button>
    </div>
  );
};

export default EmailBody;
