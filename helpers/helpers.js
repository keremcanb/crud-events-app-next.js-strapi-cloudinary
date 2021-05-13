import cookie from 'cookie';
import { toast } from 'react-toastify';

export const parseCookies = (req) => cookie.parse(req ? req.headers.cookie || '' : '');

export const validateForm = (values) => {
  const hasEmptyFields = Object.values(values).some((element) => element === '');
  if (hasEmptyFields) {
    toast.error('Please fill in all fields');
  }
};
