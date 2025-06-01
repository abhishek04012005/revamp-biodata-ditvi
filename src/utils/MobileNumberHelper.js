/**
 * Masks a mobile number showing only last 4 digits
 * @param {string} mobileNumber - The mobile number to mask
 * @returns {string} Masked mobile number (e.g., XXXXXX1234)
 */
export const maskMobileNumber = (mobileNumber) => {
  if (!mobileNumber) return '';
  
  // Remove any non-digit characters
  const cleaned = mobileNumber.replace(/\D/g, '');
  
  // Check if number is valid (10 digits)
  if (cleaned.length !== 10) {
    return mobileNumber;
  }

  // Mask first 6 digits with X and show last 4
  return 'X'.repeat(6) + cleaned.slice(-4);
};