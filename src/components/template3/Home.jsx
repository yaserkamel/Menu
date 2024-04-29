import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminProvider";
import search from "../../assets/icon _search outline_.png";
import vector from "../../assets/Vector.png";
import vector2 from "../../assets/Vector (1).png";
import facebook from "../../assets/pngegg.png";
import insta from "../../assets/insta.png";
import searchIcon from "../../assets/_search outline.png";
import { Link, useParams } from "react-router-dom";
import AdvertismentSlider from "../template1/AdvertismentSlider";
import CategoriesSection from "./CategoriesSection";
import { Dropdown, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { CategoriesContext } from "../../context/CategoriesProvider";
import { LanguageContext } from "../../context/LanguageProvider";
import WhatssappIcon from "../utility/WhatssappIcon";
import Cover from "../template1/Cover";

const Home = () => {
  const { adminDetails ,updateUsername} = useContext(AdminContext);
  const [searchWord, setSearchWord] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { categories, setCategories, pageCount } = useContext(CategoriesContext);
  const { language, toggleLanguage } = useContext(LanguageContext);


  const { username } = useParams();
  const handleUpdateUsername = () => {
    updateUsername(username);
  };
  useEffect(() => {
    handleUpdateUsername();
  }, []);
  

  const onChangeSearch=(e)=>{
    setSearchWord(e.target.value)
  }
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(()=>{
    async function getProduct(word) {
      try {
        const config = {
          headers: {
            language: language,
          },
        };
        const response = await axios.get(
          `https://menurating-back.levantsy.com/user_api/show_admin_categories?adminId=${adminDetails?.id}&search=${word}`,
          config
        );
        console.log(response)
        setCategories(response.data.data)
      }catch(e) {
        console.log(e)
      }
    }
    setTimeout(() => {
      if (Object.keys(adminDetails).length > 0) {
        getProduct(searchWord);
      }
    },1000);
 },[searchWord,adminDetails])
 
  return (
    <div style={{ height: "100vh", background: "" }}>
      <nav
        className="nav_bar_menu px-3"
        style={{
          backgroundColor: `#${adminDetails.color &&adminDetails?.color.substring(10,16)}`,
          flexDirection: language === 'en' ? 'row-reverse' : 'row'
        }}
      >
        <div className="nav_bar_menu_left" style={{flexDirection:  language === 'en' ? 'row-reverse' : 'row'}}>
          <Dropdown>
            <Dropdown.Toggle variant="" id="dropdown-basic">
              <img src={vector} alt="" />
            </Dropdown.Toggle>
            <Dropdown.Menu
              className="drop_down"
              style={{ backgroundColor: `#${adminDetails.color &&adminDetails?.color.substring(10,16)}` }}
            >
            {
              adminDetails?.facebook_url && (
                <Dropdown.Item
                href={adminDetails?.facebook_url}
                target="_blank"
                className="dorp_down_item"
              >
                <img src={facebook} alt="" />
              </Dropdown.Item>
              )
            }
              
            {
              adminDetails?.instagram_url && (
                <Dropdown.Item
                href={adminDetails?.instagram_url}
                target="_blank"
                className="dorp_down_item"
              >
                <img src={insta} alt="" />
              </Dropdown.Item>
              )
            }
              
              <WhatssappIcon link={adminDetails.whatsapp_phone}/>
              <Dropdown.Item
              href=''
              target="_blank"
              className="dorp_down_item "
            >
              <p className='bg-white rounded-circle mx-2 p-1' onClick={toggleLanguage}>{language === 'en' ? 'Ar' : 'En'}</p>
            </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Link to="">
            <img src={search} alt="" onClick={handleShow}/>
          </Link>
        </div>

        <div to="" className="nav_bar_menu_right">
        <Link
        to={`/${username}`}
          >
          <img
            src={`https://menurating-back.levantsy.com/storage${adminDetails.logo}`}
            alt="logo"
          />
          </Link>
        </div>
      </nav>
      {

      <Cover/>
      // <div className="banner">
      //   {
      //     <Link
      //     to={`https://menurating-back.levantsy.com/storage${adminDetails.cover}`}
      //   >
      //     <img
      //       src={`https://menurating-back.levantsy.com/storage${adminDetails.cover}`}
      //       alt="ar"
      //     />
      //     </Link>
      //     // <img src={img1} alt="ar" />
      //   }
      // </div>
      }

      <div className="">
        <AdvertismentSlider num={1}/>
        <CategoriesSection username={username}/>
      </div>

      <Modal show={showModal} onHide={handleClose} className="searchModal p-0">
        <Form className="container-search" onSubmit={(e) => e.preventDefault()}>
          
          <input
            value={searchWord}
            onChange={onChangeSearch}
            type=""
            lang="ar"
            placeholder=""
            className="form-search"
            style={{textAlign: language === 'en' ? '' : 'right'}}
          />
        </Form>
      </Modal>
    </div>
  );
};

export default Home;
