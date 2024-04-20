import img1 from "../../assets/new.png";
import img2 from "../../assets/dsfsf 1.png";
// import instagram from "../assets/Instagram.png";
// import facebook from "../assets/facebook.png";
// import search from "../assets/search.png";

// import cake from "../assets/cupcake.png";
import searchIcon from "../../assets/_search outline.png";
// import { Link } from "react-router-dom";
import { Dropdown, Form, Modal } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
// import ImageSlider from "./ImageSlider";
// import coffe from '../assets/coffee cup.png'

// import { SliderData } from "./SliderData ";
import AdvertismentSlider from "./AdvertismentSlider";
import CategoriesSlider from "./CategoriesSlider";
import NavBarMenu from "./NavBarMenu";
import { Link, useParams } from "react-router-dom";

import logo2 from "../../assets/dsfsf 3.png";
import search from "../../assets/icon _search outline_.png";
import vector from "../../assets/Vector.png";
import vector2 from "../../assets/Vector (1).png";
import facebook from "../../assets/pngegg.png";
import insta from "../../assets/insta.png";
import { AdminContext } from "../../context/AdminProvider";
import { CategoriesContext } from "../../context/CategoriesProvider";
import { LanguageContext } from "../../context/LanguageProvider";
import WhatssappIcon from "../utility/WhatssappIcon";

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const { adminDetails, updateUsername } = useContext(AdminContext);
  // const [data, setData] = useState("");

  const [searchWord, setSearchWord] = useState("");
  const { categories, setCategories, pageCount } =
    useContext(CategoriesContext);
  const { language, toggleLanguage } = useContext(LanguageContext);

  const { username } = useParams();

  const handleUpdateUsername = () => {
    updateUsername(username);
  };
  useEffect(() => {
    handleUpdateUsername();
  }, []);
  const onChangeSearch = (e) => {
    setSearchWord(e.target.value);
  };
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    // async function getUser() {
    //   try {
    //     const response = await axios.get(
    //       "https://menurating-back.levantsy.com/user_api/show_admin?adminId=1"
    //     );
    //     console.log(response.data.data);
    //     // console.log(response.data.data.facebook_url);
    //     setData(response.data.data);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
    // getUser();
  }, []);

  useEffect(() => {
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
        // console.log(response);
        setCategories(response.data.data);
      } catch (e) {
        console.log(e);
      }
    }
    setTimeout(() => {
      if (Object.keys(adminDetails).length > 0) {
      getProduct(searchWord);
      }
    }, 1000);
  }, [searchWord, adminDetails]);

  // console.log(adminDetails.color);

  return (
    <div style={{ height: "100vh" }}>
      <nav
        className="nav_bar_menu px-3"
        style={{
          backgroundColor: `#${adminDetails.color &&adminDetails?.color.substring(10,16)}`,
          flexDirection: language === "en" ? "row-reverse" : "row",
        }}
      >
        <div
          className="nav_bar_menu_left"
          style={{ flexDirection: language === "en" ? "row-reverse" : "row" }}
        >
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
                href=""
                target="_blank"
                className="dorp_down_item "
              >
                <p
                  className="bg-white rounded-circle mx-2 p-1"
                  onClick={toggleLanguage}
                >
                  {language === "en" ? "Ar" : "En"}
                </p>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Link to="">
            <img src={search} alt="" onClick={handleShow} />
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
      <div className="banner">
        {
          <Link
            to={`https://menurating-back.levantsy.com/storage${adminDetails.cover}`}
          >
            <img
              src={`https://menurating-back.levantsy.com/storage${adminDetails.cover}`}
              alt="ar"
            />
          </Link>
          // <img src={img1} alt="ar" />
        }
      </div>

      {
        // <div className="social_links">
        //   <img
        //     className="search"
        //     src={search}
        //     alt="search"
        //     onClick={handleShow}
        //   />
        //   <a href={`${data.facebook_url}`}>
        //     <img src={facebook} alt="facebook" />
        //   </a>
        //   <a href={`/${data.instagram_url || ""}`}>
        //     <img src={instagram} alt="instagram" />
        //   </a>
        // </div>
      }

      <div className="" style={{ height: "" }}>
        {<AdvertismentSlider num={1} />}
      </div>
      <div className="" style={{ height: "" }}>
        <CategoriesSlider username={username} />
      </div>

      <Modal show={showModal} onHide={handleClose} className="searchModal p-0">
        <Form className="container-search" onSubmit={handleSubmit}>
          {
            // <img src={searchIcon} alt="searchIcon" className="searchIcon" />
          }
          <input
            value={searchWord}
            onChange={onChangeSearch}
            type="text"
            lang="ar"
            placeholder=""
            className="form-search"
            style={{textAlign: language === 'en' ? '' : 'right'}}
          />
        </Form>
      </Modal>
    </div>
  );
}
