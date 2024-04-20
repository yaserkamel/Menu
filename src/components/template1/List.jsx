import logo2 from "../../assets/dsfsf 3.png";
import arrow1 from "../../assets/Arrow 1.png";
import icon_home from "../../assets/icon _home.png";
import vector from "../../assets/Vector 2.png";
import ellips from "../../assets/Ellipse 7.png";
import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import NavBarMenu from "./NavBarMenu";
import axios from "axios";
import { CategoriesContext } from "../../context/CategoriesProvider";
import Pagination from "./Pagination";
import { Dropdown, Form, Modal } from "react-bootstrap";
import cancel from "../../assets/cancel.png";
import { AdminContext } from "../../context/AdminProvider";
import search from "../../assets/icon _search outline_.png";
import facebook from "../../assets/pngegg.png";
import insta from "../../assets/insta.png";
import vector2 from "../../assets/Vector.png";
import searchIcon from "../../assets/_search outline.png";
import { LanguageContext } from "../../context/LanguageProvider";
import WhatssappIcon from "../utility/WhatssappIcon";
import CategoriesSlider from "./CategoriesSlider";

export default function List() {
  const [showModal, setShowModal] = useState(false);
  const [showModalSearch, setShowModalSearch] = useState(false);
  const [show, setShow] = useState(false);
  const [items, setItems] = useState([]);
  const [itemsSimilar, setItemsSimilar] = useState();
  const [subCat, setSubCat] = useState([]);
  const [subCurrent, setSubCurrent] = useState("");
  const [subId, setSubId] = useState();
  const [pending, setPending] = useState(true);
  const pageCountItems = useRef();
  const { language, toggleLanguage } = useContext(LanguageContext);

  const handleClose = () => setShowModal(null);
  const handleShow = (item) => {
    setShowModal(item);
    handleClickSimilarProject(item.id);
  };

  const handleCloseSearch = () => setShowModalSearch(false);
  const handleShowSearch = () => setShowModalSearch(true);

  const { categories, setCategories, pageCount } =
    useContext(CategoriesContext);
  const [searchWord, setSearchWord] = useState("");
  const { username } = useParams();

  const handleUpdateUsername = () => {
    updateUsername(username);
  };
  useEffect(() => {
    handleUpdateUsername();
  }, []);

  const { id } = useParams();
  const { adminDetails, updateUsername } = useContext(AdminContext);
  const SubCateRef = useRef(0);

  // console.log(categories);

  const getItemById = (id) => {
    const parsedId = parseInt(id, 10); // Parse id to a number
    return categories?.find((item) => item.id === parsedId);
  };
  // let selectedItem = getItemById(id);
  let selectedItem = "";
  selectedItem = getItemById(id);
  selectedItem?.is_sub === 1
    ? (SubCateRef.current = subCat[0]?.id)
    : (SubCateRef.current = "");
  // console.log(selectedItem);

  const onChangeSearch = (e) => {
    setSearchWord(e.target.value);
    console.log(searchWord);
  };

  // useEffect(() => {
  //   async function getItems() {
  //     try {
  //       selectedItem = await getItemById(id);
  //       console.log(selectedItem);
  //       selectedItem?.is_sub === 1
  //         ? (SubCateRef.current = subCat[0]?.id)
  //         : (SubCateRef.current = "");
  //       const config = {
  //         headers: {
  //           language: language,
  //         },
  //       };
  //       const response = await axios.get(
  //         selectedItem && selectedItem.is_sub === 1
  //           ? `https://menurating-back.levantsy.com/user_api/show_items?masterId=${id}&subId=${subCat[0]&&subCat[0].id}`
  //           : `https://menurating-back.levantsy.com/user_api/show_items?masterId=${id}`,
  //         config
  //       );
  //       console.log(response.data.data);
  //       pageCountItems.current = response.data.last_page;
  //       setItems(response.data.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   async function getSubCat() {
  //     try {
  //       const config = {
  //         headers: {
  //           language: language,
  //         },
  //       };
  //       const response = await axios.get(
  //         `https://menurating-back.levantsy.com/user_api/show_master_categories?masterId=${id}`,
  //         config
  //       );
  //       // console.log(response.data.data[0].id);
  //       setSubCat(response.data.data);
  //       setSubCurrent(response.data.data[0]);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   if (selectedItem?.is_sub) {
  //     getSubCat();
  //     getItems();
  //   }else {
  //     getItems();
  //   }

  //   // if (subCat.length > 0) {
  //   //   getItems();
  //   // }
  // }, [categories]);

  useEffect(() => {
    async function getItems() {
      try {
        selectedItem = await getItemById(id);
        console.log(selectedItem);
        let subCategoryId = "";
        if (selectedItem?.is_sub === 1 && subCat && subCat.length > 0) {
          subCategoryId = subCat[0]?.id;
        }
        SubCateRef.current = subCategoryId;

        const config = {
          headers: {
            language: language,
          },
        };
        const response = await axios.get(
          selectedItem && selectedItem.is_sub === 1
            ? `https://menurating-back.levantsy.com/user_api/show_items?masterId=${id}&subId=${subCategoryId}`
            : `https://menurating-back.levantsy.com/user_api/show_items?masterId=${id}`,
          config
        );
        console.log(response.data.data);
        pageCountItems.current = response.data.last_page;
        setItems(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }

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
        // console.log(response.data.data[0].id);
        setSubCat(response.data.data);
        setSubCurrent(response.data.data[0]);
      } catch (error) {
        console.log(error);
      }
    }

    if (selectedItem?.is_sub) {
      getSubCat();
    }
    // getItems();
  }, [categories]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    async function getProduct(word) {
      try {
        setPending(true);
        const config = {
          headers: {
            language: language,
          },
        };
        const response = await axios.get(
          SubCateRef?.current === ""
            ? `https://menurating-back.levantsy.com/user_api/show_items?masterId=${id}&search=${word}`
            : `https://menurating-back.levantsy.com/user_api/show_items?masterId=${id}&subId=${SubCateRef.current}&search=${word}`,
          config
        );
        // console.log(response)
        setItems(response.data.data);
      } catch (e) {
        console.log(e);
      } finally {
        setPending(false);
      }
    }
    setTimeout(() => {
      if (subCat.length > 0) {
        getProduct(searchWord);
      }
    }, 0);
  }, [searchWord, subCat]);

  const handleClickSimilarProject = (id) => {
    const filteredItems = items.filter((item) => item.id !== id);
    setItemsSimilar(filteredItems);
  };

  const onPress = async (page) => {
    const config = {
      headers: {
        language: language,
      },
    };
    const response = await axios.get(
      SubCateRef?.current === ""
        ? `https://menurating-back.levantsy.com/user_api/show_items?masterId=${id}&page=${page}`
        : `https://menurating-back.levantsy.com/user_api/show_items?masterId=${id}&subId=${SubCateRef.current}&page=${page}`,
      config
    );
    // console.log(response.data.data);
    setItems(response.data.data);
  };

  const handleClickSubCat = async (sub_id) => {
    try {
      // setSubId(sub_id)
      SubCateRef.current = sub_id;
      // categories?.find((item) => item.id === parsedId)
      setSubCurrent(subCat?.find((item) => item.id === sub_id));
      console.log(sub_id);
      console.log(subCat);
      const config = {
        headers: {
          language: language,
        },
      };
      const response = await axios.get(
        `https://menurating-back.levantsy.com/user_api/show_items?masterId=${id}&subId=${sub_id}`,
        config
      );
      console.log(response.data.data);
      pageCountItems.current = response.data.last_page;
      setItems(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(items);
  console.log(pending);

  return adminDetails ? (
    <div className="" style={{ height: "100vh" }}>
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
              <img src={vector2} alt="" />
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
      <div
        className="headList "
        style={{
          marginLeft: language === "en" ? `${show ? "85px" : "0 "}` : ``,
          marginRight: language === "en" ? `` : `${show ? "85px" : "0 "}`,
          flexDirection: language === "en" ? "" : "row-reverse",
          justifyContent: language === "en" ? "" : "space-between",
          alignItems: language === "en" ? "flex-start" : "flex-end",
        }}
      >
        <div
          className="list_food "
          style={{
            background: `#${
              adminDetails.color && adminDetails?.color.substring(10, 16)
            }`,
            borderRadius: language === "en" ? "0 20px 20px 0" : "20px 0 0 20px",
            flexDirection: language === "en" ? "row" : "row-reverse",
          }}
        >
          <Link className="list_menu" onClick={() => setShow(!show)}>
            <p></p>
            <p></p>
            <p></p>
          </Link>
          <p> {language === "en" ? "Food List" : "قائمة الطعام"} </p>
        </div>
        <nav
          dir={language === "en" ? "ltr" : "rtl"}
          aria-label="breadcrumb"
          style={{ alignSelf: language === "en" ? "flex-start" : "flex-end" }}
        >
          <ol className="breadcrumb">
            <li
              className="breadcrumb-item"
              style={{ float: language === "en" ? "" : "" }}
            >
              <Link to={`/${username}/template/1/home`}>
                <img src={icon_home} alt="" />
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {selectedItem?.name}
            </li>
            {subCurrent && (
              <li className="breadcrumb-item active" aria-current="page">
                {subCurrent.name}
              </li>
            )}
          </ol>
        </nav>
      </div>

      {items && items.length === 0 && pending === false && (
        <h3 className="text-center mt-5">Not Found Items</h3>
      )}
      {pending && (
        <p className="text-center mt-5">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </p>
      )}
      <div
        className="meals"
        style={{
          marginLeft: language === "en" ? `${show ? "85px" : "0 "}` : ``,
          marginRight: language === "en" ? `` : `${show ? "85px" : "0 "}`,
        }}
      >
        {items && items.length > 0
          ? items?.map((item) => {
              return (
                <div key={item.id} style={{ cursor: "pointer" }}>
                  <div
                    className="meal"
                    style={{
                      background: `#${
                        adminDetails.color &&
                        adminDetails?.color.substring(10, 16)
                      }`,
                    }}
                    onClick={() => handleShow(item)}
                  >
                    <img
                      src={`https://menurating-back.levantsy.com/storage${item.item_images[0].image_url}`}
                      alt=""
                      className=""
                    />
                    <div className="section_bottom">
                      <p className="para">{item.name}</p>
                      <p style={{ fontWeight: "bold" }}>{item.price} S.P</p>
                    </div>
                  </div>

                  {showModal && (
                    <Modal
                      show={showModal}
                      onHide={handleClose}
                      className="itemModal p-0"
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
                          <h3 className="text-capitalize font-weight-bold">
                            {showModal.name}
                          </h3>
                          <div className="line"></div>
                          <p className="des">{showModal.description} </p>
                          <p className="price font-weight-bold">
                            {showModal.price} S.P
                          </p>
                          <div className="line"></div>
                        </div>
                        <h5 className="text-center">
                          {language === "en"
                            ? "Related Products"
                            : "منتجات ذات صلة"}
                        </h5>
                        {
                          <div className="similar_products ">
                            {itemsSimilar?.length >= 1
                              ? itemsSimilar?.slice(0, 2).map((item) => {
                                  return (
                                    <div
                                      key={item.id}
                                      style={{
                                        background: `#${
                                          adminDetails.color &&
                                          adminDetails?.color.substring(10, 16)
                                        }`,
                                        cursor: "pointer",
                                      }}
                                      className="similar_product"
                                      onClick={() => handleShow(item)}
                                    >
                                      <img
                                        src={`https://menurating-back.levantsy.com/storage${item.item_images[0].image_url}`}
                                        alt=""
                                        className=""
                                      />

                                      <p className="text-center">{item.name}</p>
                                    </div>
                                  );
                                })
                              : null}
                          </div>
                        }
                      </div>
                    </Modal>
                  )}
                </div>
              );
            })
          : null}
      </div>

      {pageCountItems.current > 1 ? (
        <Pagination pageCount={pageCountItems.current} onPress={onPress} />
      ) : null}

      <Modal
        show={showModalSearch}
        onHide={handleCloseSearch}
        className="searchModal p-0"
      >
        <Form className="container-search" onSubmit={handleSubmit}>
          {
            // <img src={searchIcon} alt="searchIcon" className="searchIcon" />
          }
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
      {show && (
        <div
          className="sidenav"
          style={{
            background: `#${
              adminDetails.color && adminDetails?.color.substring(10, 16)
            }`,
            left: language === "en" ? "3px" : "",
            right: language === "en" ? "" : "3px",
          }}
        >
          {selectedItem?.is_sub === 1 ? (
            subCat.map((sub) => {
              return (
                <div
                  className="item_one"
                  key={sub.id}
                  onClick={() => handleClickSubCat(sub.id)}
                >
                  <img
                    src={`https://menurating-back.levantsy.com/storage${sub.image_url}`}
                    alt=""
                  />
                  <p>{sub.name}</p>
                </div>
              );
            })
          ) : (
            <p className="not_found_sub">
              {" "}
              {language === "en" ? "Not Found Sub-Categories" : "لايوجد عناصر"}
            </p>
          )}
        </div>
      )}
    </div>
  ) : null;
}
