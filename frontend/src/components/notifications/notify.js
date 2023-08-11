import { toast } from 'react-toastify';

const notify = (toastType, text) => toast[toastType](text, {
  theme: 'dark',
  position: 'top-center',
});

export default notify;
