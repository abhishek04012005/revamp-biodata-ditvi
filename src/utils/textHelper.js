const maskMobileNumber = (mobileNumber) => {
  if (!mobileNumber) return '';
  const mobileStr = mobileNumber.toString();
  const maskedMobile = mobileStr.replace(/(\d{3})(\d{3})(\d{4})/, '$1$2****');
  return maskedMobile;
}

export default maskMobileNumber;