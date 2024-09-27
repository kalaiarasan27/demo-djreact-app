import { useNavigate } from "react-router-dom";
import Headerdealer from "../../component/Headerdealer";


function Dealerhelp() {

  const navigate = useNavigate();

  return (
   <>
   <Headerdealer/>
    <div className="topbottom">
     <p>help</p>
    </div>
    
   </>
  );
}

export default Dealerhelp;
