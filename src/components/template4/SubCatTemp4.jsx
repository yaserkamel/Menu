import search from "../../assets/icon _search outline_.png";
import vector2 from "../../assets/Vector (1).png";
import facebook from "../../assets/pngegg.png";
import insta from "../../assets/insta.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { AdminContext } from "../../context/AdminProvider";
import ellip from "../../assets/Ellipse 27.png";
import { CategoriesContext } from "../../context/CategoriesProvider";
import axios from "axios";
import rec from "../../assets/Rectangle 11.png";
import Slider from "react-slick";
import { Dropdown, Form, Modal } from "react-bootstrap";
import vector from "../../assets/Vector.png";
import searchIcon from "../../assets/_search outline.png";
import Pagination from "../template1/Pagination";
import { LanguageContext } from "../../context/LanguageProvider";
import WhatssappIcon from "../utility/WhatssappIcon";
import { useMediaQuery } from "@uidotdev/usehooks";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";

const SubCatTemp4 = () => {
  const { adminDetails, updateUsername } = useContext(AdminContext);
  const { categories, setCategories, pageCount } =
    useContext(CategoriesContext);
  const { language, toggleLanguage } = useContext(LanguageContext);
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const [subCat, setSubCat] = useState([]);
  const { id } = useParams();
  const { username } = useParams();
  const handleUpdateUsername = () => {
    updateUsername(username);
  };
  useEffect(() => {
    handleUpdateUsername();
  }, []);
  const navigate = useNavigate();
  const handleClick = (id2) => {
    navigate(`/${username}/template/4/category/${id}/sub-category/${id2}`);
  };
  const pageCountSub = useRef();
  const [searchWord, setSearchWord] = useState("");
  const [showModal, setShowModal] = useState(false);

  const onChangeSearch = (e) => {
    setSearchWord(e.target.value);
  };
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    async function getProduct(word) {
      try {
        const config = {
          headers: {
            language: language,
          },
        };
        const response = await axios.get(
          `https://menurating-back.levantsy.com/user_api/show_master_categories?masterId=${id}&search=${word}`,
          config
        );
        console.log(response);
        setSubCat(response.data.data);
      } catch (e) {
        console.log(e);
      }
    }
    setTimeout(() => {
      getProduct(searchWord);
    }, 1000);
  }, [searchWord, language, id]);

  useEffect(() => {
    async function getSubCat() {
      try {
        const config = {
          headers: {
            language: language,
          },
        };
        const response = await axios.get(
          `https://menurating-back.levantsy.com/user_api/show_master_categories?masterId=${id}`,
          config
        );
        console.log(response.data.data);
        pageCountSub.current = response.data.last_page;
        setSubCat(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getSubCat();
  }, [language]);

  const onPress = async (page) => {
    const config = {
      headers: {
        language: language,
      },
    };
    const response = await axios.get(
      `https://menurating-back.levantsy.com/user_api/show_master_categories?masterId=${id}&page=${page}`,
      config
    );
    // console.log(response.data.data);
    setSubCat(response.data.data);
  };

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
                  <FaFacebookF
                    color="white"
                    style={{
                      width: "25px",
                      height: "25px",
                      borderRadius: "50%",
                    }}
                  />
                </Dropdown.Item>
              )}

              {adminDetails?.instagram_url && (
                <Dropdown.Item
                  href={adminDetails?.instagram_url}
                  target="_blank"
                  className="dorp_down_item"
                >
                  <AiOutlineInstagram
                    className=""
                    color="white"
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                    }}
                  />
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
        {
          // <div
          //   className="left_section_temp4"
          //   style={{ background: `#${adminDetails.color &&adminDetails?.color.substring(10,16)}` }}
          // >
          //   {categories?.slice(0, 5).map((cat) => {
          //     return (
          //       <Link
          //         to={`${
          //           cat.is_sub === 1
          //             ? `/${username}/template/4/category/${cat.id}`
          //             : `/${username}/template/4/category/${cat.id}/sub-category/0`
          //         }`}
          //         key={cat.id}
          //       >
          //         <p className="text-capitalize text-dark">{cat.name}</p>
          //       </Link>
          //     );
          //   })}
          // </div>
        }

        <div className="offers_temp4" style={{ paddingTop: "20px" }}>
          {subCat.map((sub) => {
            return (
              <div
                className=" offer_temp4_sub"
                key={sub.id}
                onClick={() => handleClick(sub.id)}
                style={{
                  background: `#${
                    adminDetails.color && adminDetails?.color.substring(10, 16)
                  }`,
                }}
              >
                <img
                  src={`https://menurating-back.levantsy.com/storage${sub.image_url}`}
                  alt=""
                />
                <h5 className="text-white text-break text-center p-2">
                  {sub.name}
                </h5>
              </div>
            );
          })}
        </div>

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
      <div
        className="bottom_section_categories_temp4"
        style={{
          background: `#${
            adminDetails.color && adminDetails?.color.substring(10, 16)
          }`,
        }}
      >
        {categories?.slice(0, isSmallDevice ? 3 : 7).map((cat) => {
          return (
            <Link
              to={`${
                cat.is_sub === 1
                  ? `/${username}/template/4/category/${cat.id}`
                  : `/${username}/template/4/category/${cat.id}/sub-category/0`
              }`}
              key={cat.id}
              className="d-flex flex-column align-items-center"
            >
              <img
                src={`https://menurating-back.levantsy.com/storage${cat.image_url}`}
                alt=""
              />
              <p className="text-capitalize text-white text-center text-truncate">{cat.name}</p>
            </Link>
          );
        })}
        <Link to={`/${username}/template/4/home`} className="align-self-end">
          {" "}
          <p className="text-capitalize text-white text-center">
            {language === "en" ? "More..." : "المزيد"}
          </p>
        </Link>
      </div>
      {pageCountSub.current > 1 ? (
        <div className="mb-2">
          <Pagination pageCount={pageCountSub.current} onPress={onPress} />
        </div>
      ) : null}
    </div>
  );
};

export default SubCatTemp4;
