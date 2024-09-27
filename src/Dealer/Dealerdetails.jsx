import React, { useState, useRef } from "react";
import { FiUploadCloud } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Headerdealer from "../component/Headerdealer";
import Bottomdealer from "../component/Bottomdealer";
 
const Dealerdetails = () => {
  const navigate = useNavigate();
 
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    mailId: "",
    dateOfBirth: new Date(),
    aadharNumber: "",
    panCardNumber: "",
    licenseNumber: "",
    vehicleNumber: "",
    address: "",
    city: "",
    state: "",
    postcode: "",
    nationality: "",
    bankAccountNumber: "",
    ifscCode: "",
    bankAccountName: "",
  });
 
  const [errors, setErrors] = useState({});
  const [fileNames, setFileNames] = useState({
    aadhar: "",
    panCard: "",
    license: "",
    vehicle: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select Vehicle Type");
  const [options] = useState(["2 wheeler", "3 wheeler", "4 wheeler"]);
  const fileInputRefs = {
    aadhar: useRef(null),
    panCard: useRef(null),
    license: useRef(null),
    vehicle: useRef(null),
  };
 
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
 
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "dateOfBirth") {
      const date = new Date(value);
      if (isNaN(date.getTime()) || date > new Date()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          dateOfBirth: "Date of Birth cannot be in the future",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          dateOfBirth: "",
        }));
      }
    }
    let errorMessage = "";
 
    if (value.trim() === "") {
      // Clear errors if input is empty
      errorMessage = "";
    } else {
      // Existing validation logic
      if (name === "name" && !/^[a-zA-Z\s]+$/.test(value)) {
        errorMessage = "Invalid Username";
      } else if (name === "phoneNumber") {
        if (!/^\d{10}$/.test(value)) {
          errorMessage = "Phone number must be exactly 10 digits";
        }
      } else if (name === "aadharNumber") {
        if (!/^\d{12}$/.test(value)) {
          errorMessage = "Aadhar number must be exactly 12 digits";
        }
      } else if (name === "panCardNumber") {
        if (!/^[a-zA-Z]{5}\d{4}[a-zA-Z]{1}$/.test(value)) {
          errorMessage = "PAN card number must be exactly 10 digits";
        }
      } else if (name === "bankAccountNumber" && !/^\d+$/.test(value)) {
        errorMessage = "Bank account number must contain only digits";
      } else if (
        name === "city" ||
        name === "state" ||
        name === "nationality"
      ) {
        if (!/^[a-zA-Z\s]+$/.test(value)) {
          errorMessage = `${
            name.charAt(0).toUpperCase() + name.slice(1)
          } can only contain letters and spaces`;
        }
      } else if (name === "postcode" && !/^\d+$/.test(value)) {
        errorMessage = "Postcode must contain only digits";
      } else if (name === "mailId") {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errorMessage = "Please enter a valid email address";
        }
      } else if (name === "licenseNumber") {
        if (!/^[A-Z0-9]{16}$/.test(value)) {
          errorMessage =
            "Driving License must be exactly 16 digits & uppercase letters";
        }
      } else if (name === "vehicleNumber") {
        if (!/^[a-zA-Z0-9]{1,10}$/.test(value)) {
          errorMessage = "Vehicle Number must be exactly 10 digits";
        }
      } else if (name === "postcode") {
        if (!/^\d{6}$/.test(value)) {
          errorMessage = "Postcode must be exactly 6 digits";
        }
      } else if (name === "ifscCode") {
        if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value)) {
          errorMessage = "IFSC code must be uppercase letters / 11 Alphanumeric characters.";
        }
      }
    }
 
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };
 
  const handleDateChange = (date) => {
    if (date && date > new Date()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        dateOfBirth: "Date of Birth cannot be in the future",
      }));
      return;
    }
 
    setFormData((prevData) => ({
      ...prevData,
      dateOfBirth: date,
    }));
 
    setErrors((prevErrors) => ({
      ...prevErrors,
      dateOfBirth: "",
    }));
  };
 
  const handleFileChange = (fileType) => (e) => {
    const file = e.target.files[0];
    setFileNames((prevFileNames) => ({
      ...prevFileNames,
      [fileType]: file ? file : null,
    }));
 
    // Clear the error for the specific file type once a file is selected
    if (file) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fileType]: "",  // Remove error message for the specific file type
      }));
    }
  };
 
 
  const handleIconClick = (fileType) => {
    fileInputRefs[fileType].current.click();
  };
 
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    setErrors((prevErrors) => ({
      ...prevErrors,
      vehicleType: "",
    }));
  };
 
  const validateForm = () => {
    const newErrors = {};
 
    if (!formData.name || !/^[a-zA-Z\s]+$/.test(formData.name))
      newErrors.name = "Valid name is required";
    if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber))
      newErrors.phoneNumber = "Valid phone number is required";
    if (!formData.mailId) newErrors.mailId = "Mail ID is required";
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of Birth is required";
    if (!formData.aadharNumber || !/^\d{12}$/.test(formData.aadharNumber))
      newErrors.aadharNumber = "Valid Aadhar Number is required";
    if (
      !formData.panCardNumber ||
      !/^[a-zA-Z]{5}\d{4}[a-zA-Z]{1}$/.test(formData.panCardNumber)
    ) {
      newErrors.panCardNumber = "Valid PAN Card Number is required";
    }
    if (
      !formData.licenseNumber ||
      !/^[A-Z0-9]{16}$/.test(formData.licenseNumber)
    )
      newErrors.licenseNumber = "Valid Driving License Number is required";
    if (
      !formData.vehicleNumber ||
      !/^[a-zA-Z0-9]{1,10}$/.test(formData.vehicleNumber)
    )
      newErrors.vehicleNumber = "Valid Vehicle Number is required";
    if (selectedOption === "Select Vehicle Type")
      newErrors.vehicleType = "Vehicle Type must be selected";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city || !/^[a-zA-Z\s]+$/.test(formData.city))
      newErrors.city = "Valid city is required";
    if (!formData.state || !/^[a-zA-Z\s]+$/.test(formData.state))
      newErrors.state = "Valid state is required";
    if (!formData.postcode || !/^\d{6}$/.test(formData.postcode))
      newErrors.postcode = "Valid Postcode is required";
    if (!formData.nationality || !/^[a-zA-Z\s]+$/.test(formData.nationality))
      newErrors.nationality = "Valid nationality is required";
    if (
      !formData.bankAccountNumber ||
      !/^\d+$/.test(formData.bankAccountNumber)
    )
      newErrors.bankAccountNumber = "Valid Bank Account Number is required";
    if (
      !formData.ifscCode ||
      !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode)
    ) {
      newErrors.ifscCode = "IFSC code must be uppercase letters";
    }
    if (!formData.bankAccountName)
      newErrors.bankAccountName = "Bank Account Name is required";
 
    if (!fileNames.aadhar) newErrors.aadhar = "Aadhar image is required";
    if (!fileNames.panCard) newErrors.panCard = "PAN Card image is required";
    if (!fileNames.license)
      newErrors.license = "Driving License image is required";
    if (!fileNames.vehicle) newErrors.vehicle = "RC Book image is required";
 
    return newErrors;
  };
 
  const handleSubmit = async () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
 
    const uploadFile = new FormData();
 
    for (const [key, value] of Object.entries(formData)) {
      uploadFile.append(key, value);
    }
   
    for (const [key, file] of Object.entries(fileNames)) {
      if (file) {
        uploadFile.append(key, file);
      }
    }
   
    uploadFile.append("vehicleType", selectedOption);
 
    const csrfToken = getCookie("csrftoken");
 
    function getCookie(name) {
      let cookieValue = null;
      if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          if (cookie.substring(0, name.length + 1) === `${name}=`) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
          }
        }
      }
      return cookieValue;
    }
 
    try {
      // Send the form data to the server
      const response = await fetch(
        "https://django-djreact-app-d5af3d4e3559.herokuapp.com/dealer_details/",
        {
          method: "POST",
          body: uploadFile,
          credentials: "include",
          headers: {
            "X-CSRFToken": csrfToken,
          },
        }
      );
 
      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        // Navigate to the application status page on successful response
        navigate("/Applicationstatus");
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
 
 
  return (
    <>
      <div className="container-fluid phonemail-gap" style={{ width: "100%" }}>
        <div className="agentdetails" id="agentdetails">
          <h2 className="text-center" style={{ fontWeight: "700" }}>
            DEALER DETAILS
          </h2>
          <span style={{ fontWeight: "600", marginTop: "20px" }}>
            ENTER THE FOLLOWING DETAILS TO CREATE AN DEALER ACCOUNT
          </span>
 
          <div>
            <label className="HeadText">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className={`inputfield ${errors.name ? "error" : ""}`}
              autoComplete="off"
            />
            <p className="error-warning">{errors.name}</p>
          </div>
 
          <label className="HeadText">Date of Birth:</label>
          <div className="datepicker-container">
            <DatePicker
              selected={formData.dateOfBirth}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              className={`form__input ${errors.dateOfBirth ? "error" : ""}`}
              placeholderText="dd/mm/yyyy"
              maxDate={new Date()}
              // onChangeRaw={handleInputChange}
            />
            <FaCalendarAlt className="calendar_icon" />
          </div>
          <p className="error-warning">{errors.dateOfBirth}</p>
 
          <div className="phonemail">
            <div className="col-6 col-lg-6 col-sm-12 phonemail-gap">
              <label className="HeadText">Phone Number:</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                className={`inputfield ${errors.phoneNumber ? "error" : ""}`}
                autoComplete="off"
              />
              <p className="error-warning">{errors.phoneNumber}</p>
            </div>
            <div className="col-6 col-lg-6 col-sm-12">
              <label className="HeadText">Mail ID:</label>
              <input
                type="text"
                name="mailId"
                value={formData.mailId}
                onChange={handleInputChange}
                required
                className={`inputfield ${errors.mailId ? "error" : ""}`}
                autoComplete="off"
              />
              <p className="error-warning">{errors.mailId}</p>
            </div>
          </div>
 
          <div className="phonemail">
            <div className="col-6 col-lg-6 col-sm-12 phonemail-gap">
              <label className="HeadText">Aadhar Number:</label>
              <input
                type="text"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleInputChange}
                placeholder="0000-0000-0000"
                required
                className={`inputfield ps-2 ${
                  errors.aadharNumber ? "error" : ""
                }`}
                autoComplete="off"
              />
              <p className="error-warning">{errors.aadharNumber}</p>
 
              <label className="HeadText">Aadhar Image:</label>
              <div className="uploaddiv">
                <input
                  type="file"
                  ref={fileInputRefs.aadhar}
                  style={{ display: "none" }}
                  onChange={handleFileChange("aadhar")}
                />
                <div
                  onClick={() => handleIconClick("aadhar")}
                  style={{
                    cursor: "pointer",
                    fontSize: "24px",
                    flexDirection: "column",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FiUploadCloud className="uploadicon" />
                </div>
              </div>
              <p style={{ fontSize: "14px", marginTop: "10px" }}>
                Selected file:{" "}
                {fileNames.aadhar ? fileNames.aadhar.name : "No file selected"}
              </p>
              <p className="error-warning">{errors.aadhar}</p>
            </div>
 
            <div className="col-6 col-lg-6 col-sm-12 phonemail-gap">
              <label className="HeadText">PAN Card Number:</label>
              <input
                type="text"
                name="panCardNumber"
                value={formData.panCardNumber}
                onChange={handleInputChange}
                placeholder="PAN Card Number"
                required
                className={`inputfield ps-2 ${
                  errors.panCardNumber ? "error" : ""
                }`}
              />
              <p className="error-warning">{errors.panCardNumber}</p>
 
              <label className="HeadText">PAN Card Image:</label>
              <div className="uploaddiv">
                <input
                  type="file"
                  ref={fileInputRefs.panCard}
                  style={{ display: "none" }}
                  onChange={handleFileChange("panCard")}
                />
                <div
                  onClick={() => handleIconClick("panCard")}
                  style={{
                    cursor: "pointer",
                    fontSize: "24px",
                    flexDirection: "column",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FiUploadCloud className="uploadicon" />
                </div>
              </div>
              <p style={{ fontSize: "14px", marginTop: "10px" }}>
                Selected file:{" "}
                {fileNames.panCard
                  ? fileNames.panCard.name
                  : "No file selected"}
              </p>
              <p className="error-warning">{errors.panCard}</p>
            </div>
          </div>
 
          <div className="phonemail">
            <div className="col-6 col-lg-6 col-sm-12 phonemail-gap">
              <label className="HeadText">Driving License Number:</label>
              <input
                type="text"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleInputChange}
                placeholder="Driving License Number"
                required
                className={`inputfield ps-2 ${
                  errors.licenseNumber ? "error" : ""
                }`}
                autoComplete="off"
              />
              <p className="error-warning">{errors.licenseNumber}</p>
              <label className="HeadText">License Image:</label>
              <div className="uploaddiv">
                <input
                  type="file"
                  ref={fileInputRefs.license}
                  style={{ display: "none" }}
                  onChange={handleFileChange("license")}
                />
                <div
                  onClick={() => handleIconClick("license")}
                  style={{
                    cursor: "pointer",
                    fontSize: "24px",
                    flexDirection: "column",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FiUploadCloud className="uploadicon" />
                </div>
              </div>
              <p style={{ fontSize: "14px", marginTop: "10px" }}>
                Selected file:{" "}
                {fileNames.license
                  ? fileNames.license.name
                  : "No file selected"}
              </p>
              <p className="error-warning">{errors.license}</p>
            </div>
 
            <div className="col-6 col-lg-6 col-sm-12 phonemail-gap">
              <label className="HeadText">Vehicle Number:</label>
              <input
                type="text"
                name="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={handleInputChange}
                placeholder="Vehicle Number"
                required
                className={`inputfield ps-2 ${
                  errors.vehicleNumber ? "error" : ""
                }`}
                autoComplete="off"
              />
              <p className="error-warning">{errors.vehicleNumber}</p>
              <label className="HeadText">RC Book Image:</label>
              <div className="uploaddiv">
                <input
                  type="file"
                  ref={fileInputRefs.vehicle}
                  style={{ display: "none" }}
                  onChange={handleFileChange("vehicle")}
                />
                <div
                  onClick={() => handleIconClick("vehicle")}
                  style={{
                    cursor: "pointer",
                    fontSize: "24px",
                    flexDirection: "column",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FiUploadCloud className="uploadicon" />
                </div>
              </div>
              <p style={{ fontSize: "14px", marginTop: "10px" }}>
                Selected file:{" "}
                {fileNames.vehicle
                  ? fileNames.vehicle.name
                  : "No file selected"}
              </p>
              <p className="error-warning">{errors.vehicle}</p>
            </div>
          </div>
          <label className="HeadText">Vehicle Type:</label>
          <div className="custom-dropdown">
            <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
              {selectedOption}
              {isOpen ? (
                <FaChevronUp className="dropdown-arrow" />
              ) : (
                <FaChevronDown className="dropdown-arrow" />
              )}
            </div>
            {isOpen && (
              <div className="dropdown-options">
                {options.map((option, index) => (
                  <div
                    key={index}
                    className="dropdown-option"
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
            <p className="error-warning">{errors.vehicleType}</p>
          </div>
 
          <div>
            <label className="HeadText">Bank Account Number:</label>
            <input
              type="text"
              name="bankAccountNumber"
              value={formData.bankAccountNumber}
              onChange={handleInputChange}
              required
              className={`inputfield ${
                errors.bankAccountNumber ? "error" : ""
              }`}
              autoComplete="off"
            />
            <p className="error-warning">{errors.bankAccountNumber}</p>
          </div>
 
          <div>
            <label className="HeadText">IFSC Code:</label>
            <input
              type="text"
              name="ifscCode"
              value={formData.ifscCode}
              onChange={handleInputChange}
              required
              className={`inputfield ${errors.ifscCode ? "error" : ""}`}
              autoComplete="off"
            />
            <p className="error-warning">{errors.ifscCode}</p>
          </div>
 
          <div>
            <label className="HeadText">
              User Name ( As on Bank Passbook):
            </label>
            <input
              type="text"
              name="bankAccountName"
              value={formData.bankAccountName}
              onChange={handleInputChange}
              required
              className={`inputfield ${errors.bankAccountName ? "error" : ""}`}
              autoComplete="off"
            />
            <p className="error-warning">{errors.bankAccountName}</p>
          </div>
 
          <div>
            <label className="HeadText">Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              className={`inputfield ${errors.address ? "error" : ""}`}
              autoComplete="off"
            />
            <p className="error-warning">{errors.address}</p>
          </div>
 
          <div className="phonemail">
            <div className="col-6 col-lg-6 col-sm-12 phonemail-gap">
              <label className="HeadText">City:</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                className={`inputfield ${errors.city ? "error" : ""}`}
                autoComplete="off"
              />
              <p className="error-warning">{errors.city}</p>
            </div>
 
            <div className="col-6 col-lg-6 col-sm-12 phonemail-gap">
              <label className="HeadText">State:</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
                className={`inputfield ${errors.state ? "error" : ""}`}
                autoComplete="off"
              />
              <p className="error-warning">{errors.state}</p>
            </div>
          </div>
 
          <div className="phonemail">
            <div className="col-6 col-lg-6 col-sm-12 phonemail-gap">
              <label className="HeadText">Post / PinCode:</label>
              <input
                type="text"
                name="postcode"
                value={formData.postcode}
                onChange={handleInputChange}
                required
                className={`inputfield ${errors.postcode ? "error" : ""}`}
                autoComplete="off"
              />
              <p className="error-warning">{errors.postcode}</p>
            </div>
 
            <div className="col-6 col-lg-6 col-sm-12 phonemail-gap">
              <label className="HeadText">Nationality:</label>
              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
                required
                className={`inputfield ${errors.nationality ? "error" : ""}`}
                autoComplete="off"
              />
              {message && <p style={{ color: "green" }}>{message}</p>}
              {error && <p style={{ color: "red" }}>{error}</p>}
              <p className="error-warning">{errors.nationality}</p>
            </div>
          </div>
          <div onClick={handleSubmit} className="submit-button">
            Submit
          </div>
        </div>
      </div>
    </>
  );
};
 
export default Dealerdetails;
 