import { useLocation } from 'react-router-dom';
import Headerdealer from '../../component/Headerdealer';


function Dealerorderview() {
  const location = useLocation();
  const { item } = location.state || {}; // Destructure the item object from state

  if (!item) {
    return <p>No order details available.</p>;
  }

  return (
<>
<Headerdealer/>
<div className="container-fluid topbottom">
      <h3 style={{ fontWeight: "bold" }}>Order Details</h3>
      <p><strong>ID:</strong> {item.id}</p>
      <p><strong>Order:</strong> {item.name}</p>
      <p><strong>Amount:</strong> {item.amount}</p>
      <p><strong>Status:</strong> {item.status}</p>
    </div>
    
</>
  );
}

export default Dealerorderview;
