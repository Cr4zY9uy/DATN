import { Bounce, toast } from 'react-toastify'

const configToastify = {
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Bounce
}
export default function Notification({ message, type, options }) {
    return toast[type](message, { ...configToastify, ...options })
}
