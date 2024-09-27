import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/image/logotrans.png";
import { FaCheck } from "react-icons/fa";
 
const OtpVerification = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [otpError, setOtpError] = useState("");
  const navigate = useNavigate();
 
  // function getCookie(name) {
  //   let cookieValue = null;
  //   if (document.cookie && document.cookie !== "") {
  //     const cookies = document.cookie.split(";");
  //     for (let i = 0; i < cookies.length; i++) {
  //       const cookie = cookies[i].trim();
  //       if (cookie.substring(0, name.length + 1) === `${name}=`) {
  //         cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
  //         break;
  //       }
  //     }
  //   }
  //   return cookieValue;
  // }
 
  const handleChangeOtp = (element, index) => {
    if (isNaN(element.value)) return;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
 
    // Focus on the next input
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };
  const csrfToken = getCookie('csrftoken'); // Function to get the CSRF token
 
  function getCookie(name) {
      let cookieValue = null;
      if (document.cookie && document.cookie !== '') {
          const cookies = document.cookie.split(';');
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
 
  const handleClick = (e) => {

    e.preventDefault();
    // Make the POST request to the Django backend to resend OTP
    fetch('https://django-djreact-app-d5af3d4e3559.herokuapp.com/resend-otp/', {
      credentials: 'include', // Ensures cookies are sent
        method: 'POST', // This is a POST request to trigger the OTP resend
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
        },
    })
        .then(response => {
            // Check if the response is successful
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON response
        })
        .then(data => {
            // Process the data returned from the backend
            if (data.message) {
                console.log(data.message); // Log the message from the backend
            }
        })
        .catch(error => {
            // Handle any errors from the fetch request
            console.error('Error:', error);
        });
};
 
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join(""); 
    console.log("Otp Button Clicked");
 
    fetch("https://django-djreact-app-d5af3d4e3559.herokuapp.com/otp/", {
      method: "POST",
      credentials: "include",
      headers: {
        "X-CSRFToken": csrfToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ enteredOtp }),
    })
      .then((response) => {
        if (response.ok) {
              navigate("/Login");
        } else {
          return response.json().then((data) => {
            setOtpError(data.otp_error);
            console.log("The error is",data.otp_error);
            navigate("/OtpVerification");
          });
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };
 
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        position: "relative",
      }}
    >
      <img
        src={logo}
        style={{
          height: "140px",
          width: "170px",
          marginBottom: "50px",
        }}
        alt="Logo"
      />
      <h2>OTP Verification</h2>
      <h6>Please Enter the OTP in order to complete the registration</h6>
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {otp.map((data, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={data}
            onChange={(e) => handleChangeOtp(e.target, index)}
            onFocus={(e) => e.target.select()}
            style={{
              width: "40px",
              height: "40px",
              textAlign: "center",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              margin: "0 2px",
            }}
          />
        ))}
      </div>
      <p style={{ color: "red" }}>{otpError}</p>
      <div
        onClick={handleOtpSubmit}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "30px",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            backgroundColor: "green",
            padding: "5px 15px",
            color: "#fff",
            borderRadius: "5px",
          }}
        >
          Verify OTP
        </div>
      </div>
 
      <div
        style={{
          position: "absolute",
          bottom: "120px",
          width: "100%",
          textAlign: "end",
          cursor: "pointer",
          paddingRight: "80px",
        }}
      >
     
            <button onClick={handleClick}>Resend OTP</button>
        </div>    
    </div>
  );
};
 
export default OtpVerification;