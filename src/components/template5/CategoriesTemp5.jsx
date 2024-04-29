import search from "../../assets/icon _search outline_.png";
import vector2 from "../../assets/Vector (1).png";
import facebook from "../../assets/pngegg.png";
import insta from "../../assets/insta.png";
// import whatss from '../../assets/واتس.png'
import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminProvider";
import ellip from "../../assets/Ellipse 27.png";
import { CategoriesContext } from "../../context/CategoriesProvider";
import AdvertismentSlider from "../template1/AdvertismentSlider";
import CategoriesTemp4 from "../template4/CategoriesTemp4";
// import burger from "../../assets/burger food_.png";
// import pizza from "../../assets/pizza food 2_.png";
// import french from "../../assets/french fries kitchen.png";
// import soft from "../../assets/soft drinks_.png";
import CatContainer from "./CatContainer";
import { Dropdown, Form, Modal } from "react-bootstrap";
import vector from "../../assets/Vector.png";
import AdvTemp2 from "../template2/AdvTemp2";
import axios from "axios";
import { LanguageContext } from "../../context/LanguageProvider";
import WhatssappIcon from "../utility/WhatssappIcon";
import Cover from "../template1/Cover";
// import searchIcon from "../../assets/_search outline.png";

const CategoriesTemp5 = () => {
  const { adminDetails, updateUsername } = useContext(AdminContext);
  const [searchWord, setSearchWord] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const { categories, setCategories, pageCount } =
    useContext(CategoriesContext);
  const { language, toggleLanguage } = useContext(LanguageContext);
  const { username } = useParams();
  const handleUpdateUsername = () => {
    updateUsername(username);
  };
  const onChangeSearch = (e) => {
    setSearchWord(e.target.value);
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
        // console.log(response.data.data);
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
      <div
        className="bottom_section_temp4"
        style={{ flexDirection: language === "en" ? "row" : "row-reverse" }}
      >
        <div className="right_section_temp4">
          <div className="">
            {
              <AdvTemp2 num={1} />
              // <img src={rec1} alt="" />
              // <img src={rec1} alt="" />
              // <img src={rec1} alt="" />
            }
          </div>
          <div className="">{<CatContainer />}</div>
          <Modal
            show={showModal}
            onHide={handleClose}
            className="searchModal p-0"
          >
            <Form
              className="container-search"
              onSubmit={(e) => e.preventDefault()}
            >
              {
                // <img src={searchIcon} alt="searchIcon" className="searchIcon" />
              }
              <input
                value={searchWord}
                onChange={onChangeSearch}
                type=""
                lang="ar"
                placeholder=""
                className="form-search"
                style={{ textAlign: language === "en" ? "" : "right" }}
              />
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CategoriesTemp5;
