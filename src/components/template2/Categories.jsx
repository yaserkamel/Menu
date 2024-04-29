import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminProvider";
import rec1 from "../../assets/Rectangle 74.png";
import rec2 from "../../assets/Rectangle 6.png";
import rec3 from "../../assets/Rectangle 11.png";
// import search from "../../assets/icon _search normal 1_.png";
import { Link, useParams } from "react-router-dom";
import AdvertismentSlider from "../template1/AdvertismentSlider";
import CategoriesSlider from "../template1/CategoriesSlider";
import CategoriesContainer from "./CategoriesContainer";
import { CategoriesContext } from "../../context/CategoriesProvider";
import { Dropdown, Form, Modal } from "react-bootstrap";
import searchIcon from "../../assets/_search outline.png";
import axios from "axios";
import AdvTemp2 from "./AdvTemp2";
import vector from "../../assets/Vector.png";
import facebook from "../../assets/pngegg.png";
import insta from "../../assets/insta.png";
import WhatssappIcon from "../utility/WhatssappIcon";
import search from "../../assets/icon _search outline_.png";
import { LanguageContext } from "../../context/LanguageProvider";
import Cover from "../template1/Cover";

const Categories = () => {
  const { adminDetails, updateUsername } = useContext(AdminContext);
  const { categories, setCategories, pageCount } =
    useContext(CategoriesContext);
  const { language, toggleLanguage } = useContext(LanguageContext);

  const [showModal, setShowModal] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const { username } = useParams();
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const onChangeSearch = (e) => {
    setSearchWord(e.target.value);
  };

  const handleUpdateUsername = () => {
    updateUsername(username);
  };
  useEffect(() => {
    handleUpdateUsername();
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
        console.log(response);
        pageCount.current = response.data.last_page;
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

  return (
    <div style={{ minHeight: "100vh" }}>
      <nav
        className="nav_bar_menu px-3"
        style={{
          backgroundColor: `#${
            adminDetails.color && adminDetails?.color.substring(10, 16)
          }`,
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
              style={{
                backgroundColor: `#${
                  adminDetails.color && adminDetails?.color.substring(10, 16)
                }`,
              }}
            >
              {adminDetails?.facebook_url && (
                <Dropdown.Item
                  href={adminDetails?.facebook_url}
                  target="_blank"
                  className="dorp_down_item"
                >
                  <img src={facebook} alt="" />
                </Dropdown.Item>
              )}

              {adminDetails?.instagram_url && (
                <Dropdown.Item
                  href={adminDetails?.instagram_url}
                  target="_blank"
                  className="dorp_down_item"
                >
                  <img src={insta} alt="" />
                </Dropdown.Item>
              )}

              <WhatssappIcon link={adminDetails.whatsapp_phone} />
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
          <Link to={`/${username}`}>
            <img
              src={`https://menurating-back.levantsy.com/storage${adminDetails.logo}`}
              alt="logo"
            />
          </Link>
        </div>
      </nav>

      {

        <Cover />
      // <div
      //   className="banner"
      //   // style={{ width: "calc(100%)", marginLeft: "auto" }}
      // >
      //   <Link
      //     to={`https://menurating-back.levantsy.com/storage${adminDetails.cover}`}
      //   >
      //     <img
      //       src={`https://menurating-back.levantsy.com/storage${adminDetails.cover}`}
      //       alt=""
      //       style={{ minWidth: "350px", minHeight: "200px" }}
      //     />
      //   </Link>
      // </div>
      }
      <div className="right pt-0">
        <div className="mt-3 mb-0">
          <AdvertismentSlider num={1} />
          {
            // <img src={rec3} alt="" />
            // <img src={rec3} alt="" />
            // <img src={rec3} alt="" />
          }
        </div>

        <div className="offers px-0">
          <CategoriesContainer username={username} />

          {
            //   <div className="offer">
            //   <Link to="/template/2/category/:id" className="">
            //     <img src={rec3} alt="" />
            //     <p>Offer</p>
            //   </Link>
            // </div>
            // <div className="offer">
            //   <Link to="/template/2/category/:id" className="">
            //     <img src={rec2} alt="" />
            //     <p>Offer</p>
            //   </Link>
            // </div>
            // <div className="offer">
            //   <Link to="/template/2/category/:id" className="">
            //     <img src={rec3} alt="" />
            //     <p>Offer</p>
            //   </Link>
            // </div>
            // <div className="offer">
            //   <Link to="/template/2/category/:id" className="">
            //     <img src={rec3} alt="" />
            //     <p>Offer</p>
            //   </Link>
            // </div>
          }

          <Modal
            show={showModal}
            onHide={handleClose}
            className="searchModal p-0 "
          >
            <Form
              className="container-search"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                value={searchWord}
                onChange={onChangeSearch}
                type=""
                placeholder=""
                className="form-search"
                style={{ textAlign: language === "en" ? "" : "right" }}
              />
            </Form>
          </Modal>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Categories;
