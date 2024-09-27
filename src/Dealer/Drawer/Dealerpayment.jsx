import { useNavigate } from "react-router-dom";
import Headerdealer from "../../component/Headerdealer";


function Dealerpayment() {

  const navigate = useNavigate();

  return (
   <>
   <Headerdealer/>
    <div className="topbottom">
     <p>payment</p>
    </div>
    
   </>
  );
}

export default Dealerpayment;
