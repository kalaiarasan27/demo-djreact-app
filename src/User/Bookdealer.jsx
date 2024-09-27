import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css"; 
import { useNavigate } from 'react-router-dom';
import Header from '../component/Header';

const Bookdealer = () => {
  const [selectDate, setSelectDate] = useState(new Date()); 
  const [selectTime, setSelectTime] = useState(new Date()); 

  const handleDateChange = (date) => {
    if (date) {
      setSelectDate(date);
    }
  };

  const handleTimeChange = (date) => {
    if (date) {
      setSelectTime(new Date(date.setFullYear(selectDate.getFullYear(), selectDate.getMonth(), selectDate.getDate())));
    }
  };
  const navigate = useNavigate()

  return (
    <>
    <Header/>
      <div className="container-fluid topbottom-user">
        <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
          <div
            style={{
              display: "flex",
              padding: "20px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "30px", fontWeight: "800", color: "#000" }}>
              Confirm Details
            </span>
          </div>
          <div>
            <span style={{ fontSize: "20px", fontWeight: "800", color: "#000" }}>
              Address
            </span>
            <textarea style={{ width: "100%", height: "150px" }} />
          </div>
          <div className="row">
            <div className="col-6 col-lg-6 col-md-12 col-sm-12 mt-4 d-flex flex-column">
              <span style={{ fontSize: "20px", fontWeight: "800", color: "#000", marginBottom: "10px" }}>
                Select Date
              </span>
              <div className="datepicker-container" style={{ position: 'relative' }}>
                <DatePicker
                  selected={selectDate}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  className="form__input"
                  placeholderText="Select date"
                />
                <FaCalendarAlt style={{ position: 'absolute', right: '10px', top: '10px', fontSize: '20px' }} />
              </div>
            </div>
            <div className="col-6 col-lg-6 col-md-12 col-sm-12 mt-4 d-flex flex-column">
              <span style={{ fontSize: "20px", fontWeight: "800", color: "#000", marginBottom: "10px" }}>
                Select Time
              </span>
              <div className="datepicker-container" style={{ position: 'relative' }}>
                <DatePicker
                  selected={selectTime}
                  onChange={handleTimeChange}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  dateFormat="HH:mm"
                  className="form__input"
                  placeholderText="Select time"
                />
                <FaCalendarAlt style={{ position: 'absolute', right: '10px', top: '10px', fontSize: '20px' }} />
              </div>
            </div>
          </div>
          <div className="submit-button" onClick={()=>navigate("/Successful")}>
            Book Dealer
          </div>
        </div>
      </div>
    </>
  );
};

export default Bookdealer;
