import { useContext, useEffect, useRef, useState } from "react";
import search from "../../assets/icon _search outline_.png";
import vector2 from "../../assets/Vector (1).png";
import facebook from "../../assets/pngegg.png";
import insta from "../../assets/insta.png";
import searchIcon from "../../assets/_search outline.png";

import { Link, useParams } from "react-router-dom";
import { AdminContext } from "../../context/AdminProvider";
import rec6 from "../../assets/pizza 1 (2).png";
import Slider from "react-slick";
import axios from "axios";
import { CategoriesContext } from "../../context/CategoriesProvider";
import Pagination from "../template1/Pagination";
import { Dropdown, Form, Modal } from "react-bootstrap";
import cancel from "../../assets/Vectorrr.png";
import vector from "../../assets/Vector.png";
import { LanguageContext } from "../../context/LanguageProvider";
import WhatssappIcon from "../utility/WhatssappIcon";

const Temp3Items = () => {
  const { adminDetails, updateUsername } = useContext(AdminContext);
  const { categories, setCategories, pageCount } =
    useContext(CategoriesContext);
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const pageCountItems = useRef();
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
    return categories.find((item) => item.id === parsedId);
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
        setItems(response.data.data);
      } catch (e) {
        console.log(e);
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
    setItems(response.data.data);
  };

  return (
    <div style={{ minHeight: "100vh", background: "" }}>
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

      <div className="d-flex flex-column align-items-center justify-content-center">
        <div className="template3_items">
          {items.concat(items).concat(items).concat(items).map((item) => {
            return (
              <>
                <div
                  className="template3_item"
                  style={{ backgroundColor: `#${adminDetails.color &&adminDetails?.color.substring(10,16)}` }}
                  key={item.id}
                  onClick={() => handleShow(item)}
                >
                  <img
                    src={`https://menurating-back.levantsy.com/storage${item.item_images[0].image_url}`}
                    alt=""
                  />
                  <p className="text-dark font-weight-bold">{item.name}</p>
                  <h5 className="text-dark font-weight-bold text-center w-100">
                    {item.price || 0} S.P
                  </h5>
                </div>
                {showModal && (
                  <Modal
                    show={showModal}
                    onHide={handleClose}
                    className="temp3_modal"
                  >
                    <div
                      className="details_item"
                      style={{ backgroundColor: `#${adminDetails.color &&adminDetails?.color.substring(10,16)}` }}
                    >
                      <img
                        src={`https://menurating-back.levantsy.com/storage${showModal.item_images[0].image_url}`}
                        alt=""
                        className="temp3_image"
                      />
                      <img
                        src={cancel}
                        alt=""
                        className="cancel_button"
                        onClick={handleClose}
                      />
                      <div className="details">
                        <h3 className="text-capitalize text-center w-100">
                          {showModal.name}{" "}
                        </h3>
                        <p className="text-dark">{showModal.description}</p>
                        <p className=" text-capitalize mt-5 price text-dark font-weight-bold">
                          {`${showModal.price || 0} S.P`}
                        </p>
                      </div>
                    </div>
                  </Modal>
                )}
              </>
            );
          })}
        </div>
        {pageCountItems.current > 1 ? (
          <Pagination pageCount={pageCountItems.current} onPress={onPress} />
        ) : null}
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
              style={{textAlign: language === 'en' ? '' : 'right'}}
            />
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Temp3Items;
