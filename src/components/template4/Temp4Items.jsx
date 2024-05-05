import { useContext, useEffect, useRef, useState } from "react";
import search from "../../assets/icon _search outline_.png";
import vector2 from "../../assets/Vector (1).png";
import facebook from "../../assets/pngegg.png";
import insta from "../../assets/insta.png";
import { Link, useParams } from "react-router-dom";
import { AdminContext } from "../../context/AdminProvider";
import rec6 from "../../assets/pizza 1 (2).png";
import Slider from "react-slick";
import axios from "axios";
import { CategoriesContext } from "../../context/CategoriesProvider";
import Pagination from "../template1/Pagination";
import { Dropdown, Modal, Form } from "react-bootstrap";
import cancel from "../../assets/Vectorrr.png";
import ellip from "../../assets/Ellipse 27.png";
import vector from "../../assets/Vector.png";
import searchIcon from "../../assets/_search outline.png";
import { LanguageContext } from "../../context/LanguageProvider";
import WhatssappIcon from "../utility/WhatssappIcon";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { useMediaQuery } from "@uidotdev/usehooks";
import { IoMdArrowRoundBack } from "react-icons/io";

const Temp4Items = () => {
  const { adminDetails, updateUsername } = useContext(AdminContext);
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const { categories, setCategories, pageCount } =
    useContext(CategoriesContext);
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(null);
  const [pageCountItems, setPageCountItems] = useState('');
  // const pageCountItems = useRef();
  const { id, id2 } = useParams();
  const handleClose = () => setShowModal(null);
  const handleShow = (item) => setShowModal(item);

  const [showModalSearch, setShowModalSearch] = useState(false);
  const { language, toggleLanguage } = useContext(LanguageContext);

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
        // pageCountItems.current = response.data.last_page;
        setPageCountItems(response.data.last_page);
        setItems(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getItems();
  }, [language]);
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
        setPageCountItems(response.data.last_page);
      } catch (e) {
        console.log(e);
      }
    }
    setTimeout(() => {
      getProduct(searchWord);
    }, 1000);
  }, [searchWord, language, id]);

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
    // console.log(response.data.data);
    setItems(response.data.data);
    setPageCountItems(response.data.last_page);
  };

  console.log(pageCountItems)

  return (
    <div style={{ minHeight: "100vh" }}>
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
            <img src={search} alt="" onClick={handleShowSearch} />
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
        style={{ minHeight: "calc(100vh - 70px)" }}
      >
        {
          // <div
          //     className="left_section_temp4"
          //     style={{ background: `#${adminDetails.color &&adminDetails?.color.substring(10,16)}` }}
          //   >
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
          //   </div>
        }
        <div className="right_section_temp4 w-100">
          <div className="d-flex flex-column align-items-center justify-content-center mb-5">
            <div className="items_temp4 ">
              {items.map((item) => {
                return (
                  <>
                    <div
                      className="item_temp4"
                      key={item.id}
                      onClick={() => handleShow(item)}
                      style={{ border: `3px solid #${adminDetails.color &&adminDetails?.color.substring(10,16)}` }}
                    >
                      <img
                        src={`https://menurating-back.levantsy.com/storage${item.item_images[0].image_url}`}
                        alt=""
                      />
                      <h6 className="px-1 text-break">{item.name}</h6>
                    </div>

                    {showModal && (
                      <Modal
                        show={showModal}
                        onHide={handleClose}
                        className="itemModal_temp4"
                      >
                        <div className="details_item ">
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
                            style={{ background: `#${adminDetails.color &&adminDetails?.color.substring(10,16)}` }}
                          />
                          <div className="details w-100 px-3 text-wrap">
                            <h3 className="text-capitalize text-center w-100 text-break">
                              {showModal.name}
                            </h3>
                            <p className="text-dark text-center font-weight-bold text-break w-100 m-0">
                              {`${showModal.price || 0} S.P`}
                            </p>

                            <p className="text-center desc">
                              {showModal.description}
                            </p>
                          </div>
                        </div>
                      </Modal>
                    )}
                  </>
                );
              })}
            </div>

            {pageCountItems > 1 ? (
              <Pagination
                pageCount={pageCountItems}
                onPress={onPress}
              />
            ) : null}
          </div>

          <Modal
            show={showModalSearch}
            onHide={handleCloseSearch}
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
                placeholder=""
                className="form-search"
                style={{ textAlign: language === "en" ? "" : "right" }}
              />
            </Form>
          </Modal>
        </div>
      </div>
      <div
        className="bottom_section_categories_temp4"
        style={{
          background: `#${adminDetails.color &&adminDetails?.color.substring(10,16)}`,
          flexDirection: language === "en" ? "row" : "row-reverse",
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
              className="d-flex flex-column align-items-center justify-content-center"
            >
              <img
                src={`https://menurating-back.levantsy.com/storage${cat.image_url}`}
                alt=""
              />
              <p className="text-capitalize text-white text-truncate text-center">{cat.name}</p>
            </Link>
          );
        })}
        <Link to={`/${username}/template/4/home`} className="align-self-end">
          {" "}
          <p className="text-capitalize text-white text-center">
            {language === "en" ? "More..." : "...المزيد"}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Temp4Items;
