export const validateEmailFields = (recipients, setErrors) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/;
  const newErrors = {};

  if (!recipients.to) {
    newErrors.to = "this_field_is_required";
  } else if (!recipients.to.match(emailRegex)) {
    newErrors.to = "invalid_email_format";
  } else {
    newErrors.to = "";
  }

  setErrors(newErrors);

  // Check if there are no errors
  return Object.values(newErrors).every((error) => !error);
};

export const validateRegistrationFields = (fields) => {
  const newErrors = {};
  Object.entries(fields).forEach(([key, value]) => {
    if (key === 'firstName' && !value.trim()) newErrors.firstName = 'First name is required';
    if (key === 'email') {
      if (!value.trim() || value === '') newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(value)) newErrors.email = 'Email is invalid';
    }
    if (key === 'password' && (!value || value.length < 6)) newErrors.password = 'Password must be at least 6 characters';
    if (key === 'phoneNumber' && !value.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (key === 'privacyAccepted' && !value) newErrors.privacyAccepted = 'You must accept the privacy policy';
  });
  return newErrors;
};
