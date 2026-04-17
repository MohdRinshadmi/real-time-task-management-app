export interface Recipients {
  to: string;
}

export interface Errors {
  [key: string]: string;
}

export const validateEmailFields = (recipients: Recipients, setErrors: (errors: Errors) => void): boolean => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/;
  const newErrors: Errors = {};

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

export interface RegistrationFields {
  firstName?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  privacyAccepted?: boolean;
  [key: string]: any; // Allow indexing
}

export const validateRegistrationFields = (fields: RegistrationFields): Errors => {
  const newErrors: Errors = {};
  Object.entries(fields).forEach(([key, value]) => {
    if (key === 'firstName' && typeof value === 'string' && !value.trim()) newErrors.firstName = 'First name is required';
    if (key === 'email' && typeof value === 'string') {
      if (!value.trim() || value === '') newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(value)) newErrors.email = 'Email is invalid';
    }
    if (key === 'password' && typeof value === 'string' && (!value || value.length < 6)) newErrors.password = 'Password must be at least 6 characters';
    if (key === 'phoneNumber' && typeof value === 'string' && !value.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (key === 'privacyAccepted' && !value) newErrors.privacyAccepted = 'You must accept the privacy policy';
  });
  return newErrors;
};
