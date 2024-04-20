import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [adminDetails, setAdminDetails] = useState([]);

  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  const updateUsername = (newUsername) => {
    setUsername(newUsername);
  };

  useEffect(() => {
    async function getAdminDetails() {
      try {
        setLoading(true)
        const response = await axios.get(
          `https://menurating-back.levantsy.com/user_api/show_admin_by_name?adminName=${username}`
        );
        // console.log(response.data.data);
        setAdminDetails(response.data.data);
        setLoading(false)
      } catch (error) {
        console.error(error);
        setLoading(false)
      }
    }
    // if(username){
    //   getAdminDetails();
    // }
    if(username) {

      getAdminDetails();
    }
  }, [username]);
  return (
    <AdminContext.Provider value={{ adminDetails, updateUsername, loading}}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
