import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AdvertismentsContext } from "../../context/AdvertismentsProvider";
import test from "../../assets/heee.png";
import { LanguageContext } from "../../context/LanguageProvider";
import { Modal } from "react-bootstrap";
// import arrLeft from "../assets/Arrow 4.png";
// import arrRight from "../assets/Arrow 5.png";

export default function AdvertismentSlider({num}) {
  // const [advertisments, setAdvertisments] = useState([]);

  const { advertisments } = useContext(AdvertismentsContext);
  const { language, toggleLanguage } = useContext(LanguageContext);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(null);
  const handleShow = (item) => setShowModal(item);
  useEffect(() => {
    // async function getAdvertisments() {
    //   try {
    //     const response = await axios.get(
    //       "https://menurating-back.levantsy.com/user_api/show_advertisements?adminId=1"
    //     );
    //     // console.log(response);
    //     setAdvertisments(response.data.data);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
    // getAdvertisments();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    // slidesToShow: advertisments?.length < 3 ? 2 : advertisments?.length < 4 ? advertisments?.length : 4,
    // slidesToScroll: advertisments?.length < 3 ? 2 : advertisments?.length < 4 ? advertisments?.length : 4,
    autoplay: true,
    autoplaySpeed: 2000,
    waitForAnimate: true,
    adaptiveHeight: true,
    rtl: language === 'en' ? false : true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: num,
          slidesToScroll: num,
        },
      },
    ],
  };


  return (
    <div className=" mt-4 mb-0">
      <Slider {...settings}>
        {advertisments?.map((adv) => (
          <div className="product product_temp2" key={adv.id} style={{}}>
            <img
              src={`https://menurating-back.levantsy.com/storage${adv.image_url}`}
              alt="advertisment"
              className="mt-0"
              onClick={() => handleShow(adv)}
            />


            {showModal && (
              <Modal
                show={showModal}
                onHide={handleClose}
                className="itemModal"
              >
                <div className="details_item">
                  <img
                    src={`https://menurating-back.levantsy.com/storage${showModal.image_url}`}
                    alt=""
                    className=""
                  />
                  
                  <div className="details">
                    <div className="mt-3 w-100">
                      <h3 className="text-capitalize text-center text-break">
                        {showModal.title}
                      </h3>
                      <p
                        className="text-center"
                        style={{ fontSize: "20px", color: "#000" }}
                      >
                        {`From: ${showModal.from_date}`}
                      </p>
                      <p className="text-dark text-center text-break  text-capitalize mt-3">
                        {`To: ${showModal.to_date}`}
                      </p>
                    </div>
                  </div>
                </div>
              </Modal>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
}
