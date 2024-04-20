import { Link, useNavigate, useParams } from "react-router-dom";
import search from "../../assets/icon _search outline_.png";
import vector from "../../assets/Vector.png";
import vector2 from "../../assets/Vector (1).png";
import facebook from "../../assets/pngegg.png";
import insta from "../../assets/insta.png";
import img2 from "../../assets/dsfsf 1.png";
import img1 from "../../assets/new.png";
import star from "../../assets/Star.png";
import star1 from "../../assets/Star (1).png";
import starAngry from "../../assets/star angry 2.png";
import starGood from "../../assets/star good 2.png";
import starHappy from "../../assets/star happy 2.png";
import starConfused from "../../assets/star confused 1.png";
import { Dropdown, Form, Modal, Spinner, Button } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminProvider";
import test from "../../assets/574ee867a5 1.jpg";
import axios from "axios";
import WhatssappIcon from "../utility/WhatssappIcon";
import { LanguageContext } from "../../context/LanguageProvider";
import notFound from "../../assets/pngegg(14).png";

function Ratings() {
  const [showModal, setShowModal] = useState(false);
  const [afterRate, setAfterRate] = useState(true);

  const { adminDetails, updateUsername, loading } = useContext(AdminContext);
  const navigate = useNavigate();
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleChange = () => {};
  const [step, setStep] = useState(1);
  const [notes, setNotes] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedType, setSelectedType] = useState("person");
  const [rate, setRate] = useState(1);
  const [isValid, setIsValid] = useState(false);
  const [selectImg, setSelectImg] = useState(1);
  const [isPress, setIsPress] = useState(false);
  const { username } = useParams();
  // console.log(username);
  // console.log(adminDetails?.menu_id || 5);
  // console.log(adminDetails?.color);

  // let color = adminDetails?.color;
  // let substring = color.substring(10,16); // Extract substring starting from index 3
  // console.log(substring); 


  const { language, toggleLanguage } = useContext(LanguageContext);

  const handleNextStep = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setSelectedType("person");
    setStep(step - 1);
  };

  const handleUpdateUsername = () => {
    updateUsername(username);
  };
  useEffect(() => {
    handleUpdateUsername();
  }, []);

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   if (afterRate) {
  //     setTimeout(() => {
  //       // navigate(`/template/${adminDetails.menu_id}/home`)
  //       navigate(`/template/2/home`);
  //     }, 1000);
  //   } else {
  //     // code
  //   }
  //   console.log("object");
  // };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhoneNumber(event.target.value);

    // const phoneRegex = /^09\d{8}$/;
    // const phoneRegex = /^09[0-689]\d{7}$/;
    // const phoneRegex = /^(?!09[127])09\d{8}$/;
    const phoneRegex = /^(?!09[127])09(?:([0-9])(?!\1{5})){8}$/;
    setIsValid(phoneRegex.test(event.target.value));
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };
  const handleCheckboxChange = (event) => {
    setSelectedGender(event.target.value);
  };
  const handleCheckboxChangeType = (event) => {
    setSelectedType(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedType === "person") {
      if (
        phoneNumber === "" ||
        name === "" ||
        age === "" ||
        selectedGender === ""
      ) {
        return;
      }
    }

    try {
      setIsPress(true);
      const response = await axios.post(
        `https://menurating-back.levantsy.com/user_api/add_rate?adminId=${adminDetails?.id}`,
        {
          note: notes,
          phone: phoneNumber,
          name,
          birthday: age,
          gender: selectedGender,
          type: selectedType,
          rate,
        }
      );
      setIsPress(false);
      console.log("Data submitted successfully:", response.data);
    } catch (e) {
      setIsPress(false);
      console.log(e);
    }
    // Reset the form and close the modal
    setNotes("");
    setPhoneNumber("");
    setName("");
    setAge("");
    setStep(1);
    setSelectedType("person");
    handleClose();
    setIsValid(false);
  };

  return (
    <div style={{ height: "100vh" }}>
      {loading === false ? (
        adminDetails && Object.keys(adminDetails).length > 0 ? (
          <>
            <nav
              className="nav_bar_menu px-3"
              style={{
                backgroundColor: `#${adminDetails.color &&adminDetails?.color.substring(10,16)}`,
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
                    style={{ backgroundColor: `#${adminDetails.color &&adminDetails?.color.substring(10,16)}` }}
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
                {
                  // <Link to="">
                  //   <img src={vector2} alt="arrow" />
                  // </Link>
                  // <Link to={adminDetails.facebook_url}>
                  //   <img src={facebook} alt="arrow" />
                  // </Link>
                  // <Link to={adminDetails.instagram_url}>
                  //   <img src={insta} alt="arrow" />
                  // </Link>
                }
              </div>
            </nav>

            <div className="banner">
              {
                <img
                  src={`https://menurating-back.levantsy.com/storage${adminDetails?.cover}`}
                  alt="ar"
                />
                // <img
                //   src={test}
                //   alt="ar"
                // />
              }
            </div>
            {
              // <div className="logo2">
              //   <img
              //     src={`https://menurating-back.levantsy.com/storage${adminDetails.logo}`}
              //     alt="logo"
              //   />
              // </div>
            }

            <div className="description">
              <h3>Description</h3>
              <p>{adminDetails?.description}</p>
              <h3>Rate your experience :</h3>
              <div className="d-flex justify-content-center align-items-center">
                <img
                  src={`https://menurating-back.levantsy.com/storage${adminDetails?.bad_image}`}
                  alt=""
                  onClick={() => {
                    handleShow();
                    setAfterRate(false);
                    setSelectImg(1);
                    setRate(1);
                    
                  }}
                />
                <img
                  src={`https://menurating-back.levantsy.com/storage${adminDetails?.good_image}`}
                  alt=""
                  onClick={() => {
                    handleShow();
                    setAfterRate(false);
                    setSelectImg(2);
                    setRate(2);
                  }}
                />
                <img
                  src={`https://menurating-back.levantsy.com/storage${adminDetails?.perfect_image}`}
                  alt=""
                  onClick={() => {
                    handleShow();
                    setAfterRate(true);
                    setSelectImg(3);
                    setRate(3);
                  }}
                />
              </div>
              <Link to={`/${username}/template/${adminDetails?.menu_id}/home`}>
                <button style={{ backgroundColor: `#${adminDetails.color &&adminDetails?.color.substring(10,16)}` }}>
                  Next
                </button>
              </Link>
            </div>

            <Modal show={showModal} onHide={handleClose} className="rateModal">
              <Form
                className="container_rate"
                style={{
                  height: `${
                    selectedType === "anonymous" ? "300px" : "450px"
                  } `,
                }}
                onSubmit={(e)=>e.preventDefault()}
              >
                {selectImg === 1 ? (
                  <>
                  <img
                    src={`https://menurating-back.levantsy.com/storage${adminDetails?.bad_image}`}
                    alt=""
                    className=""
                  />
                  <p>{adminDetails?.message_bad}</p>
                  </>
                ) : selectImg === 2 ? (
                  <>
                  <img
                    src={`https://menurating-back.levantsy.com/storage${adminDetails?.good_image}`}
                    alt=""
                    className=""
                  />
                  <p>{adminDetails?.message_good}</p>

                  </>
                ) : selectImg === 3 ? (
                  <>
                  <img
                    src={`https://menurating-back.levantsy.com/storage${adminDetails?.perfect_image}`}
                    alt=""
                    className=""
                  />
                  <p>{adminDetails?.message_perfect}</p>

                  </>
                ) : (
                  ""
                )}
                
                {step === 1 && (
                  <>
                    <label>Your notes:</label>
                    <input
                      value={notes}
                      onChange={handleNotesChange}
                      type="text"
                      className=""
                    />
                    <label>Phone number:</label>
                    <input
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      type="number"
                      placeholder=""
                      className=""
                      required
                    />
                    {isValid ? (
                      <p style={{ color: "green" }}>Phone number is valid!</p>
                    ) : (
                      <p style={{ color: "red" }}>
                        Phone number is not valid
                      </p>
                    )}
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="d-flex">
                      <input
                        type="checkbox"
                        id="personCheckbox"
                        value="person"
                        className=""
                        checked={selectedType === "person"}
                        onChange={handleCheckboxChangeType}
                      />
                      <label htmlFor="personCheckbox" className="pr-4 pl-2">
                        Person
                      </label>

                      <input
                        type="checkbox"
                        id="anonCheckbox"
                        value="anonymous"
                        checked={selectedType === "anonymous"}
                        onChange={handleCheckboxChangeType}
                      />
                      <label htmlFor="anonCheckbox" className="pr-4 pl-2">
                        Anonymous
                      </label>
                    </div>

                    {selectedType === "person" ? (
                      <>
                        <div className="d-flex">
                          <input
                            type="checkbox"
                            id="maleCheckbox"
                            value="male"
                            className=""
                            checked={selectedGender === "male"}
                            onChange={handleCheckboxChange}
                          />
                          <label htmlFor="maleCheckbox" className="pr-4 pl-2">
                            Male
                          </label>

                          <input
                            type="checkbox"
                            id="femaleCheckbox"
                            value="female"
                            checked={selectedGender === "female"}
                            onChange={handleCheckboxChange}
                          />
                          <label htmlFor="femaleCheckbox" className="pr-4 pl-2">
                            Female
                          </label>
                        </div>
                        <label>Name:</label>
                        <input
                          value={name}
                          onChange={handleNameChange}
                          type="text"
                          className=""
                        />
                        <label>Age:</label>
                        <input
                          value={age}
                          onChange={handleAgeChange}
                          type="number"
                          className=""
                        />
                      </>
                    ) : (
                      ""
                    )}
                  </>
                )}

                {
                  //   !afterRate ? (
                  //   step === 1 && (
                  //     <>
                  //       <label>Your notes:</label>
                  //       <input onChange={handleChange} type="text" className="" />
                  //       <label>Phone number:</label>
                  //       <input onChange={handleChange} type="number" className="" />
                  //     </>
                  //   )
                  // ) : (
                  //   <>
                  //     <h2>Perfect !</h2>
                  //     <p className="text-center px-3">
                  //       Lorem ipsum dolor sit amet consectetur. Nisi aenean porttitor
                  //       blandit scelerisque urna habitant faucibus dui. At massa sed
                  //       ipsum eget purus.
                  //     </p>
                  //   </>
                  // )
                }
                <div className="d-flex">
                  {step > 1 && (
                    <button onClick={handlePreviousStep} className="mr-2" style={{ backgroundColor: `#${adminDetails.color &&adminDetails?.color.substring(10,16)}` }}>
                      Previous
                    </button>
                  )}
                  {step < 2 ? (
                    isValid ? (
                      <button onClick={handleNextStep} style={{ backgroundColor: `#${adminDetails.color &&adminDetails?.color.substring(10,16)}` }}>Next</button>
                    ) : (
                      <button onClick={handleNextStep} disabled style={{ backgroundColor: `#${adminDetails.color &&adminDetails?.color.substring(10,16)}` }}>
                        Next
                      </button>
                    )
                  ) : isPress === true ? (
                    <button>
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </button>
                  ) : (
                    <button type="submit" onClick={handleSubmit} style={{ backgroundColor: `#${adminDetails.color &&adminDetails?.color.substring(10,16)}` }}>
                      Submit
                    </button>
                  )}
                </div>
              </Form>
            </Modal>
          </>
        ) : (
          <div className=" h-100">
            <div className="alert alert-primary mb-5" role="alert">
              The selected admin name is invalid
            </div>
            <img src={notFound} className=" w-100 h-75" />
          </div>
        )
      ) : (
        <div className="d-flex align-items-center justify-content-center h-100">
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <Button variant="primary" disabled>
            Loading...
          </Button>
        </div>
      )}
    </div>
  );
}

export default Ratings;
