const getContacts = async () => {
    try {
      const response = await fetch('http://localhost:3001/contacts', {
        method: 'GET'
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  
  getContacts();
  