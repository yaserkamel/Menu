import React, { useContext, useEffect } from 'react'
import { CategoriesContext } from '../../context/CategoriesProvider';
import axios from 'axios';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import Pagination from '../template1/Pagination';
import { AdminContext } from '../../context/AdminProvider';
import { LanguageContext } from '../../context/LanguageProvider';

const CategoriesTemp4 = ({username}) => {
  const { categories, setCategories, pageCount } = useContext(CategoriesContext);
  const { adminDetails ,updateUsername} = useContext(AdminContext);

  const { language, toggleLanguage } = useContext(LanguageContext);

  const handleUpdateUsername = () => {
    updateUsername(username);
  };
  useEffect(() => {
    handleUpdateUsername();
  }, []);
  const onPress = async (page) => {
    const config = {
      headers: {
        language: language,
      },
    };
    const response = await axios.get(
      `https://menurating-back.levantsy.com/user_api/show_admin_categories?adminId=${adminDetails?.id}&page=${page}`,
      config
    );
    // console.log(response.data.data);
    setCategories(response.data.data);
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: categories?.length < 4 ? categories?.length: 4,
    slidesToScroll: 4,
    autoplay: false,
    autoplaySpeed: 2000,
    waitForAnimate: true,
    adaptiveHeight: true,
    rows:2,  
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
          rows:5,
          slidesPerRow: 2,
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  return (
    <div className="d-flex flex-column align-items-center justify-content-center ">
      <div className="offers_temp4">
      
          {categories && categories.length > 0 && categories.map((cat) => {
            return (
              <Link to={`${cat.is_sub === 1 ? `/${username}/template/4/category/${cat.id}` : `/${username}/template/4/category/${cat.id}/sub-category/0` }`} key={cat.id}>
                <div className="offer_temp4"  style={{background: `#${adminDetails.color &&adminDetails?.color.substring(10,16)}`}}>
                  <img
                    src={`https://menurating-back.levantsy.com/storage${cat.image_url}`}
                    alt="category"
                    className=''
                  />
                  <p className='text-dark font-weight-bold text-capitalize'>{cat.name}</p>
                </div>
              </Link>
            );
          })}
        
      </div>
      {
        pageCount.current > 1 ? (
        <div className='pt-3'>
        <Pagination pageCount={pageCount.current} onPress={onPress} />
        </div>
      ) : null
    }
    </div>
  )
}

export default CategoriesTemp4
