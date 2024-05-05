import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminProvider";
import { Link, useParams } from "react-router-dom";
import facebook from "../../assets/pngegg.png";
import whatss from "../../assets/واتس.png";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
const FirstHomePage = () => {
  const { adminDetails, updateUsername } = useContext(AdminContext);
  const { username } = useParams();
  const handleUpdateUsername = () => {
    updateUsername(username);
  };
  useEffect(() => {
    handleUpdateUsername();
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <div className="banner">
        <Link
          to={`https://menurating-back.levantsy.com/storage${adminDetails.cover}`}
        >
          <img
            src={`https://menurating-back.levantsy.com/storage${adminDetails.cover}`}
            alt=""
          />
        </Link>
      </div>
      <div className="Details_home_page">
        {
          // <p style={{ color: `#${adminDetails.color &&adminDetails?.color.substring(10,16)}` }}>
          //   {adminDetails.menu_name}
          // </p>
        }

        <div
          className="w-100 d-flex justify-content-start"
          style={{ gap: "15px", paddingLeft: "15px" }}
        >
          {adminDetails.facebook_url && (
            <div className="d-flex align-items-center social">
              <Link target="_blank" to={adminDetails.facebook_url}>
                <FaFacebookF
                  className="p-2"
                  color="white"
                  style={{
                    background: `#${
                      adminDetails.color &&
                      adminDetails?.color.substring(10, 16)
                    }`,
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                  }}
                />
              </Link>
            </div>
          )}
          {adminDetails.instagram_url && (
            <div className="d-flex align-items-center social">
              <Link target="_blank" to={adminDetails.instagram_url}>
                <AiOutlineInstagram
                  className="p-2"
                  color="white"
                  style={{
                    background: `#${
                      adminDetails.color &&
                      adminDetails?.color.substring(10, 16)
                    }`,
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
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
                      adminDetails.color &&
                      adminDetails?.color.substring(10, 16)
                    }`,
                  }}
                />
              </Link>
            </div>
          )}
        </div>
        <Link to={`/${username}`}>
          <img
            src={`https://menurating-back.levantsy.com/storage${adminDetails.logo}`}
            alt="logo"
          />
        </Link>
        <Link to={`/${username}/template/${adminDetails.menu_id}/home`}>
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

export default FirstHomePage;
