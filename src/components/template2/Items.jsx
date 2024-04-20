import { useContext, useEffect, useRef, useState } from "react";
import { AdminContext } from "../../context/AdminProvider";
import rec1 from "../../assets/Rectangle 74.png";
import rec2 from "../../assets/Rectangle 6.png";
import rec3 from "../../assets/Rectangle 11.png";
import search from "../../assets/icon _search outline_.png";
import cancel from "../../assets/Vectorrr.png";
import searchIcon from "../../assets/_search outline.png";
import { Dropdown, Form, Modal } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { CategoriesContext } from "../../context/CategoriesProvider";
import axios from "axios";
import Slider from "react-slick";
import Pagination from "../template1/Pagination";
import { LanguageContext } from "../../context/LanguageProvider";
import WhatssappIcon from "../utility/WhatssappIcon";
import facebook from "../../assets/pngegg.png";
import insta from "../../assets/insta.png";
import vector from "../../assets/Vector.png";

const Items = () => {
  const { adminDetails, updateUsername } = useContext(AdminContext);
  const { categories, setCategories, pageCount } =
    useContext(CategoriesContext);
  const { language, toggleLanguage } = useContext(LanguageContext);

  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalSearch, setShowModalSearch] = useState(false);
  const pageCountItems = useRef();
  const { id, id2 } = useParams();
  console.log(id);
  console.log(id2);
  const handleClose = () => setShowModal(null);
  const handleShow = (item) => setShowModal(item);

  const handleCloseSearch = () => setShowModalSearch(false);
  const handleShowSearch = () => setShowModalSearch(true);
  const [searchWord, setSearchWord] = useState("");
  const onChangeSearch = (e) => {
    setSearchWord(e.target.value);
  };
  const { username } = useParams();
  const handleUpdateUsername = () => {
    updateUsername(username);
  };
  useEffect(() => {
    handleUpdateUsername();
  }, []);

  const getItemById = (id) => {
    const parsedId = parseInt(id, 10); // Parse id to a number
    return categories?.find((item) => item.id === parsedId);
  };
  const selectedItem = getItemById(id);

  if (id2 === "0") {
    console.log("yes");
  }

  useEffect(() => {
    async function getItems() {
      try {
        const config = {
          headers: {
            language: language,
          },
        };
        const response = await axios.get(
          id2 === "0"
            ? `https://menurating-back.levantsy.com/user_api/show_items?masterId=${id}`
            : `https://menurating-back.levantsy.com/user_api/show_items?masterId=${id}&subId=${id2}`,
          config
        );
        console.log(response.data.data);
        pageCountItems.current = response.data.last_page;
        setItems(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getItems();
  }, [id]);
  useEffect(() => {
    async function getProduct(word) {
      try {
        const config = {
          headers: {
            language: language,
          },
        };
        const response = await axios.get(
          id2 === "0"
            ? `https://menurating-back.levantsy.com/user_api/show_items?masterId=${id}&search=${word}`
            : `https://menurating-back.levantsy.com/user_api/show_items?masterId=${id}&subId=${id2}&search=${word}`,
          config
        );
        console.log(response);
        setItems(response.data.data);
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
      id2 === "0"
        ? `https://menurating-back.levantsy.com/user_api/show_items?masterId=${id}&page=${page}`
        : `https://menurating-back.levantsy.com/user_api/show_items?masterId=${id}&subId=${id2}&page=${page}`,
      config
    );
    setItems(response.data.data);
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: false,
    autoplaySpeed: 2000,
    waitForAnimate: true,
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
          rows: 2,
          // slidesPerRow: 2,
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
            <img src={search} alt="" onClick={handleShowSearch} />
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
      <div
        className="banner"
        style={{ width: "calc(100%)", marginLeft: "auto" }}
      >
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
            className="left_section py-5 mt-1"
            style={{ background: `#${adminDetails.color &&adminDetails?.color.substring(10,16)}` }}
          >
            
            {categories?.slice(0, 5).map((cat, index) => {
              return (
                <Link
                  to={`${
                    cat.is_sub === 1
                      ? `/${username}/template/2/category/${cat.id}`
                      : `/${username}/template/2/category/${cat.id}/sub-category/0`
                  }`}
                  key={cat.id}
                >
                  <p key={index} className="text-capitalize">
                    {cat.name}
                  </p>
                </Link>
              );
            })}
          </div>

          <div className="right">
            <div className="offers_temp2 px-2">
              {items.map((item) => {
                return (
                  <>
                    <div
                      className="offer offer_temp2  px-2"
                      key={item.id}
                      onClick={() => handleShow(item)}
                    >
                      <img
                        src={`https://menurating-back.levantsy.com/storage${item.item_images[0].image_url}`}
                        alt=""
                        className=""
                        style={{ height: "150px" }}
                      />
                      <p className="text-dark text-center mt-3">{item.name}</p>
                    </div>
                    {showModal && (
                      <Modal
                        show={showModal}
                        onHide={handleClose}
                        className="itemModal"
                      >
                        <div className="details_item">
                          <img
                            src={`https://menurating-back.levantsy.com/storage${showModal.item_images[0].image_url}`}
                            alt=""
                            className=""
                          />
                          <img
                            src={cancel}
                            alt=""
                            className="cancel_button"
                            onClick={handleClose}
                          />
                          <div className="details">
                            <div className="mt-3 w-100">
                              <h3 className="text-capitalize text-center text-break">
                                {showModal.name}
                              </h3>
                              <p
                                className="text-center"
                                style={{ fontSize: "20px", color: "#000" }}
                              >
                                {showModal.description}
                              </p>
                              <p className="text-dark text-center text-break font-weight-bold text-capitalize mt-3 price">
                                {`${showModal.price || 0} S.P`}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Modal>
                    )}
                  </>
                );
              })}
            </div>

            {pageCountItems.current > 1 ? (
              <Pagination
                pageCount={pageCountItems.current}
                onPress={onPress}
              />
            ) : null}

            <Modal
              show={showModalSearch}
              onHide={handleCloseSearch}
              className="searchModal  p-0"
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
                  style={{textAlign: language === 'en' ? '' : 'right'}}
                />
              </Form>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Items;
