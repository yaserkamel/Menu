import { useContext, useEffect, useRef, useState } from "react";
import search from "../../assets/icon _search outline_.png";
import vector2 from "../../assets/Vector (1).png";
import facebook from "../../assets/pngegg.png";
import insta from "../../assets/insta.png";
// import whatss from '../../assets/واتس.png'
import { Link, useParams } from "react-router-dom";
import { AdminContext } from "../../context/AdminProvider";
import rec6 from "../../assets/pizza 1 (2).png";
import Slider from "react-slick";
import axios from "axios";
import { CategoriesContext } from "../../context/CategoriesProvider";
import Pagination from "../template1/Pagination";
import { Dropdown, Form, Modal } from "react-bootstrap";
import cancel from "../../assets/Vectorrr.png";
import ellip from "../../assets/Ellipse 27.png";
import home from "../../assets/icon _home_.png";
import pizza from "../../assets/pizza 1 (2).png";
import vector from "../../assets/Vector.png";
import { IoMdArrowRoundBack  } from "react-icons/io";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow } from "swiper/modules";
import { LanguageContext } from "../../context/LanguageProvider";
import WhatssappIcon from "../utility/WhatssappIcon";

const Temp5Items = () => {
  const { adminDetails, updateUsername } = useContext(AdminContext);
  const { categories, setCategories, pageCount } =
    useContext(CategoriesContext);
  const { language, toggleLanguage } = useContext(LanguageContext);
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(null);
  const pageCountItems = useRef();
  const { id, id2 } = useParams();

  const handleClose = () => setShowModal(null);
  const handleShow = (item) => setShowModal(item);
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
  const onChangeSearch = (e) => {
    setSearchWord(e.target.value);
  };

  const [showModalSearch, setShowModalSearch] = useState(false);
  const handleCloseSearch = () => setShowModalSearch(false);
  const handleShowSearch = () => setShowModalSearch(true);
  const [searchWord, setSearchWord] = useState("");
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
        // console.log(response.data.data);
        pageCountItems.current = response.data.last_page;
        setItems(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getItems();
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
          id2 === "0"
            ? `https://menurating-back.levantsy.com/user_api/show_items?masterId=${id}&search=${word}`
            : `https://menurating-back.levantsy.com/user_api/show_items?masterId=${id}&subId=${id2}&search=${word}`,
          config
        );
        console.log(response);
        pageCountItems.current = response.data.last_page;
        setItems(response.data.data);
      } catch (e) {
        console.log(e);
        setItems([]);
      }
    }
    setTimeout(() => {
      getProduct(searchWord);
    }, 1000);
  }, [searchWord]);

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

      <div className="bottom_section_temp5">
        <Link
          to={`/${username}/template/5/category/${id}`}
          style={{
            textDecoration: "none",
            color: "#111",
            // backgroundColor: "",
            fontSize: "24px",
            padding: "10px 20px",
            borderRadius: "5px",
            display: "inline-block",
          }}
        >
          <IoMdArrowRoundBack  />
        </Link>

        {
        // <div className="items_temp5 ">
        //   {
        //     //   items.map((item) => {
        //     //   return (
        //     //     <>
        //     //       <div className="item_temp5" key={item.id} onClick={handleShow}>
        //     //         <img
        //     //           src={`https://menurating-back.levantsy.com/storage${item.item_images[0].image_url}`}
        //     //           alt=""
        //     //         />
        //     //         <h6>{item.name}</h6>
        //     //         <p>{item.description}...00000000.</p>
        //     //       </div>
        //     //       <Modal
        //     //         show={showModal}
        //     //         onHide={handleClose}
        //     //         className="itemModal_temp4"
        //     //       >
        //     //         <div className="details_item">
        //     //           <img
        //     //             src={`https://menurating-back.levantsy.com/storage${item.item_images[0].image_url}`}
        //     //             alt=""
        //     //             className=""
        //     //           />
        //     //           <img
        //     //             src={cancel}
        //     //             alt=""
        //     //             className="cancel_button"
        //     //             onClick={handleClose}
        //     //           />
        //     //           <div className="details">
        //     //             <div className="mt-3 d-flex justify-content-center align-items-center">
        //     //               <h3 className="mr-3 my-0 text-capitalize">
        //     //                 {item.name}
        //     //               </h3>
        //     //               <p className="text-dark m-0">
        //     //                 {" "}
        //     //                 {` price: ${item.price} S.P`}
        //     //               </p>
        //     //             </div>
        //     //             <p className="text-center desc">
        //     //               Lorem ipsum dolor sit amet consectetur adipisicing
        //     //               elit., officia ullam! Illo.{item.description}
        //     //             </p>
        //     //           </div>
        //     //         </div>
        //     //       </Modal>
        //     //     </>
        //     //   );
        //     // })}
        //     // <div className="item_temp5" onClick={handleShow}>
        //     //   <img src={pizza} alt="" />
        //     //   <h6>name</h6>
        //     //   <p>description</p>
        //     // </div>
        //     // <div className="item_temp5" onClick={handleShow}>
        //     //   <img src={pizza} alt="" />
        //     //   <h6>name</h6>
        //     //   <p>description..</p>
        //     // </div>
        //   }
        // </div>
        }

        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          {items?.length > 0
            ? items?.map((item) => {
                return (
                  <>
                    <SwiperSlide key={item.id} onClick={() => handleShow(item)}>
                      <img
                        src={`https://menurating-back.levantsy.com/storage${item.item_images[0].image_url}`}
                      />
                      <h5 className="mt-2 text-center w-100 text-break">
                        {item.name}
                      </h5>
                      <p className="text-center w-100 text-break my-2">
                        {item.description}
                      </p>
                      <h5 className="text-center font-weight-bold w-100 text-break my-2">
                        {item.price} S.P
                      </h5>
                    </SwiperSlide>

                    {showModal && (
                      <Modal
                        show={showModal}
                        onHide={handleClose}
                        className="itemModal_temp4"
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
                            <div className="mt-3 d-flex justify-content-center align-items-center">
                              <h3 className="mr-3 my-0 text-capitalize">
                                {showModal.name}
                              </h3>
                              <p className="text-dark m-0">
                                {" "}
                                {` price: ${showModal.price} S.P`}
                              </p>
                            </div>
                            <p className="text-center desc">
                              {showModal.description}
                            </p>
                          </div>
                        </div>
                      </Modal>
                    )}
                  </>
                );
              })
            : null}
        </Swiper>

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

        {pageCountItems.current > 1 ? (
          <Pagination pageCount={pageCountItems.current} onPress={onPress} />
        ) : null}
      </div>
    </div>
  );
};

export default Temp5Items;
