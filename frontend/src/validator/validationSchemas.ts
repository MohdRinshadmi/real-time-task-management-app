import * as yup from 'yup';

export const registerSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    email: yup.string().email('Email is invalid').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    phoneNumber: yup.string().required('Phone number is required'),
    privacyAccepted: yup.boolean().oneOf([true], 'You must accept the privacy policy').required('You must accept the privacy policy'),
});

export const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
});

export const taskSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().optional(),
    dueDate: yup.date().nullable().typeError('Invalid date'),
    priority: yup.string().oneOf(['low', 'medium', 'high'], 'Invalid priority').default('medium'),
});
