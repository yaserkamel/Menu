import { useContext, useEffect, useRef, useState } from "react";
import { AdminContext } from "../../context/AdminProvider";
import rec1 from "../../assets/Rectangle 74.png";
import rec2 from "../../assets/Rectangle 6.png";
import rec3 from "../../assets/Rectangle 11.png";
import search from "../../assets/icon _search outline_.png";
import { Link, useParams } from "react-router-dom";
import AdvertismentSlider from "../template1/AdvertismentSlider";
import CategoriesContainer from "./CategoriesContainer";
import { CategoriesContext } from "../../context/CategoriesProvider";
import axios from "axios";
import Slider from "react-slick";
import vector from "../../assets/Vector.png";

import { Dropdown, Form, Modal } from "react-bootstrap";
import searchIcon from "../../assets/_search outline.png";
import Pagination from "../template1/Pagination";
import facebook from "../../assets/face 1.png";
import insta from "../../assets/insta 1.png";
import { LanguageContext } from "../../context/LanguageProvider";
import NavBarrr from "../utility/NavBarrr";
import WhatssappIcon from "../utility/WhatssappIcon";

const SubCatTemp2 = () => {
  const { adminDetails, updateUsername } = useContext(AdminContext);
  const { categories, setCategories, pageCount } =
    useContext(CategoriesContext);
  const { language, toggleLanguage } = useContext(LanguageContext);

  const [subCat, setSubCat] = useState([]);
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const pageCountSub = useRef();

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const onChangeSearch = (e) => {
    setSearchWord(e.target.value);
  };
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
        // console.log(response.data.data);
        pageCountSub.current = response.data.last_page;
        setSubCat(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getSubCat();
    handleUpdateUsername();
  }, [id]);

  const { username } = useParams();
  const handleUpdateUsername = () => {
    updateUsername(username);
  };
  useEffect(() => {}, []);

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
        // console.log(response);
        setSubCat(response.data.data);
      } catch (e) {
        console.log(e);
      }
    }
    setTimeout(() => {
      getProduct(searchWord);
    }, 1000);
  }, [searchWord, language]);

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

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: subCat.length < 5 ? subCat.length : 5,
    slidesToScroll: 5,
    autoplay: false,
    autoplaySpeed: 2000,
    waitForAnimate: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          rows: subCat.length < 3 ? 1 : subCat.length < 4 ? 2 : 3,
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  return (
    <div style={{ minHeight: "100vh", display: "" }}>
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
      <div className="banner" style={{ width: "100%", marginLeft: "auto" }}>
        <Link to={`https://menurating-back.levantsy.com/storage${adminDetails.cover}`}>
          <img
            src={`https://menurating-back.levantsy.com/storage${adminDetails.cover}`}
            alt="ar"
            style={{ minWidth: "310px", minHeight: "200px" }}
          />
        </Link>

        <div
          className="d-flex"
          style={{
            flexDirection: language === "en" ? "row" : "row-reverse",
          }}
        >
          <div
            className="left_section mt-1 py-5"
            style={{ background: `#${adminDetails.color &&adminDetails?.color.substring(10,16)}` }}
          >
            {categories?.slice(0, 5).map((cat) => {
              return (
                <Link
                  to={`${
                    cat.is_sub === 1
                      ? `/${username}/template/2/category/${cat.id}`
                      : `/${username}/template/2/category/${cat.id}/sub-category/0`
                  }`}
                  key={cat.id}
                >
                  <p className="text-capitalize m-4">{cat.name}</p>
                </Link>
              );
            })}
            <Link to={`/${username}/template/2/categories`}>
            <p className="text-capitalize">{language === 'en' ? 'More' : 'المزيد'}</p></Link>
          </div>

          <div className="right">
            <div className="categories">
              <Slider {...settings}>
                {subCat.length >= 1 ? (
                  subCat.map((sub) => {
                    return (
                      <Link
                        to={`/${username}/template/2/category/${id}/sub-category/${sub.id}`}
                        key={sub.id}
                      >
                        <div className="category mb-2">
                          <img
                            src={`https://menurating-back.levantsy.com/storage${sub.image_url}`}
                            alt="category"
                            className="template2 ml-0 mr-0 p-0"
                          />
                          <p className="template2_paragraph">{sub.name}</p>
                        </div>
                      </Link>
                    );
                  })
                ) : (
                  <h5 className="mt-5"></h5>
                )}
              </Slider>
            </div>
            {pageCountSub.current > 1 ? (
              <div className="pt-3">
                <Pagination
                  pageCount={pageCountSub.current}
                  onPress={onPress}
                />
              </div>
            ) : null}
          </div>
        </div>
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
            style={{ textAlign: language === "en" ? "" : "right" }}
          />
        </Form>
      </Modal>
    </div>
  );
};

export default SubCatTemp2;
