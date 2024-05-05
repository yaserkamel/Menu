import search from "../../assets/icon _search outline_.png";
import vector2 from "../../assets/Vector (1).png";
import facebook from "../../assets/pngegg.png";
import insta from "../../assets/insta.png";
// import whatss from '../../assets/واتس.png'
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { AdminContext } from "../../context/AdminProvider";
import axios from "axios";
import rec from "../../assets/Rectangle 11.png";
import burger from "../../assets/burger food_.png";
import pizza from "../../assets/pizza food 2_.png";
import french from "../../assets/french fries kitchen.png";
import soft from "../../assets/soft drinks_.png";
import { Dropdown, Form, Modal } from "react-bootstrap";
import vector from "../../assets/Vector.png";
import Pagination from "../template1/Pagination";
import { CategoriesContext } from "../../context/CategoriesProvider";
import { LanguageContext } from "../../context/LanguageProvider";
import WhatssappIcon from "../utility/WhatssappIcon";
import { useMediaQuery } from "@uidotdev/usehooks";

const SubCategoriesTemp5 = () => {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const { adminDetails, updateUsername } = useContext(AdminContext);
  const { categories, setCategories, pageCount } =
    useContext(CategoriesContext);
  const { language, toggleLanguage } = useContext(LanguageContext);

  const [subCat, setSubCat] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const { id } = useParams();
  const pageCountSub = useRef();
  const navigate = useNavigate();
  const handleClick = (id2) => {
    navigate(`/${username}/template/5/category/${id}/sub-category/${id2}`);
  };
  const { username } = useParams();
  const handleUpdateUsername = () => {
    updateUsername(username);
  };
  useEffect(() => {
    handleUpdateUsername();
  }, []);

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
        console.log(response.data.data);
        pageCountSub.current = response.data.last_page;
        setSubCat(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getSubCat();
  }, []);

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
        // console.log(response.data.data);
        setSubCat(response.data.data);
      } catch (e) {
        console.log(e);
      }
    }
    setTimeout(() => {
      getProduct(searchWord);
    }, 1000);
  }, [searchWord, language, id]);

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
        <div
          className="left_section_temp5 mx-1"
          style={{
            background: `#${
              adminDetails.color && adminDetails?.color.substring(10, 16)
            }`,
          }}
        >
          {
            // <img src={burger} alt="" />
            // <img src={pizza} alt="" />
            // <img src={french} alt="" />
            // <img src={soft} alt="" />
            categories?.slice(0, isSmallDevice ? 8 : 5).map((cat) => {
              return (
                <Link
                  to={`${
                    cat.is_sub === 1
                      ? `/${username}/template/5/category/${cat.id}`
                      : `/${username}/template/5/category/${cat.id}/sub-category/0`
                  }`}
                  key={cat.id}
                  className="p-0 m-0 "
                >
                  <img
                    src={`https://menurating-back.levantsy.com/storage${cat.image_url}`}
                    className=""
                  />
                </Link>
              );
            })
          }
          {categories.length > 8 && (
            <Link
              className=""
              style={{ color: "#FFF" }}
              to={`/${username}/template/5/categories`}
            >
              {language === "en" ? "More" : "المزيد"}
            </Link>
          )}
        </div>
        <div className="offers_temp5_sub" style={{ flexWrap: "wrap" }}>
          {subCat?.map((sub) => {
            return (
              <div
                className="offer_temp5"
                key={sub.id}
                onClick={() => handleClick(sub.id)}
                // style={{ background: `#${adminDetails.color &&adminDetails?.color.substring(10,16)}` }}
              >
                <img
                  src={`https://menurating-back.levantsy.com/storage${sub.image_url}`}
                  alt=""
                />
                <h5 className="text-center w-100 text-break">{sub.name}</h5>
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
      {pageCountSub.current > 1 ? (
        <div className="mb-2">
          <Pagination pageCount={pageCountSub.current} onPress={onPress} />
        </div>
      ) : null}
    </div>
  );
};

export default SubCategoriesTemp5;
