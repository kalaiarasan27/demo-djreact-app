import Header from "../component/Header";
import bottle from "../assets/image/bottle.jpeg";
import card from "../assets/image/card.jpeg";
import cocount from "../assets/image/cocount.jpeg";
import drum from "../assets/image/drum.jpeg";
import glass from "../assets/image/glass.jpeg";
import iron2 from "../assets/image/iron2.jpeg";
import mbl from "../assets/image/mbl.jpeg";
import paper from "../assets/image/paper.jpeg";
import scrap from "../assets/image/scrap.jpeg";
import scrap1 from "../assets/image/scrap1.jpeg";
import scrap2 from "../assets/image/scrap2.jpeg";
import scrap3 from "../assets/image/scrap3.jpeg";
import scrap4 from "../assets/image/scrap4.jpeg";
import tyre from "../assets/image/tyre.jpeg";
import wire from "../assets/image/wire.jpeg";
import { useRef, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Scrapselect = () => {
  const scrapDetail = [
    { title: "PLASTIC", cost: 500, scrapimg: bottle },
    { title: "CARBOARD", cost: 556, scrapimg: card },
    { title: "COCONUT SHELL", cost: 500, scrapimg: cocount },
    { title: "SYNTEX TANKS", cost: 500, scrapimg: drum },
    { title: "GLASSES", cost: 570, scrapimg: glass },
    { title: "IRON", cost: 556, scrapimg: iron2 },
    { title: "E-WASTE", cost: 556, scrapimg: mbl },
    { title: "NOTE & BOOKS", cost: 556, scrapimg: paper },
    { title: "PVC PIPES", cost: 556, scrapimg: scrap },
    { title: "BRONZE", cost: 556, scrapimg: scrap1 },
    { title: "ALUMINIUM", cost: 556, scrapimg: scrap2 },
    { title: "COPPER", cost: 556, scrapimg: scrap3 },
    { title: "BATTERIES", cost: 556, scrapimg: scrap4 },
    { title: "TYRES", cost: 556, scrapimg: tyre },
    { title: "ELECTRICAL WIRES", cost: 556, scrapimg: wire },
  ];
  const [showInput, setShowInput] = useState(false);

  const handleToggleInput = () => {
    setShowInput((prevState) => !prevState);
  };

  const fileInputRef = useRef(null);
  const handleClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected file:', file);
    }
  };

  const navigate = useNavigate()
  return (
    <>
      <Header />
      <div className="container-fluid topbottom-user">
        <div
          style={{
            display: "flex",
            padding: "20px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "30px", fontWeight: "800", color: "#000" }}>
            Select the Scraps
          </span>
        </div>
        <div className="row">
          {scrapDetail.map((item, index) => (
            <div key={index} className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="pricecard">
                <div className="col-6">
                  <img
                    src={item.scrapimg}
                    className="scrapimg-select"
                  />
                </div>
                <div className=" col-3 d-flex">
                <div className="flex-column d-flex">
                <span>{item.title}</span>
                <span>{item.cost}</span>
                </div>
                </div>
                <div className="col-3 d-flex align-items-center justify-content-center">
                  <input
                    type="checkbox"
                    style={{ height: "20px", width: "20px", cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="otherscrap" onClick={handleToggleInput}>
            Other Scraps
          </div>
          {showInput && (
            <div className="otherscrap-upload">
              <input
        type="file"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
              <div
                style={{
                  cursor: "pointer",
                  fontSize: "24px",
                  flexDirection: "column",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={handleClick}
              >
                <FiUploadCloud className="uploadicon" />
                <span style={{ fontSize: "12px" }}>Upload scrap image</span>
              </div>
            </div>
          )}
        </div>
        <div className="submit-button"  onClick={()=>navigate("/Bookdealer")}>Confirm</div>
      </div>
    </>
  );
};

export default Scrapselect;
