export const fetchEmails = async () => {
    const response = await fetch("https://flipkart-email-mock.now.sh/");
    const data = await response.json();
    return data.list.map((email) => ({
      ...email,
      read: false,
      favorite: false,
    }));
  };
  
  export const fetchEmailBody = async (id) => {
    const response = await fetch(`https://flipkart-email-mock.now.sh/?id=${id}`);
    const data = await response.json();
    return data;
  };
  