import { toast } from 'react-toastify';

// types: info, success, warning, error, default
const notify = (toastType, text) => toast[toastType](text, {
  theme: 'dark',
  position: 'top-center',
});

export default notify;
