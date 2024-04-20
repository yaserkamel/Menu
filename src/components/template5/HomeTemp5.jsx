import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminProvider";
import { Link, useParams } from "react-router-dom";
import facebook from "../../assets/pngegg.png";
import insta from "../../assets/insta.png";
import whatss from "../../assets/واتس.png";
import { LanguageContext } from "../../context/LanguageProvider";
import { Dropdown } from "react-bootstrap";
import star from "../../assets/Star.png";
import star1 from "../../assets/Star (1).png";
import vector from "../../assets/Vector.png";
import WhatssappIcon from "../utility/WhatssappIcon";

const HomeTemp5 = () => {
  const { adminDetails, updateUsername } = useContext(AdminContext);
  const { language, toggleLanguage } = useContext(LanguageContext);

  const { username } = useParams();
  const handleUpdateUsername = () => {
    updateUsername(username);
  };
  useEffect(() => {
    handleUpdateUsername();
  }, []);

  return (
    <div style={{ height: "100vh" }}>
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
          style={{
            flexDirection: language === "en" ? "row" : "row-reverse",
          }}
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
        </div>
        <div className="d-flex align-items-center">
          <p
            className="text-white pr-2"
            style={{ fontSize: "22px", fontStyle: "italic" }}
          >
            Rating
          </p>
          <img
            src={star}
            alt="logo"
            style={{ width: "15px", height: "15px" }}
          />
          <img
            src={star}
            alt="logo"
            style={{ width: "15px", height: "15px" }}
          />
          <img
            src={star}
            alt="logo"
            style={{ width: "15px", height: "15px" }}
          />
          <img
            src={star}
            alt="logo"
            style={{ width: "15px", height: "15px" }}
          />
          <img
            src={star1}
            alt="logo"
            style={{ width: "15px", height: "15px" }}
          />
        </div>

        <div to="" className="nav_bar_menu_right">
          <img
            src={`https://menurating-back.levantsy.com/storage${adminDetails?.logo}`}
            alt="logo"
          />
        </div>
      </nav>
      {

      
      <div className="banner">
        <Link
          to={`https://menurating-back.levantsy.com/storage${adminDetails.cover}`}
        >
          <img
            src={`https://menurating-back.levantsy.com/storage${adminDetails.cover}`}
            alt="ar"
          />
        </Link>
      </div>
      }
      <div className="Details_home_page">
        <Link to={`/${username}`}>
          <img
            src={`https://menurating-back.levantsy.com/storage${adminDetails.logo}`}
            alt="logo"
          />
        </Link>
        <p
          style={{
            color: `#${
              adminDetails.color && adminDetails?.color.substring(10, 16)
            }`,
          }}
        >
          {adminDetails.menu_name}
        </p>
        {adminDetails.facebook_url && (
          <div className="d-flex align-items-center social">
            <Link target="_blank" to={adminDetails.facebook_url}>
              <img
                src={facebook}
                alt=""
                className="p-1"
                style={{
                  background: `#${
                    adminDetails.color && adminDetails?.color.substring(10, 16)
                  }`,
                }}
              />
            </Link>
          </div>
        )}

        {adminDetails.instagram_url && (
          <div className="d-flex align-items-center social">
            <Link target="_blank" to={adminDetails.instagram_url}>
              <img
                src={insta}
                alt=""
                className="p-1"
                style={{
                  background: `#${
                    adminDetails.color && adminDetails?.color.substring(10, 16)
                  }`,
                }}
              />
            </Link>
          </div>
        )}
        {adminDetails.whatsapp_phone && (
          <div className="d-flex align-items-center justify-content-center  social">
            <Link
              target="_blank"
              to={`https://wa.me/+963${adminDetails.whatsapp_phone.substring(
                0
              )}`}
            >
              <img
                src={whatss}
                alt=""
                className="p-2"
                style={{
                  background: `#${
                    adminDetails.color && adminDetails?.color.substring(10, 16)
                  }`,
                }}
              />
            </Link>
          </div>
        )}

        <Link to={`/${username}/template/5/categories`}>
          <button
            style={{
              backgroundColor: `#${
                adminDetails.color && adminDetails?.color.substring(10, 16)
              }`,
            }}
          >
            Next
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomeTemp5;
