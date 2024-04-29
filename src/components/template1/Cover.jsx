import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AdminContext } from "../../context/AdminProvider";
import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageProvider";
import { Link } from "react-router-dom";

export default function Cover() {
  const { adminDetails, updateUsername } = useContext(AdminContext);
  const { language, toggleLanguage } = useContext(LanguageContext);
  // const handleUpdateUsername = () => {
  //   updateUsername(username);
  // };
  
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // slidesToShow: advertisments?.length < 3 ? 2 : advertisments?.length < 4 ? advertisments?.length : 4,
    // slidesToScroll: advertisments?.length < 3 ? 2 : advertisments?.length < 4 ? advertisments?.length : 4,
    autoplay: true,
    autoplaySpeed: 2000,
    waitForAnimate: true,
    adaptiveHeight: true,
    rtl: language === "en" ? false : true,
  };
  return (
    <Slider {...settings}>
      <div className="banner">
        {
          <Link
            to={`https://menurating-back.levantsy.com/storage${adminDetails.cover}`}
          >
            <img
              src={`https://menurating-back.levantsy.com/storage${adminDetails.cover}`}
              alt="ar"
            />
          </Link>
          // <img src={img1} alt="ar" />
        }
      </div>
      {adminDetails?.is_rate === 1 && (
        <Link
          to={`/${adminDetails.name}/rating`}
          className="banner_rating flex-column"
        >
          <div>
            <h3>Rate Us</h3>
          </div>
          <div className="rating_flex">
            <img
              src={`https://menurating-back.levantsy.com/storage${adminDetails?.bad_image}`}
              alt=""
              width={50}
            />
            <img
              src={`https://menurating-back.levantsy.com/storage${adminDetails?.good_image}`}
              alt=""
              width={50}
            />
            <img
              src={`https://menurating-back.levantsy.com/storage${adminDetails?.perfect_image}`}
              alt=""
              width={50}
            />
          </div>
        </Link>
      )}
    </Slider>
  );
}
