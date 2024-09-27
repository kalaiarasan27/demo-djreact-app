import { useNavigate } from "react-router-dom";
import Headerdealer from "../component/Headerdealer";

function Completeorder() {
  const navigate = useNavigate();

  // Retrieve data from localStorage
  const scrapData = JSON.parse(localStorage.getItem('scrapData')) || [];

  return (
    <>
      <Headerdealer />
      <div className="container-fluid topbottom">
        <div className="card-box">
          <table className="table">
            <thead>
              <tr>
                <th>No:</th>
                <th>Scrap Type:</th>
                <th>Scrap Condition:</th>
                <th>Phone Number:</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {scrapData.map((entry, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td
                    
                  >
                    {entry.scrapType}
                  </td>
                  <td>{entry.scrapCondition}</td>
              
                 
                  <td>{entry.phoneno}</td>
                  <td style={{ cursor: "pointer", color: "blue" }}
                    onClick={() => navigate("/Completeorderdetail", { state: { entry } })}>View</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Completeorder;
