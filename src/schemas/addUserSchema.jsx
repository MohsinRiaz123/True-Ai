import * as Yup from "yup";
export const AddUserSchema = Yup.object({
    firstName: Yup.string()
    .required('First name is required')
    .min(3, 'First name must be at least 3 characters')
    .max(50, 'First name must be at most 50 characters'),
  
  lastName: Yup.string()
    .required('Last name is required')
    .min(3, 'Last name must be at least 3 characters')
    .max(50, 'Last name must be at most 50 characters'),
  
  phone: Yup.string()
    .required('Contact number is required')
    .min(10, 'Contact number must be at least 10 digits')
    .max(15, 'Contact number must be at most 15 digits'),
  
  email: Yup.string()
    .required('Email is required')
    .email('Email is not valid'),
  
  role: Yup.string()
    .required('Role is required'),
  });