import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const options = {
    autoClose: 3000,
    hideProgressBar: true,
    position: "top-right",
    pauseOnHover: false,
    bodyClassName: "toastBody",
};

class ToastrService {
    success(message) {
        toast.success(message, { ...options });
    }

    error(message) {
        toast.error(message, { ...options });
    }

    warn(message) {
        toast.warn(message, { ...options });
    }
}

export default new ToastrService();
