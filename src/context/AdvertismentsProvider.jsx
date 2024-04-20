import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AdminContext } from "./AdminProvider";

export const AdvertismentsContext = createContext();

const AdvertismentsProvidr = ({ children }) => {
  const [advertisments, setAdvertisments] = useState([]);
  const { adminDetails, updateUsername } = useContext(AdminContext);

  // console.log(adminDetails);
  // const handleUpdateUsername = () => {
  //   updateUsername('username');
  // };
  // useEffect(() => {
  //   handleUpdateUsername();
  // }, []);
  useEffect(() => {
    async function getAdvertisments() {
      try {
        const response = await axios.get(
          `https://menurating-back.levantsy.com/user_api/show_advertisements?adminId=${adminDetails?.id}`
        );
        // console.log(response);
        setAdvertisments(response.data.data);
      } catch (error) {
        // console.error(error);
      }
    }
    if (adminDetails && Object.keys(adminDetails).length > 0) { 
      getAdvertisments();
    }
  }, [adminDetails]);

  return (
    <AdvertismentsContext.Provider value={{ advertisments }}>
      {children}
    </AdvertismentsContext.Provider>
  );
};

export default AdvertismentsProvidr;
