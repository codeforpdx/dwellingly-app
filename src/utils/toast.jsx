import { toast } from "react-toastify";

const Toast = (text = '', type = '') => {

  // If no notification text is provided, notify dev in console and return early
  if(text === '') {
    console.error("Text field for toast notification cannot be blank");
    return;
  };

  // Notification configuration
  const toastObj = {
    position: "bottom-right",
    autoClose: 4000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  }

  // Display notifications in different color based on specified notification type, else defauly to blue ("info")
  switch (type){
    case '' || "default" || 'info':
      toast.info(text, toastObj);
      break;
    case 'success':
      toast.success(text, toastObj);
      break;
    case 'warn' || 'warning':
      toast.warn(text, toastObj);
      break;
    case 'error':
      toast.error(text, toastObj);
      break;
    default: 
      toast.info(text, toastObj);
  }
}

export default Toast;
