import { useLocation } from "react-router-dom";
import Headerdealer from "../component/Headerdealer";

function Completeorderdetail() {
  const location = useLocation();
  const entry = location.state?.entry || {};

  return (
    <>
      <Headerdealer />
      <div className="container-fluid topbottom">
        <div className="card-box">
          <h2>Order Details</h2>
          <p><strong>Scrap Type:</strong> {entry.scrapType}</p>
          <p><strong>Scrap Condition:</strong> {entry.scrapCondition}</p>
          <p><strong>Weight:</strong> {entry.weight}</p>
          <p><strong>Amount:</strong> {entry.amount}</p>
          <p><strong>Address:</strong> {entry.address}</p>
          <p><strong>Phone Number:</strong> {entry.phoneno}</p>
          <p><strong>Date:</strong> Details from admin</p>
          <p><strong>Time:</strong> Details from admin</p>
          <p><strong>Price Given:</strong> Details from admin</p>
          <p><strong>Scrap:</strong> Details from admin</p>
          <p><strong>Status:</strong> Details from admin</p>
        </div>
      </div>
    </>
  );
}

export default Completeorderdetail;
