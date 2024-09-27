import React, { useState } from 'react';
import Header from '../component/Header';


const Usereditdetail = () => {
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    address: '',
    city: '',
    pincode: '',
    state: '',
    nationality: ''
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
  <>
  <Header/>
    <div style={styles.container} className='topbottom-user'>
      <div style={styles.header}>
        <h2>Edit Details</h2>
      </div>
      {isEditing ? (
        <form onSubmit={handleSave}>
          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.label}>Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email Address:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="contactNumber" style={styles.label}>Contact Number:</label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="address" style={styles.label}>Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="city" style={styles.label}>City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="pincode" style={styles.label}>Pincode:</label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="state" style={styles.label}>State:</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="nationality" style={styles.label}>Nationality:</label>
            <input
              type="text"
              id="nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.buttonContainer}>
            <button type="submit" style={{ ...styles.button, ...styles.confirmButton }}>Save</button>
            <button type="button" onClick={handleCancel} style={{ ...styles.button, ...styles.cancelButton }}>Cancel</button>
          </div>
        </form>
      ) : (
        <div>
          <div style={styles.details}>
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Email Address:</strong> {formData.email}</p>
            <p><strong>Contact Number:</strong> {formData.contactNumber}</p>
            <p><strong>Address:</strong> {formData.address}</p>
            <p><strong>City:</strong> {formData.city}</p>
            <p><strong>Pincode:</strong> {formData.pincode}</p>
            <p><strong>State:</strong> {formData.state}</p>
            <p><strong>Nationality:</strong> {formData.nationality}</p>
          </div>
          <div style={styles.buttonContainer}>
            <button onClick={handleEdit} style={{ ...styles.button, ...styles.confirmButton }}>Edit</button>
          </div>
        </div>
      )}
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

export default Usereditdetail;