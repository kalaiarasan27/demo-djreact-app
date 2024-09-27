import React from 'react';
import Headerdealer from '../../component/Headerdealer';
import Header from '../../component/Header';


const Useraccount = () => {
  
  return (
  <>
  <Header/>
    <div className='topbottom-user'>
      <div style={styles.header}>
        
      </div>
      <div style={styles.details}>
            <p><strong>Name:</strong> answer</p>
            <p><strong>Email Address:</strong>answer </p>
            <p><strong>Contact Number:</strong> answer</p>
            <p><strong>Address:</strong>answer</p>
            <p><strong>City:</strong>answer</p>
            <p><strong>Pincode:</strong>answer</p>
            <p><strong>State:</strong>answer</p>
            <p><strong>Nationality:</strong>answer</p>
          </div>
    </div>
  </>
  );
};


const styles = {
  header: {
    textAlign: 'center',
    marginBottom: '20px'
  },
  details: {
    marginBottom: '20px'
  },
  formGroup: {
    marginBottom: '15px'
  },
  label: {
    display: 'block',
    marginBottom: '5px'
  },
  input: {
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box',
    border: '1px solid #ccc',
    borderRadius: '4px'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  button: {
    padding: '10px 20px',
    margin: '0 10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    color: 'white'
  },
  cancelButton: {
    backgroundColor: '#f44336',
    color: 'white'
  }
};

export default Useraccount;