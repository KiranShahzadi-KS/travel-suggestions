// Function to generate a random 6-digit OTP
const generateOTP = () => {
  const OTP_LENGTH = 6;
  const min = Math.pow(10, OTP_LENGTH - 1);
  const max = Math.pow(10, OTP_LENGTH) - 1;
  return Math.floor(Math.random() * (max - min + 1) + min);
};

//---------
// Function to validate the provided OTP
const validateOTP = (userOTP, storedOTP, expiryTime) => {
  const now = new Date();
  console.log(expiryTime);
  console.log(now);
  // Check if the provided OTP matches the stored OTP and has not expired
  return userOTP == storedOTP && now < new Date(expiryTime);
};

// Function to generate a random reset token

//------------
module.exports = {
  generateOTP,
  validateOTP,
};
