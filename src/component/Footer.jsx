import { BsInstagram } from "react-icons/bs";
import { FaFacebookF, FaSnapchatGhost, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
 
const Footer = () => {
    const navigate = useNavigate()
  return (
    <div
      className="container-fluid"
      style={{ width: "100%", backgroundColor: "gray" }}
    >
      <div className="row footerpage">
        <div className="col-lg-3 col-md-6 col-sm-12">
          <div className="d-flex flex-column">
              <h6 className="footer-heading">Get To Know Us</h6>
            <Link to="/Aboutus" className="footer-subtext-link">
              <span className="footer-subtext">About us</span>
           </Link>
            <Link to="/Career" className="footer-subtext-link">
              <span className="footer-subtext">Careers</span>
           </Link>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12">
          <div className="d-flex flex-column">
            <h6 className="footer-heading">Connect With Us</h6>
            <div className="d-flex flex-row" style={{marginBottom:"20px"}}>
              <div
                className="avar"
                data-tooltip="Instagram"
                style={{
                  backgroundColor: "white",
                  position: "relative",
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  marginRight: "10px",
                  cursor:"pointer"
                }}
                onClick={()=>navigate("/Success")}
              >
                <BsInstagram style={{ color: "black" }} />
              </div>
              <div
                className="avar"
                data-tooltip="Facebook"
                style={{
                  backgroundColor: "white",
                  position: "relative",
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  marginRight: "10px",
                  cursor:"pointer"
                }}
                onClick={()=>navigate("/Success")}
              >
                <FaFacebookF style={{ color: "black" }} />
              </div>
              <div
                className="avar"
                data-tooltip="Twitter"
                style={{
                  backgroundColor: "white",
                  position: "relative",
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  marginRight: "10px",
                  cursor:"pointer"
                }}
                onClick={()=>navigate("/Success")}
              >
                <FaXTwitter style={{ color: "black" }} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12">
          <div className="d-flex flex-column">
            <h6 className="footer-heading">Make Money With Us</h6>
            <Link to="/Sellon" className="footer-subtext-link">
              <span className="footer-subtext">Sell on RECYCHBS</span>
           </Link>
            <Link to="/Fulfillment" className="footer-subtext-link">
              <span className="footer-subtext">Fulfilment by RECYCHBS</span>
           </Link>
            <Link to="/Becomedealer" className="footer-subtext-link">
              <span className="footer-subtext">
                Become an Dealer with RECYCHBS
              </span>
            </Link>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12">
          <div className="d-flex flex-column">          
              <h6 className="footer-heading">Let Us Help You</h6>
            <Link to="/Useraccount" className="footer-subtext-link">
              <span className="footer-subtext">Your Account</span>
           </Link>
            <Link to="/BookingProtection" className="footer-subtext-link">
              <span className="footer-subtext">100% Booking Protection</span>
           </Link>
            <Link to="/Successful" className="footer-subtext-link">
              <span className="footer-subtext">RECYCHBS App Download</span>
           </Link>
            <Link to="/Successful" className="footer-subtext-link">
              <span className="footer-subtext">Help</span>
           </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;