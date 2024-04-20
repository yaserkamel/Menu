import { Dropdown, Form, Modal } from "react-bootstrap"
import { AdminContext } from "../../context/AdminProvider";
import { LanguageContext } from "../../context/LanguageProvider";
import { useContext, useState } from "react";
import vector from "../../assets/Vector.png";
import facebook from "../../assets/face 1.png";
import insta from "../../assets/insta 1.png";
import WhatssappIcon from "./WhatssappIcon";
import { Link } from "react-router-dom";
import search from "../../assets/icon _search outline_.png";

const NavBarrr = () => {
  const { adminDetails, updateUsername } = useContext(AdminContext);
  const { language, toggleLanguage } = useContext(LanguageContext);
  const [showModal, setShowModal] = useState(false);
  const [searchWord, setSearchWord] = useState("");

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const onChangeSearch = (e) => {
    setSearchWord(e.target.value);
  };
  return (
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
              <Dropdown.Item
                href={adminDetails.facebook_url}
                target="_blank"
                className="dorp_down_item"
              >
                <img src={facebook} alt="" />
              </Dropdown.Item>
              <Dropdown.Item
                href={adminDetails.instagram_url}
                target="_blank"
                className="dorp_down_item"
              >
                <img src={insta} alt="" />
              </Dropdown.Item>

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
            to={`https://menurating-back.levantsy.com/storage${adminDetails.logo}`}
          >
            <img
              src={`https://menurating-back.levantsy.com/storage${adminDetails.logo}`}
              alt="logo"
            />
          </Link>
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
                  style={{textAlign: language === 'en' ? '' : 'right'}}
                />
              </Form>
            </Modal>
      </nav>
  )
}

export default NavBarrr
