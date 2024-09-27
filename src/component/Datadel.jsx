import logo from "../assets/image/logotrans.png";

const Datadel = ()=>{
    return(
        <>
           <div
        className="container-fluid"
        style={{
          height: "100vh",
          backgroundColor: "#000",
          color: "#fff",
          paddingTop: "20px",
          fontSize: "20px",
          fontWeight: "200",
               paddingLeft:"30px",
          paddingRight:"30px"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={logo} style={{ height: "180px", width: "180px" }} />
        </div>
        <div style={{ marginTop: "70px" }}>
          <span>
          Data Deletion Request
We respect your privacy and are committed to protecting your personal information. If you wish to request the deletion of your data stored on our servers, please follow the instructions below.

How to Request Data Deletion
To request the deletion of your personal data, please send an email to <a className="text-decoration-none" href="mailto:recycbs.in@gmail.com">recycbs.in@gmail.com</a>. In your email, include the following information:

Your full name
The email address associated with your account
A brief description of your request
What Happens Next?
Once we receive your request, we will process it in accordance with our data protection policies. You will receive a confirmation email once your request has been processed. Please allow us up to [X business days] to complete the deletion process.

Important Information
Deleting your data may result in the loss of access to certain services and features.
We may retain some information as required by law or for legitimate business purposes.
If you have any questions or need further assistance, feel free to reach out to us.

Thank you for your understanding!
          </span>
        </div>
      </div>
        </>
    )
}

export default Datadel