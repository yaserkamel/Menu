import axios from "axios";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { AdminContext } from "./AdminProvider";
import { LanguageContext } from "./LanguageProvider";

export const CategoriesContext = createContext();

const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const { adminDetails, updateUsername } = useContext(AdminContext);
  const { language, toggleLanguage } = useContext(LanguageContext);

  const pageCount = useRef();
  const test = () => {
    console.log("from context file ....");
  };
  // console.log(adminDetails);

  useEffect(() => {
    async function getCategories() {
      try {
        const config = {
          headers: {
            language: language,
          },
        };
        const response = await axios.get(
          `https://menurating-back.levantsy.com/user_api/show_admin_categories?adminId=${adminDetails.id}&page=1`,
          config
        );
        // console.log(response);
        pageCount.current = response.data.last_page;
        setCategories(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    if (adminDetails && Object.keys(adminDetails).length > 0) { 
      getCategories();
    }
  }, [adminDetails, language]);

  return (
    <CategoriesContext.Provider
      value={{ categories, setCategories, pageCount, test }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesProvider;
