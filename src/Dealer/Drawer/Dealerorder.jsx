import { useNavigate } from "react-router-dom";
import Headerdealer from "../../component/Headerdealer";


function Dealerorder() {
  const order = [
    {
      id: 1,
      name: "order 1",
      amount: "amt",
      status: "view",
    },
    {
      id: 2,
      name: "order 2",
      amount: "amt",
      status: "view",
    },
    {
      id: 3,
      name: "order 3",
      amount: "amt",
      status: "view",
    },
  ];

  const navigate = useNavigate();

  return (
    <>
      <Headerdealer />
      <div className="topbottom">
        <div className="card-box">
          <table className="table">
            <thead>
              <tr>
                <th>Order ID:</th>
                <th>NAME:</th>
                <th>AMOUNT:</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {order.map((item) => (
                <tr key={item.id}>
                  <th scope="row">{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.amount}</td>
                  <td
                    onClick={() =>
                      navigate("/Dealerorderview", { state: { item } })
                    }
                    style={{ cursor: "pointer", color: "blue" }}
                  >
                    {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
    </>
  );
}

export default Dealerorder;
