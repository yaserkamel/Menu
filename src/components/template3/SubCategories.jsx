import { Link, useNavigate, useParams } from "react-router-dom";
import rec6 from "../../assets/pizza 1 (2).png";
import search from "../../assets/icon _search outline_.png";
import vector2 from "../../assets/Vector (1).png";
import facebook from "../../assets/pngegg.png";
import insta from "../../assets/insta.png";
import vector from "../../assets/Vector.png";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { AdminContext } from "../../context/AdminProvider";
import { Dropdown, Form, Modal } from "react-bootstrap";
import { CategoriesContext } from "../../context/CategoriesProvider";
import searchIcon from "../../assets/_search outline.png";
import Pagination from "../template1/Pagination";
import { LanguageContext } from "../../context/LanguageProvider";
import WhatssappIcon from "../utility/WhatssappIcon";

const SubCategories = () => {
  const [subCat, setSubCat] = useState([]);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const { adminDetails, updateUsername } = useContext(AdminContext);
  const [searchWord, setSearchWord] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { categories, setCategories, pageCount } =
    useContext(CategoriesContext);
  const { language, toggleLanguage } = useContext(LanguageContext);
  const navigate = useNavigate();
  const { username } = useParams();
  const pageCountSub = useRef();
  const handleUpdateUsername = () => {
    updateUsername(username);
  };
  useEffect(() => {
    handleUpdateUsername();
  }, []);

  const handleClick = (id2) => {
    navigate(`/${username}/template/3/category/${id}/sub-category/${id2}`);
  };

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
        pageCountSub.current = response.data.last_page;
        setError(null);
      } catch (e) {
        console.log();
        setError(e.response);
      }
    }
    setTimeout(() => {
      getProduct(searchWord);
    }, 1000);
  }, [searchWord, language]);

  // useEffect(() => {
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
  //       console.log(response.data.data);
  //       pageCountSub.current = response.data.last_page;
  //       setSubCat(response.data.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   getSubCat();
  // }, []);

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
    <div style={{ minHeight: "100vh", background: "" }}>
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

      <div className="pagin_tem3 d-flex flex-column align-items-center justify-content-center">
        <div className="template3_items">
          {error ? (
            <p className="my-4 text-danger">{error.data.message}</p>
          ) : (
            subCat.map((sub) => {
              return (
                <div
                  className="template3_item "
                  style={{
                    backgroundColor: `#${
                      adminDetails.color &&
                      adminDetails?.color.substring(10, 16)
                    }`,
                  }}
                  key={sub.id}
                  onClick={() => handleClick(sub.id)}
                >
                  <img
                    src={`https://menurating-back.levantsy.com/storage${sub.image_url}`}
                    alt=""
                    className="template3_S_U_b_item"
                  />
                  <h5 className="mt-5 text-dark font-weight-bold">
                    {sub.name}
                  </h5>
                </div>
              );
            })
          )}
        </div>
        {pageCountSub.current > 1 ? (
          <div className="mb-2">
            <Pagination pageCount={pageCountSub.current} onPress={onPress} />
          </div>
        ) : null}
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
  );
};

export default SubCategories;
