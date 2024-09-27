// import React, { useState,useEffect,useRef } from "react";
// import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
// import Headerdealer from "../component/Headerdealer";
// import Bottomdealer from "../component/Bottomdealer";
// import { useNavigate } from "react-router-dom"; 
// const Applicationstatus = () => {
 
//   const [formData, setFormData] = useState({
//     extraInput: "",
//   });
//   const [fileNames, setFileNames] = useState({
//     extraData: "",
//   });
//   const fileInputRefs = {
//     extraData: useRef(null),
//   };
 

// console.log('Input data',formData.extraData);
// console.log('Input Value',formData);
// console.log('File Data',fileNames.extraData);
// console.log('File Name',fileNames);


//   // const [status, setStatus] = useState('waiting'); // default to 'waiting' if `sat` is undefined
// const [showExtraDataInput, setShowExtraDataInput] = useState(false);

// const handleChange = (e) => {
//   const { name, value } = e.target;
//   setFormData({
//     ...formData,
//     [name]: value
//   });
// };
// const handleFileChange = (fileType) => (e) => {
//   const file = e.target.files[0];
//   setFileNames((prevFileNames) => ({
//     ...prevFileNames,
//     [fileType]: file ? file : null,
//   }));
// };
//     // setStatus((prevStatus) => {
//     //   switch (prevStatus) {
//     //     case 'waiting':
//     //       return 'approved';
//     //     case 'approved':
//     //       return 'extradata';
//     //     case 'extradata':
//     //       return 'waiting';
//     //     default:
//     //       return 'waiting';
//     //   }
//     // });
//   // };
 
//   // const [data, setData] = useState([]);
 
//   // useEffect(() => {
//   //   fetch('http://localhost:8000/FetchStatusActive/')
//   //     .then(response => response.json())
//   //     .then(data =>{
//   //       current_status = data[0].application_status;
//   //       console.log(current_status);
       
//   //       // setStatus(current_status);
//   //   })
//   //     .catch(error => console.error('Error fetching data:', error));
//   // }, []);
 
//   const csrfToken = getCookie('csrftoken'); // Function to get the CSRF token
 
//   function getCookie(name) {
//       let cookieValue = null;
//       if (document.cookie && document.cookie !== '') {
//           const cookies = document.cookie.split(';');
//           for (let i = 0; i < cookies.length; i++) {
//               const cookie = cookies[i].trim();
//               if (cookie.substring(0, name.length + 1) === `${name}=`) {
//                   cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                   break;
//               }
//           }
//       }
//       return cookieValue;
//   }
 
//   const navigate = useNavigate();
 
 
//   const [status, setStatus] = useState('waiting'); // Initial default value
 
//   const [require, requirestatus] = useState('');
 
 
//   useEffect(() => {
//     // Fetch status from Django when the component loads
//     const fetchStatus = async () => {
//       try {
//         const response = await fetch('https://django-djreact-app-d5af3d4e3559.herokuapp.com/FetchStatusActive/',{
//       // const response = await fetch('http://127.0.0.1:8000/FetchStatusActive/ ', {
//         credentials: 'include', // Ensures cookies are sent
//         'X-CSRFToken':csrfToken
//         }); // Django API endpoint
//         const data = await response.json();
//         setStatus(data[0].application_status); // Set the status based on the fetched value
//         requirestatus(data[0].requirements);
//             if (data[0].application_status === "approved"){
//               navigate('/Homedealer');
//             }
//         console.log(data[0].application_status);
//         console.log(data[0].requirements);
//         console.log(data[0].Dealer_ID);
//         (data.status);
//       } catch (error) {
//         console.error('Error fetching status:', error);
//       }
//     };
//     fetchStatus();
//   }, []);
 
 
//   // Update showExtraDataInput based on status
//   React.useEffect(() => {
//     setShowExtraDataInput(status === 'extradata');
//   }, [status]);
 
//   const handleSubmit = async () => {
//     // const newErrors = validateForm();
 


//     const uploadFile = new FormData();
//     // Append text data
//     for (const [key, value] of Object.entries(formData)) {
//       uploadFile.append(key, value);
//     }
//     // Append file data
//     for (const [key, file] of Object.entries(fileNames)) {
//       if (file) {
//         uploadFile.append(key, file);
//       }
//     }
//     // Append the selected option
//     console.log('Form Data',uploadFile)
  
//     const csrfToken = getCookie('csrftoken'); // Function to get the CSRF token
  
  
//     function getCookie(name) {
//       let cookieValue = null;
//       if (document.cookie && document.cookie !== '') {
//           const cookies = document.cookie.split(';');
//           for (let i = 0; i < cookies.length; i++) {
//               const cookie = cookies[i].trim();
//               if (cookie.substring(0, name.length + 1) === `${name}=`) {
//                   cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                   break;
//               }
//           }
//       }
//       return cookieValue;
//   }
  
//     try {
//       const response = await fetch('https://django-djreact-app-d5af3d4e3559.herokuapp.com/send_extraData/', {
//       // const response = await fetch('http://127.0.0.1:8000/ ', {
//         method: 'POST',
//         body: uploadFile,
//         credentials: 'include', // Ensures cookies are sent
//         headers: {
//           'X-CSRFToken':csrfToken,
//         },
//       });
//       if (response.ok) {
//         const data = await response.json();
//         // setMessage(data.message); 
//         // navigate("/Applicationstatus");
//         console.log("Response is OK");
  
//       } else {
//         const data = await response.json();
//         console.log("Response is not  OK");
//         // setError(data.error); 
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//     };
   

//   return (
 
//   <>
//     <div className="container-fluid" style={{ height: "100vh", width: "100%",paddingTop:"100px" }}>
//       <div className="">
//         <span
//           style={{
//             color: "#000",
//             fontSize: "25px",
//             fontWeight: "700",
//             textAlign: "center",
//           }}
//         >
//           Application Status
//         </span>
//       </div>
//       <div className="d-flex flex-column mt-4">
//         <div className="d-flex align-items-center">
//           <AiOutlineCheckCircle style={{ height: "30px", width: "30px", color: "green" }} />
//           <p style={{ marginLeft: "10px",fontSize:"18px",fontWeight:"700" }} className="pt-3">
//             Your Details Submitted Successfully
//           </p>
//         </div>
//         <div className="line"></div>
//         <div
//           className="d-flex align-items-center"
//           style={{ cursor: "pointer" }}
//           // onClick={toggleStatus}
//         >
//           {status === 'approved' ? (
//             <>
//               <AiOutlineCheckCircle style={{ height: "30px", width: "30px", color: "green" }} />
//               <p style={{ marginLeft: "10px",fontSize:"18px",fontWeight:"700" }} className="pt-3">
//                 Approved
//               </p>
//             </>
//           ) : status === 'extradata' ? (
//             <>
//               <AiOutlineCloseCircle style={{ height: "30px", width: "30px", color: "red" }} />
//               <p style={{ marginLeft: "10px",fontSize:"18px",fontWeight:"700" }} className="pt-3">
//                 Need Extra data
//               </p>
//             </>
//           ) : (
//             <>
//               <AiOutlineCloseCircle style={{ height: "30px", width: "30px", color: "red" }} />
//               <p style={{ marginLeft: "10px",fontSize:"18px",fontWeight:"700" }} className="pt-3">
//                 Waiting for Response...
//               </p>
//             </>
//           )}
//         </div>
 
//         <p style={{ marginLeft: "10px",fontSize:"18px",fontWeight:"700" }} className="pt-3">{require}</p>
 
 
//         {showExtraDataInput && (
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               flexDirection: "column",
//               marginLeft:"30px",
//               marginTop:"30px"
//             }}
//           >
//             <div>
//               <p>Please Upload your following information and data</p>
//               <div>
//                 <input 
//                   type="text"
//                   name="extraInput"
//                   value={formData.extraInput}
//                   onChange={handleChange}
//                   placeholder="Enter your data here..." />
//               </div>
//               <div
//                 style={{
//                   display: "flex",
//                   borderRadius: "5px",
//                   border: "2px dotted #777",
//                   padding: "10px",
//                   marginTop: "10px",
//                   alignItems: "center",
//                   position: "relative",
//                 }}
//               >
//                 <input
//                   type="file"
//                   id="file-upload"
//                   ref={fileInputRefs.extraData}
//                   onChange={handleFileChange("extraData")}
//                   style={{
//                     position: "absolute",
//                     width: "100%",
//                     height: "100%",
//                     opacity: 0,
//                     cursor: "pointer",
//                   }}
//                 />
//                 <label
//                   htmlFor="file-upload"
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     color: "#777",
//                     cursor: "pointer",
//                     paddingTop:"30px",
//                     paddingBottom:"30px"
//                   }}
//                 >
//                   Choose Your Data
//                 </label>
//               </div>
//             </div>
//             <div onClick={handleSubmit} className="submit-button">
//               Submit
//             </div>
 
//           </div>
//         )}
//       </div>
//     </div>
//   </>
//   );
// };
 
// export default Applicationstatus;

import React, { useState, useEffect } from "react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom"; 

const Applicationstatus = () => {
  const [status, setStatus] = useState('waiting');
  const [require, requirestatus] = useState('');
  const [showExtraDataInput, setShowExtraDataInput] = useState(false);
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState('');

  // const toggleStatus = () => {
  //   setStatus((prevStatus) => {
  //     switch (prevStatus) {
  //       case 'waiting':
  //         return 'approved';
  //       case 'approved':
  //         return 'extradata';
  //       case 'extradata':
  //         return 'waiting';
  //       default:
  //         return 'waiting';
  //     }
  //   });
  // };

  useEffect(() => {
    setShowExtraDataInput(status === 'extradata');
  }, [status]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  // Remove a specific file from the list
  const handleRemoveFile = (fileName) => {
    setFiles((prevFiles) => prevFiles.filter(file => file.name !== fileName));
  };
  const csrfToken = getCookie('csrftoken'); // Function to get the CSRF token
 
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === `${name}=`) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
  const navigate = useNavigate();

   
    useEffect(() => {
          // Fetch status from Django when the component loads
          const fetchStatus = async () => {
            try {
              const response = await fetch('https://django-djreact-app-d5af3d4e3559.herokuapp.com/FetchStatusActive/',{
            // const response = await fetch('http://127.0.0.1:8000/FetchStatusActive/ ', {
              credentials: 'include', // Ensures cookies are sent
              'X-CSRFToken':csrfToken
              }); // Django API endpoint
              const data = await response.json();
              setStatus(data[0].application_status); // Set the status based on the fetched value
              requirestatus(data[0].requirements);
                  if (data[0].application_status === "approved"){
                    navigate('/Homedealer');
                  }
              console.log(data[0].application_status);
              console.log(data[0].requirements);
              console.log(data[0].Dealer_ID);
              (data.status);
            } catch (error) {
              console.error('Error fetching status:', error);
            }
          };
          fetchStatus();
        }, []);

  // Handle form submission
  const handleSubmit = async () => {
    // You can add code here to handle file upload and message submission to the server.
    console.log("Files to upload:", files);
    console.log("Message:", message);
    const uploadFile = new FormData();
 // Append the file data
 if (files.length > 0) {
  files.forEach((file, index) => {
    uploadFile.append(`file${index}`, file);
  });
}

// Append the message or boolean data
uploadFile.append('message', message);


    // Simulate form submission
    try {
 const response = await fetch('https://django-djreact-app-d5af3d4e3559.herokuapp.com/send_extraData/', {
      // const response = await fetch('http://127.0.0.1:8000/send_extraData/ ', {
        method: 'POST',
        body: uploadFile,
        credentials: 'include', // Ensures cookies are sent
        headers: {
          'X-CSRFToken':csrfToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        // setMessage(data.message); 
        // navigate("/Applicationstatus");
        console.log("Response is OK");
  
      } else {
        const data = await response.json();
        console.log("Response is not  OK");
        setError(data.error); 
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }

    // Clear the files and message after submission
    setFiles([]);
    setMessage('');
  };

  return (
    <>
      <div className="container-fluid">
        <div>
          <span
            style={{
              color: "#000",
              fontSize: "25px",
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            Application Status
          </span>
        </div>
        <div className="d-flex flex-column mt-4">
          <div className="d-flex align-items-center">
            <AiOutlineCheckCircle style={{ height: "30px", width: "30px", color: "green" }} />
            <p style={{ marginLeft: "10px", fontSize: "18px", fontWeight: "700" }} className="pt-3">
              Your Details Submitted Successfully
            </p>
          </div>
          <div className="line"></div>
          <div
            className="d-flex align-items-center"
            style={{ cursor: "pointer" }}
            // onClick={toggleStatus}
          >
            {status === 'approved' ? (
              <>
                <AiOutlineCheckCircle style={{ height: "30px", width: "30px", color: "green" }} />
                <p style={{ marginLeft: "10px", fontSize: "18px", fontWeight: "700" }} className="pt-3">
                  Approved
                </p>
              </>
            ) : status === 'extradata' ? (
              <>
                <AiOutlineCloseCircle style={{ height: "30px", width: "30px", color: "red" }} />
                <p style={{ marginLeft: "10px", fontSize: "18px", fontWeight: "700" }} className="pt-3">
                  Need Extra Data
                </p>
              </>
            ) : (
              <>
                <AiOutlineCloseCircle style={{ height: "30px", width: "30px", color: "red" }} />
                <p style={{ marginLeft: "10px", fontSize: "18px", fontWeight: "700" }} className="pt-3">
                  Waiting for Response...
                </p>
              </>
            )}
          </div>
          <p style={{ marginLeft: "10px",fontSize:"18px",fontWeight:"700" }} className="pt-3">{require}</p>
          {showExtraDataInput && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                marginLeft: "30px",
                marginTop: "30px"
              }}
            >
              <div>
                <p style={{ color: "red" }}>Please Upload Your Following Information and Data</p>
                <div>
                  <input
                    type="text"
                    placeholder="Dealer can message here"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    borderRadius: "5px",
                    border: "2px dotted #777",
                    padding: "10px",
                    marginTop: "10px",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <input
                    type="file"
                    id="file-upload"
                    multiple
                    onChange={handleFileChange}
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      opacity: 0,
                      cursor: "pointer",
                    }}
                  />
                  <label
                    htmlFor="file-upload"
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#777",
                      cursor: "pointer",
                      paddingTop: "30px",
                      paddingBottom: "30px"
                    }}
                  >
                    Choose Your Data
                  </label>
                </div>
                <div style={{ marginTop: "20px" }}>
                  {files.length > 0 && (
                    <ul>
                      {files.map((file, index) => (
                        <li key={index}>
                          {file.name}
                          <button
                            onClick={() => handleRemoveFile(file.name)}
                            style={{
                              marginLeft: "10px",
                              backgroundColor: "#c0bcbb",
                              color: "white",
                              border: "none",
                              borderRadius: "5px",
                              padding: "2px 5px",
                              cursor: "pointer"
                            }}
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="d-flex justify-content-center mt-5">
                  <button
                    className="button"
                    onClick={handleSubmit}
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Applicationstatus;
