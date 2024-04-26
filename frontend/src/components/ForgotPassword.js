import React, { useState } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [subject, setSubject] = useState(''); // Added subject state
  const [verificationMessage, setVerificationMessage] = useState('');
  const [passwordChangeMessage, setPasswordChangeMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubjectChange = (e) => { // Handle subject change
    setSubject(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/sendmail?email=${email}&subject=${subject}`); // Pass subject to backend
      console.log(response.data); 
      setVerificationMessage('OTP sent successfully. Please check your email.');
    } catch (error) {
      console.error('Error sending email:', error);
      setVerificationMessage('Error sending email. Please try again.');
    }
  };

  const handleVerify = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/verifyotp?otp=${otp}`);
      console.log(response.data);
      setVerificationMessage('OTP verified successfully.');
      setPasswordChangeMessage('Please enter your new password.');
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setVerificationMessage('Error verifying OTP. Please try again.');
    }
  };

  const handleChangePassword = async () => {
    try {
      const response = await axios.post('http://localhost:5000/setpassword', {
        email: email,
        newPassword: newPassword
      });
      console.log(response.data);
      setPasswordChangeMessage('Password changed successfully.');
    } catch (error) {
      console.error('Error changing password:', error);
      setPasswordChangeMessage('Error changing password. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            style={styles.input}
          />
          <input // Subject input field
            type="text"
            placeholder="Enter subject"
            value={subject}
            onChange={handleSubjectChange}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Send OTP</button>
        </form>

        <form onSubmit={(e) => { e.preventDefault(); }} style={styles.form}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={handleOtpChange}
            style={styles.input}
          />
          <button onClick={handleVerify} style={styles.button}>Verify OTP</button>
        </form>

        {verificationMessage && <p style={styles.message}>{verificationMessage}</p>}

        {passwordChangeMessage && (
          <div>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              style={styles.input}
            />
            <button onClick={handleChangePassword} style={styles.button}>Change Password</button>
            <p style={styles.message}>{passwordChangeMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  box: {
    width: '400px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  form: {
    marginBottom: '20px',
  },
  input: {
    marginRight: '10px',
    marginBottom: '10px',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    marginRight: '10px',
  },
  message: {
    marginTop: '10px',
  },
};

export default ForgotPassword;
