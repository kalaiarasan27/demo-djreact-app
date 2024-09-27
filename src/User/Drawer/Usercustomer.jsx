import { useNavigate } from "react-router-dom";
import Header from "../../component/Header";

function Usercustomer() {
  const booking = [
    {
      id: 1,
      name: "Booking 1",
      amount: "amt",
      status: "status",
    },
    {
      id: 2,
      name: "Booking 2",
      amount: "amt",
      status: "status",
    },
    {
      id: 3,
      name: "Booking 3",
      amount: "amt",
      status: "status",
    },
  ];

  const navigate = useNavigate();

  return (
   <>
   <Header/>
    <div className="topbottom-user">
     <p>hh</p>
    </div>
   </>
  );
}

export default Usercustomer;
