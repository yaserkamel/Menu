import axios from "axios";
import Slider from "react-slick";
import { useContext, useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import { CategoriesContext } from "../../context/CategoriesProvider";
import { AdminContext } from "../../context/AdminProvider";
import { LanguageContext } from "../../context/LanguageProvider";
// import food from "../assets/hot food.png";
// import Slider from "react-slick";

export default function CategoriesSlider({ username }) {
  // const [categories, setCategories] = useState([]);
  // const pageCount = useRef();
  const { adminDetails } = useContext(AdminContext);
  const { categories, setCategories, pageCount } =
    useContext(CategoriesContext);
    const { language, toggleLanguage } = useContext(LanguageContext);

  // console.log(categories);
  // console.log(adminDetails);

  // useEffect(() => {
  //   async function getCategories() {
  //     try {
  //       const config = {
  //         headers: {
  //           language: "ar",
  //         },
  //       };
  //       const response = await axios.get(
  //         "https://menurating-back.levantsy.com/user_api/show_admin_categories?adminId=1&page=1",
  //         config
  //       );
  //       console.log(response.data.data);
  //       pageCount.current = response.data.last_page;
  //       setCategories(response.data.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   getCategories();
  // }, []);

  // if (pageCount) {
  //   console.log(pageCount.current);
  // }

  const onPress = async (page) => {
    const config = {
      headers: {
        language: language,
      },
    };
    const response = await axios.get(
      `https://menurating-back.levantsy.com/user_api/show_admin_categories?adminId=${adminDetails.id}&page=${page}`,
      config
    );
    // console.log(response.data.data);
    setCategories(response.data.data);
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: categories?.length < 4 ? categories?.length : 4,
    slidesToScroll: 4,
    autoplay: false,
    autoplaySpeed: 2000,
    waitForAnimate: true,
    adaptiveHeight: true,
    responsive: [
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
          rows: 2,
          // slidesPerRow: 2,
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };
  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <div className="categories">
        
          {categories?.map((cat) => {
            return (
              <Link
                to={`/${username}/template/1/category/${cat.id}`}
                key={cat.id}
                className="a_temp1"
              >
                <div className="category_temp1">
                  <img
                    src={`https://menurating-back.levantsy.com/storage${cat.image_url}`}
                    alt="category"
                    style={{ background: `#${adminDetails.color &&adminDetails?.color.substring(10,16)}` }}
                  />
                  <p className="pt-2 text-capitalize ">{cat.name}</p>
                </div>
              </Link>
            );
          })}
        
      </div>
      {pageCount.current > 1 ? (
        <div className="">
        <Pagination pageCount={pageCount.current} onPress={onPress} />

        </div>
      ) : null}
    </div>
  );
}
