import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register1 from './screen/Register1';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './screen/Login';
import Forgotpassword from './screen/Forgotpassword';
import Success from './screen/Success';
import Notification from './screen/Notification';
import Homedealer from './Dealer/Homedealer';
import Todayscrap from './Dealer/Todayscrap';
import Dealerdetails from './Dealer/Dealerdetails';
import Scrapdetail from './Dealer/Scrapdetail';
import Completeorder from './Dealer/Completeorder';
import Completeorderdetail from './Dealer/Completeorderdetails';
import Feedback from './Dealer/Feedback';
import Applicationstatus from './Dealer/Applicationstatus';
import Dealerlogopage from './Dealer/Dealerlogopage';
import Dealeraccount from './Dealer/Drawer/Dealeraccount';
import Dealercustomer from './Dealer/Drawer/Dealercustomer';
import Dealerhelp from './Dealer/Drawer/Dealerhelp';
import Dealerorder from './Dealer/Drawer/Dealerorder';
import Dealerpayment from './Dealer/Drawer/Dealerpayment';
import Dealerorderview from './Dealer/Drawer/Dealerorderview';
import Homeuser from './User/Homeuser';
import Scrapselect from './User/Scrapselect';
import Bookdealer from './User/Bookdealer';
import Successful from './User/Successful';
import Userlogopage from './User/Userlogopage';
import Aboutus from './User/FooterScreen/Aboutus';
import Becomedealer from './User/FooterScreen/Becomedealer';
import BookingProtection from './User/FooterScreen/BookingProtection';
import Career from './User/FooterScreen/Career';
import Fulfillment from './User/FooterScreen/Fullfillment';
import Sellon from './User/FooterScreen/sellon';
import Useraccount from './User/Drawer/Useraccount';
import Usercustomer from './User/Drawer/Usercustomer';
import Userfaq from './User/Drawer/Userfaq';
import Userhelp from './User/Drawer/Userhelp';
import Yourbooking from './User/Drawer/Yourbooking';
import UpdateScrap from './Dealer/AdminUpdateScrap'
import InsertScrap from './Dealer/AdminInsertScrap'
import Analytics from './Dealer/Analytics';
import Usernotification from './User/Usernotification';
import Dealernotification from './Dealer/Dealernotification';
import Userlanguage from './User/Userlanguage';
import Dealerlanguage from './Dealer/Dealerlanguage';
import Usereditdetail from './User/Usereditdetail';
import Dealereditdetail from './Dealer/Dealereditdetail';
import Userqns from './User/Userqns';
import Dealerquery from './Dealer/Dealerquery';
import Dealerqns from './Dealer/Dealerqns';
import Dealerfaq from './Dealer/Dealerfaq';
import UserTerms from './User/UserTerms';
import DealerTerm from './Dealer/DealerTerm';
import RegisterUser from './screen/RegisterUser';
import Forgetpassworduser from './screen/Forgetpassworduser';
import OtpVerification from './screen/OtpVerification';
import Datadel from './component/Datadel';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
        {/* <Route path='/' element={<Demo/>}/> */}
        {/* <Route path='/' element={<Trail/>}/> */}
        <Route path='/' element={<Login/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Register1' element={<Register1/>}/>
        <Route path='/RegisterUser' element={<RegisterUser/>}/>     
        <Route path='/Success' element={<Success/>}/>
        <Route path='/OtpVerification' element={<OtpVerification/>}/>
        <Route path='/Forgotpassword' element={<Forgotpassword/>}/>
        <Route path='/Forgetpassworduser' element={<Forgetpassworduser/>}/>
        <Route path='/Notification' element={<Notification/>}/>
        <Route path='/Datadel' element={<Datadel/>}/>

         {/* ----------------------///DEALER////---------------------------- */}
       
          {/* <Route path='/' element={<Homedealer/>}/> */}
          <Route path='/Homedealer' element={<Homedealer/>}/>
          <Route path='/Todayscrap' element={<Todayscrap/>}/>
          <Route path='/Dealerdetails' element={<Dealerdetails/>}/>
          <Route path='/Scrapdetail' element={<Scrapdetail/>}/>
          <Route path='/Completeorder' element={<Completeorder/>}/>
          <Route path='/Completeorderdetail' element={<Completeorderdetail/>}/>
          <Route path='/Analytic' element={<Analytics/>}/>
          <Route path='/Feedback' element={<Feedback/>}/>
          <Route path='/Applicationstatus' element={<Applicationstatus/>}/>
          <Route path='/Dealerlogopage' element={<Dealerlogopage/>}/>
          <Route path='/Dealernotification' element={<Dealernotification/>}/>
          <Route path='/Dealerlanguage' element={<Dealerlanguage/>}/>
          <Route path='/Dealereditdetail' element={<Dealereditdetail/>}/>
           <Route path='/Dealerquery' element={<Dealerquery/>}/>    
           <Route path='/Dealerqns' element={<Dealerqns/>}/>    
           <Route path='/Dealerfaq' element={<Dealerfaq/>}/> 
           <Route path='/DealerTerm' element={<DealerTerm/>}/> 

          {/* ----------drawer dealer------ */}
          <Route path='/Dealeraccount' element={<Dealeraccount/>}/>
          <Route path='/Dealercustomer' element={<Dealercustomer/>}/>
          <Route path='/Dealerhelp' element={<Dealerhelp/>}/>
          <Route path='/Dealerorder' element={<Dealerorder/>}/>
          <Route path='/Dealerpayment' element={<Dealerpayment/>}/>
          <Route path='/Dealerorderview' element={<Dealerorderview/>}/>          
          <Route path='/UpdateScrap' element={<UpdateScrap/>}/>
          <Route path='/InsertScrap' element={<InsertScrap/>}/>

          {/* ----------------------///USER////---------------------------- */}
          {/* <Route path='/' element={<Homeuser/>}/> */}
          <Route path='/Homeuser' element={<Homeuser/>}/>
          <Route path='/Scrapselect' element={<Scrapselect/>}/>
          <Route path='/Bookdealer' element={<Bookdealer/>}/>
          <Route path='/Successful' element={<Successful/>}/>
          <Route path='/Userlogopage' element={<Userlogopage/>}/>
          <Route path='/Usernotification' element={<Usernotification/>}/>
          <Route path='/Userlanguage' element={<Userlanguage/>}/>
          <Route path='/Usereditdetail' element={<Usereditdetail/>}/>
          <Route path='/Userqns' element={<Userqns/>}/>
          <Route path='/UserTerms' element={<UserTerms/>}/>            

          {/* --------footer----- */}
          <Route path='/Aboutus' element={<Aboutus/>}/>
          <Route path='/Becomedealer' element={<Becomedealer/>}/>
          <Route path='/BookingProtection' element={<BookingProtection/>}/>
          <Route path='/Career' element={<Career/>}/>
          <Route path='/Fulfillment' element={<Fulfillment/>}/>
          <Route path='/Sellon' element={<Sellon/>}/>  
_
          {/* ----------drawer user------ */}
          <Route path='/Useraccount' element={<Useraccount/>}/>
          <Route path='/Usercustomer' element={<Usercustomer/>}/>
          <Route path='/Userfaq' element={<Userfaq/>}/>
          <Route path='/Userhelp' element={<Userhelp/>}/>
          <Route path='/Yourbooking' element={<Yourbooking/>}/> 


          {/* ----------------------///COMPONENT////---------------------------- */}
          {/* <Route path='/' element={<Bottomdealer/>}/> */}
          {/* <Route path='/' element={<Headerdealer/>}/> */}
          {/* <Route path='/' element={<Header/>}/> */}
          {/* <Route path='/' element={<Bottom/>}/> */}
          {/* <Route path='/' element={<Footer/>}/> */}
          {/* <Route path='/' element={<LocationDisplay/>}/> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
