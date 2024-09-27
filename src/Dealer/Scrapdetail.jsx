import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Headerdealer from "../component/Headerdealer";
import { FaTrash } from 'react-icons/fa';
 
function Scrapdetail() {
  const [scrapType, setScrapType] = useState("");
  const [scrapCondition, setScrapCondition] = useState("");
  const [weight, setWeight] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [adminPhone] = useState([
    { username: "username", address: "123 Main St", phoneno: "7878787878" },
  ]);
  const [scrapEntries, setScrapEntries] = useState([]);
  const [commandQuery, setCommandQuery] = useState("");
  const [numScrapEntries, setNumScrapEntries] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();
 
  const scrapTypeMap = {
    "type 1": "Plastic",
    "type 2": "Copper",
    "type 3": "Iron",
  };
 
  const scrapConditionMap = {
    "condition 1": "Good",
    "condition 2": "Average",
    "condition 3": "Bad",
  };
 
  useEffect(() => {
    localStorage.removeItem('scrapData');
  }, []);
 
  const handleSubmit = (event) => {
    event.preventDefault();
    if (scrapEntries.length === 0) {
      setError("Please add at least one scrap entry.");
      return;
    }
 
    setError("");
 
    const entriesToSubmit = scrapEntries.map(entry => ({
      ...entry,
      address: adminPhone[0]?.address || "",
      phoneno: adminPhone[0]?.phoneno || "",
      username: adminPhone[0]?.username || "",
    }));
 
    localStorage.setItem('scrapData', JSON.stringify(entriesToSubmit));
    console.log("Scrap Entries Submitted:", entriesToSubmit);
    setScrapEntries([]);
    setNumScrapEntries(0);
    setSubtotal(0);
    setScrapType("");
    setScrapCondition("");
    setWeight("");
    setAmount("");
    setCommandQuery("");
    navigate("/Homedealer");
  };
 
  const handleAddScrap = () => {
    if (!scrapType || !scrapCondition || !weight || !amount) {
      setError("All fields are required to add a scrap entry.");
      return;
    }
 
    const newEntry = {
      scrapType,
      scrapCondition,
      weight,
      amount: parseFloat(amount),
    };
 
    setScrapEntries([...scrapEntries, newEntry]);
 
    setNumScrapEntries(prevCount => prevCount + 1);
    setSubtotal(prevSubtotal => prevSubtotal + newEntry.amount);
   
    setScrapType("");
    setScrapCondition("");
    setWeight("");
    setAmount("");
    setError("");
  };
 
  const handleDeleteScrap = (index) => {
    const updatedEntries = scrapEntries.filter((_, i) => i !== index);
    const removedAmount = scrapEntries[index]?.amount || 0;
 
    setScrapEntries(updatedEntries);
    setNumScrapEntries(prevCount => prevCount - 1);
    setSubtotal(prevSubtotal => prevSubtotal - removedAmount);
  };
 
  return (
    <>
      <Headerdealer />
      <div className="container-fluid topbottom">
        <div className="scrapdetail-container gap-2">
          {adminPhone.map((item, index) => (
            <div key={index}>
              <div>
                <span className="scrapdetail-label">Name: </span>
                <span>{item.username}</span>
              </div>
              <div>
                <span className="scrapdetail-label">Address: </span>
                <span>{item.address}</span>
              </div>
              <div>
                <span className="scrapdetail-label">Phone Number: </span>
                <span>{item.phoneno}</span>
              </div>
            </div>
          ))}
 
          <span className="scrapdetail-label">Scrap Type:</span>
          <select
            style={{ height: "40px" }}
            value={scrapType}
            onChange={(e) => setScrapType(e.target.value)}
          >
            <option value="">Select Scrap Type</option>
            <option value="type 1">Plastic</option>
            <option value="type 2">Copper</option>
            <option value="type 3">Iron</option>
          </select>
 
          <span className="scrapdetail-label">Scrap Condition:</span>
          <select
            style={{ height: "40px" }}
            value={scrapCondition}
            onChange={(e) => setScrapCondition(e.target.value)}
          >
            <option value="">Select Scrap Condition</option>
            <option value="condition 1">Good</option>
            <option value="condition 2">Average</option>
            <option value="condition 3">Bad</option>
          </select>
 
          <span className="scrapdetail-label">Weight:</span>
          <input
            style={{ height: "40px" }}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
 
          <span className="scrapdetail-label">Amount:</span>
          <input
            style={{ height: "40px" }}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
 
          <div
            style={{
              height: "150px",
              backgroundColor: "#ded9d9",
              display: "flex",
              flexDirection: "column",
              padding: "20px 10px",
              justifyContent: "space-between",
            }}
          >
            <span style={{ marginBottom: "10px" }}>{commandQuery || "Commands Query"}</span>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                style={{ marginRight: "10px", flex: 1, height: "40px" }}
                value={commandQuery}
                onChange={(e) => setCommandQuery(e.target.value)}
              />
              <button
                style={{ height: "40px" }}
                onClick={() => console.log("Command Query Sent:", commandQuery)}
              >
                Send
              </button>
            </div>
          </div>
 
          {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
 
          <button onClick={handleAddScrap}>Add Scrap</button>
 
          {scrapEntries.length > 0 && (
            <div>
              {scrapEntries.map((entry, index) => (
                <div key={index} style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ddd", position: "relative" }}>
                  <p><strong>Scrap Type:</strong> {scrapTypeMap[entry.scrapType] || entry.scrapType}</p>
                  <p><strong>Scrap Condition:</strong> {scrapConditionMap[entry.scrapCondition] || entry.scrapCondition}</p>
                  <p><strong>Weight:</strong> {entry.weight}</p>
                  <p><strong>Amount:</strong> {entry.amount}</p>
                  <button
                    onClick={() => handleDeleteScrap(index)}
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      border: "none",
                      background: "none",
                      fontSize: "25px",
                      cursor: "pointer",
                      color: "black",
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
 
              <div style={{ marginTop: "20px" }}>
                <p><strong>Total Scrap Entries:</strong> {numScrapEntries}</p>
                <p><strong>Subtotal Amount:</strong> ${subtotal.toFixed(2)}</p>
              </div>
            </div>
          )}
 
          <div className="fixed-footer">
            <div className="button" onClick={handleSubmit}>SUBMIT</div>
            <div className="button" onClick={() => navigate("/Homedealer")}>CANCEL</div>
          </div>
        </div>
      </div>
    </>
  );
}
 
export default Scrapdetail;