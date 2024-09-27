import { CiSearch } from "react-icons/ci";
import { FaHome, FaUser } from "react-icons/fa";
import logo from "../assets/image/logotrans.png";
import LocationDisplay from "./LocationDisplay";
import { IoMenuSharp } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import React, { useState } from "react";
import { BiHelpCircle, BiSolidUserAccount } from "react-icons/bi";
import { FcFaq } from "react-icons/fc";
import { LuLogOut } from "react-icons/lu";
import { RiCustomerService2Line, RiListOrdered2 } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
 
const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
 
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const location = useLocation();
 
    const shouldShowSearchBar = location.pathname === "/Homeuser" || location.pathname === "/Scrapselect";
 
  return (
    <>
      <div className="container-fluid ">
        <div
          className="header-fixed"
          style={{ width: "100%", backgroundColor: "#000" }}
        >
          <div className="headersection desktop-need">
            <div className="col-3">
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={logo}
                  style={{ height: "70px", width: "80px", marginRight: "10px" }}
                  alt="logo"
                />
                <p
                  className="roboto-black header-logo-text"
                  style={{ margin: 0 }}
                >
                  RECYCHBS
                </p>
              </div>
            </div>
 
            <div className="col-6">
            <div className="desktop-need-loc">
             <div style={{display:"flex"}}>
             <FaLocationDot
              style={{
                color: "#fff",
                width: "20px",
                height: "20px",
                marginRight: "5px",
              }}
            />
            <LocationDisplay />
             </div>
             {shouldShowSearchBar && (
                  <div>
                    <CiSearch className="search-headerIcon" />
                    <input
                      type="text"
                      placeholder="What are you looking for?"
                      id="search-form"
                      className="search-header"
                    />
                  </div>
                )}
            </div>
            </div>
            <div className="col-3 d-flex flex-row justify-content-end">
              <div className="col-2 d-flex flex-column align-items-center justify-content-center">
                <div style={{cursor:"pointer"}} onClick={()=>navigate("/Homeuser")}>
                <FaHome className="icons-bottom" />
                </div>
              </div>
              <div className="col-2 d-flex flex-column align-items-center justify-content-center">
                <div style={{cursor:"pointer"}} onClick={()=>navigate("/Userlogopage")}>
                <FaUser className="icons-bottom" />
                </div>
              </div>
 
              <div className="col-2 d-flex flex-column align-items-center justify-content-center">
                <div style={{ position: "relative" }}>
                  <IoIosNotifications
                    style={{
                      height: "30px",
                      width: "30px",
                      cursor: "pointer",
                      color: "#fff",
                    }}
                    onClick={() => navigate("/Usernotification")}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: "-5px",
                      right: "-5px",
                      backgroundColor: "red",
                      color: "white",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    17
                  </span>
                </div>
              </div>
              <div
                className="col-2 d-flex  flex-column align-items-center justify-content-center"
                onClick={toggleDrawer}
              >
                <div style={{ cursor: "pointer" }} onClick={toggleDrawer}>
                  <IoMenuSharp className="icons-bottom" />
                </div>
              </div>
            </div>
          </div>
          <div className="headersection mobile-need">
            <div className="col-2">
              <div
                className="d-flex flex-row align-items-center"
                style={{ alignContent: "center" }}
              >
                <img
                  src={logo}
                  style={{ height: "60px", width: "70px",marginLeft:"10px" }}
                  alt="logo"
                />
              </div>
            </div>
            <div className="col-9">
              <div className="">
              <div style={{display:"flex"}}>
             <FaLocationDot
              style={{
                color: "#fff",
                width: "20px",
                height: "20px",
                marginRight: "5px",
              }}
            />
            <LocationDisplay />
             </div>
             {shouldShowSearchBar && (
                  <div className="mobile-need">
                    <CiSearch className="search-headerIcon" />
                    <input
                      type="text"
                      placeholder="What are you looking for?"
                      id="search-form"
                      className="search-header"
                    />
                  </div>
                )}
            </div>
            </div>
            <div className="col-1">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div style={{ position: "relative",marginRight:"10px" }}>
                  <IoIosNotifications
                    style={{
                      height: "30px",
                      width: "30px",
                      cursor: "pointer",
                      color: "#fff",
                    }}
                    onClick={() => navigate("/Usernotification")}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: "-5px",
                      right: "-5px",
                      backgroundColor: "red",
                      color: "white",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    17
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className=" bottom-fixed"
          style={{
            width: "100%",
            backgroundColor: "#000",
            paddingTop: "5px",
            paddingBottom: "5px",
          }}
        >
          <div className="col-4">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={toggleDrawer}
            >
              <IoMenuSharp className="icons-bottom" />
              <p className="icons-bottom-text p-0 m-0">Menu</p>
            </div>
          </div>
          <div className="col-4">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={()=>navigate("/Homeuser")}
            >
              <FaHome className="icons-bottom" />
              <p className="icons-bottom-text p-0 m-0">Home</p>
            </div>
          </div>
          <div className="col-4">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={()=>navigate("/Userlogopage")}
            >
              <FaUser className="icons-bottom text-center" />
              <p className="icons-bottom-text p-0 m-0">User</p>
            </div>
          </div>
        </div>
        <div
          className={`drawer ${drawerOpen ? "drawer-open" : ""}`}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "250px",
            height: "100%",
            backgroundColor: "#333",
            color: "#fff",
            transition: "transform 0.3s ease",
            transform: drawerOpen ? "translateX(0)" : "translateX(-100%)",
            zIndex: 1000,
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>
            <div
              style={{
                padding: "40px 20px",
                borderBottom: "2px solid #777",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontWeight: "800" }}>RECYCHBS</span>
              <RxCross2
                style={{ height: "20px", width: "20px", cursor: "pointer" }}
                onClick={() => setDrawerOpen(false)}
              />
            </div>
            <div style={{}}>
              <div
                className="drawer-menu"
                onClick={() => navigate("/Yourbooking")}
              >
                <RiListOrdered2
                  style={{ height: "20px", width: "20px", marginRight: "10px" }}
                />
                <span>Your Bookings</span>
              </div>
              <div
                className="drawer-menu"
                onClick={() => navigate("/Useraccount")}
              >
                <BiSolidUserAccount
                  style={{ height: "20px", width: "20px", marginRight: "10px" }}
                />
                <span>Your Account</span>
              </div>
              <div
                className="drawer-menu"
                onClick={() => navigate("/Usercustomer")}
              >
                <RiCustomerService2Line
                  style={{ height: "20px", width: "20px", marginRight: "10px" }}
                />
                <span>Customer Service</span>
              </div>
              <div
                className="drawer-menu"
                onClick={() => navigate("/Userhelp")}
              >
                <BiHelpCircle
                  style={{ height: "20px", width: "20px", marginRight: "10px" }}
                />
                <span>Help</span>
              </div>
              <div className="drawer-menu" onClick={() => navigate("/Userfaq")}>
                <FcFaq
                  style={{ height: "20px", width: "20px", marginRight: "10px" }}
                />
                <span>FAQs</span>
              </div>
            </div>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                padding: "20px 20px",
              }}
            >
              <LuLogOut
                style={{ height: "20px", width: "20px", marginRight: "10px" }}
              />
              <span>LogOut</span>
            </div>
          </div>
        </div>
 
        {drawerOpen && (
          <div
            className="overlay"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.5)",
              zIndex: 500,
            }}
            onClick={toggleDrawer}
          />
        )}
      </div>
    </>
  );
};
 
export default Header;
 
 