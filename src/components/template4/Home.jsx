import search from "../../assets/icon _search outline_.png";
import vector2 from "../../assets/Vector (1).png";
import facebook from "../../assets/pngegg.png";
import insta from "../../assets/insta.png";
import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminProvider";
import ellip from "../../assets/Ellipse 27.png";
import { CategoriesContext } from "../../context/CategoriesProvider";
import AdvertismentSlider from "../template1/AdvertismentSlider";
import CategoriesTemp4 from "./CategoriesTemp4";
import { Dropdown, Form, Modal } from "react-bootstrap";
import vector from "../../assets/Vector.png";
import searchIcon from "../../assets/_search outline.png";
import axios from "axios";
import AdvTemp2 from "../template2/AdvTemp2";
import { LanguageContext } from "../../context/LanguageProvider";
// import whatss from '../../assets/pngwing.com (1).png'
// import { FaWhatsapp } from "react-icons/fa"
import WhatssappIcon from "../utility/WhatssappIcon";
import Cover from "../template1/Cover";

const Home = () => {
  const { adminDetails, updateUsername } = useContext(AdminContext);
  const { categories, setCategories, pageCount } =
    useContext(CategoriesContext);
  const [searchWord, setSearchWord] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { language, toggleLanguage } = useContext(LanguageContext);
  const onChangeSearch = (e) => {
    setSearchWord(e.target.value);
  };
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const { username } = useParams();
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
            adminDetails.color && adminDetails.color.substring(10, 16)
          }`,
          flexDirection: language === "en" ? "row-reverse" : "row",
        }}
      >
        <div
          className="nav_bar_menu_left"
          style={{
            flexDirection: language === "en" ? "row-reverse" : "row",
          }}
        >
          <Dropdown>
            <Dropdown.Toggle variant="" id="dropdown-basic">
              <img src={vector} alt="" />
            </Dropdown.Toggle>
            <Dropdown.Menu
              className="drop_down"
              style={{
                backgroundColor: `#${
                  adminDetails.color &&
                  adminDetails.color &&
                  adminDetails?.color.substring(10, 16)
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
                  <img src={insta} alt="" className="" />
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

        <div className="nav_bar_menu_right">
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
        //       to={`https://menurating-back.levantsy.com/storage${adminDetails.cover}`}
        //     >
        //       <img
        //         src={`https://menurating-back.levantsy.com/storage${adminDetails.cover}`}
        //         alt="ar"
        //       />
        //     </Link>
        //     // <img src={img1} alt="ar" />
        //   }
        // </div>
      }
      <div
        className="bottom_section_temp4"
        style={{ flexDirection: language === "en" ? "row" : "row-reverse" }}
      >
        {
          //  <div className="left_section_temp4" style={{background: `#${adminDetails.color &&adminDetails?.color.substring(10,16)}`}}>
          // {categories?.slice(0, 5).map((cat) => {
          //   return (
          //     <Link
          //       to={`${
          //         cat.is_sub === 1
          //           ? `/${username}/template/4/category/${cat.id}`
          //           : `/${username}/template/4/category/${cat.id}/sub-category/0`
          //       }`}
          //       key={cat.id}
          //     >
          //       <p className="text-capitalize text-dark">{cat.name}</p>
          //     </Link>
          //   );
          // })}
          // </div>
        }
        <div className="right_section_temp4 w-100 ">
          <div className=" ">
            {
              <AdvTemp2 num={1} />
              // <img src={rec1} alt="" />
              // <img src={rec1} alt="" />
              // <img src={rec1} alt="" />
            }
          </div>
          <div className="">
            {
              <CategoriesTemp4 username={username} />
              // <div className="offer_temp4">
              //   <img src={rec1} alt="" />
              //   <p>Offer</p>
              // </div>
              // <div className="offer_temp4">
              //   <img src={rec1} alt="" />
              //   <p>Offer</p>
              // </div>
              // <div className="offer_temp4">
              //   <img src={rec1} alt="" />
              //   <p>Offer</p>
              // </div>
              // <div className="offer_temp4">
              //   <img src={rec1} alt="" />
              //   <p>Offer</p>
              // </div>
            }
            <Modal
              show={showModal}
              onHide={handleClose}
              className="searchModal p-0"
            >
              <Form
                className="container-search"
                onSubmit={(e) => e.preventDefault()}
              >
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
    </div>
  );
};

export default Home;
