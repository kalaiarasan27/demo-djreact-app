import React, { useState } from "react";
import logo from "../assets/image/logotrans.png";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaCheck } from "react-icons/fa";
 
const Login = () => {
  const [activeLogin, setActiveLogin] = useState("USER");
  //   const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // });
  const [formData, setFormData] = useState({
    user: { email: "", password: "" },
    dealer: { email: "", password: "" }
  });
  const [errors, setErrors] = useState({
    user: { email: "", password: "" },
    dealer: { email: "", password: "" }
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isUserPasswordVisible, setIsUserPasswordVisible] = useState(false);
  const [isDealerPasswordVisible, setIsDealerPasswordVisible] = useState(false);
  const [status, setStatus] = useState("");
 
  const navigate = useNavigate();
 
  const validateEmail = (email) => {
    if (email.trim() === "") {
      return "Email is required.";
    }
    if (!email.includes("@")) {
      return "Email is invalid.";
    }
    return "";
  };
 
 
  // Validate password
  const validatePassword = (password) => {
    if (password === "") {
      return "Password is required.";
    }
    if (password.length < 8) {
      return "Password should least 8 characters.";
    }
    return "";
  };
 
// Handle input change
const handleChange = (e) => {
  const { name, value } = e.target;
  const [role, field] = name.split(".");
 
  // Update form data
  setFormData((prev) => ({
    ...prev,
    [role]: {
      ...prev[role],
      [field]: value
    }
  }));
 
  setErrors((prev) => {
    const newErrors = { ...prev };
 
    if (field === "email") {
      if (value === "") {
        newErrors[role].email = "";
      } else {
        newErrors[role].email = validateEmail(value);
      }
    }
 
    if (field === "password") {
      if (value === "") {
        newErrors[role].password = "";
      } else {
        newErrors[role].password = validatePassword(value);
      }
    }
 
    return newErrors;
  });
};
 
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
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
   
    // Combine formData and the second variable
const dataToSend = {
  ...formData,         // Spread formData properties
  loginType: activeLogin // Add secondVariable as a new field
};
 
    fetch('https://django-djreact-app-d5af3d4e3559.herokuapp.com/login-form/', {
      // fetch('http://127.0.0.1:8000/login-form/ ', {
 
        method: 'POST',
        credentials: 'include', // Ensures cookies are sent
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken
        },
        body: JSON.stringify(dataToSend),
      })
      .then(response => {
        if (response.ok) {
          return response.json().then(data => {
            setMessage(data.message);
            setStatus(data.form_submitted);
            console.log(data.form_submitted);
           
             // Navigate based on login type
            if (activeLogin === "USER") {
              navigate('/Homeuser');
            } else if (activeLogin === "DEALER") {
              if (data.form_submitted === 'True'){
                navigate('/Applicationstatus');
              }else{
                navigate('/Dealerdetails');
              }
            }
          });
        } else {
          return response.json().then(data => {
            setError(data.error);
                  if (activeLogin === "USER") {
                    navigate('/');
                  } else if (activeLogin === "DEALER") {
                    navigate('/');
                  }
          });
        }
      })
      .catch(error => {
        console.log("Error:", error);
      });
 
    const role = activeLogin.toLowerCase();
    const currentErrors = { ...errors };
 
    currentErrors[role].email = validateEmail(formData[role].email);
 
    // Validate password
    currentErrors[role].password = validatePassword(formData[role].password);
 
    setErrors(currentErrors);
 
    // Check if there are any errors
    const hasErrors = Object.values(currentErrors[role]).some((error) => error);
 
    if (hasErrors) {
      return;
    }
 
    // Navigate if no errors
    // if (activeLogin === "USER") {
    //   navigate("/Homeuser");
    // } else {
    //   navigate("/Applicationstatus");
    // }
 
    // Show success toast
  
  };
 
  // Toggle password visibility
  const handleToggleUserPasswordVisibility = () => {
    setIsUserPasswordVisible(!isUserPasswordVisible);
  };
 
  const handleToggleDealerPasswordVisibility = () => {
    setIsDealerPasswordVisible(!isDealerPasswordVisible);
  };
 
  return (
    <div className="container-fluid p-0 m-0" style={{ height: "100vh" }}>
      <div className="login-container">
        <div className="col-lg-6 col-md-4 col-sm-12">
          <div className="login-left ps-3 pe-3">
            <img src={logo} className="logonew" alt="Logo" />
            <span className="logonew-text m-0 p-0">RECYCHBS</span>
          </div>
        </div>
        <div className="col-lg-6 col-md-8 col-sm-12">
          <div className="login-right">
            <div style={{ display: "flex" }}>
              <div
                onClick={() => setActiveLogin("USER")}
                style={{
                  cursor: "pointer",
                  marginRight: "50px",
                  fontWeight: activeLogin === "USER" ? "900" : "700",
                  fontSize: "20px",
                }}
              >
                <p>User Login</p>
              </div>
              <div
                onClick={() => setActiveLogin("DEALER")}
                style={{
                  cursor: "pointer",
                  fontWeight: activeLogin === "DEALER" ? "900" : "700",
                  fontSize: "20px",
                }}
              >
                <p>Dealer Login</p>
              </div>
            </div>
            {activeLogin === "USER" && (
              <div className="login-box foruser">
                <h2 className="login-heading">LOGIN</h2>
                <form onSubmit={handleSubmit}>
                  <label className="login-label">
                    Email:
                    <input
                      type="text"
                      name="user.email"
                      value={formData.user.email}
                      onChange={handleChange}
                      className="login-input"
                      style={{ borderColor: errors.user.email ? "red" : "" }}
                      autoComplete="off"
                    />
                    {errors.user.email && (
                      <div className="error-text">{errors.user.email}</div>
                    )}
                  </label>
                  <label className="login-label">
                    Password:
                    <div style={{ position: "relative" }}>
                      <input
                        type={isUserPasswordVisible ? "text" : "password"}
                        name="user.password"
                        value={formData.user.password}
                        onChange={handleChange}
                        className="login-input"
                        style={{ borderColor: errors.user.password ? "red" : "" }}
                        autoComplete="off"
                      />
                      <div
                        className="password-icon"
                        onClick={handleToggleUserPasswordVisibility}
                        style={{ position: "absolute", right: "10px", top: "-25px", transform: "translateY(-50%)", cursor: "pointer" }}
                      >
                        {isUserPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                      </div>
                    </div>
                    {errors.user.password && (
                      <div className="error-text">{errors.user.password}</div>
                    )}
                  </label>
                  <a
                    // href="/Forgotpassword"
                    href="/password_reset/"
                    style={{ textDecoration: "none" }}
                    className="forgot-password-link"
                  >
                    Forgot Password?
                  </a>
                  {message && <p style={{ color: "green" }}>{message}</p>}
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  <button
                    type="submit"
                    style={{ textDecoration: "none" }}
                    className="login-button"
                  >
                    Login
                  </button>
                </form>
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: "700",
                    marginTop: "20px",
                    textAlign: "center",
                  }}
                >
                  New User?{" "}
                  <a href="/RegisterUser" style={{ textDecoration: "none" }}>
                    Register
                  </a>
                </p>
              </div>
            )}
 
            {activeLogin === "DEALER" && (
              <div className="login-box fordealer">
                <h2 className="login-heading">LOGIN</h2>
                <form onSubmit={handleSubmit}>
                  <label className="login-label">
                    Email:
                    <input
                      type="text"
                      name="dealer.email"
                      value={formData.dealer.email}
                      onChange={handleChange}
                      className="login-input"
                      style={{ borderColor: errors.dealer.email ? "red" : "" }}
                      autoComplete="off"
                    />
                    {errors.dealer.email && (
                      <div className="error-text">{errors.dealer.email}</div>
                    )}
                  </label>
                  <label className="login-label">
                    Password:
                    <div style={{ position: "relative" }}>
                      <input
                        type={isDealerPasswordVisible ? "text" : "password"}
                        name="dealer.password"
                        value={formData.dealer.password}
                        onChange={handleChange}
                        className="login-input"
                        style={{ borderColor: errors.dealer.password ? "red" : "" }}
                        autoComplete="off"
                      />
                      <div
                        className="password-icon"
                        onClick={handleToggleDealerPasswordVisibility}
                        style={{ position: "absolute", right: "10px", top: "-25px", transform: "translateY(-50%)", cursor: "pointer" }}
                      >
                        {isDealerPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                      </div>
                    </div>
                    {errors.dealer.password && (
                      <div className="error-text">{errors.dealer.password}</div>
                    )}
                  </label>
                  <a
                    // href="/Forgotpassword"
                    href="/password_reset/"
                    style={{ textDecoration: "none" }}
                    className="forgot-password-link"
                  >
                    Forgot Password?
                  </a>
                  {message && <p style={{ color: "green" }}>{message}</p>}
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  <button
                    type="submit"
                    style={{ textDecoration: "none" }}
                    className="login-button"
                  >
                    Login
                  </button>
                </form>
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: "700",
                    marginTop: "20px",
                    textAlign: "center",
                  }}
                >
                  New User?{" "}
                  <a href="/Register1" style={{ textDecoration: "none" }}>
                    Register
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default Login;