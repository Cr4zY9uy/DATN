import { RouterProvider } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify'
import { router } from './routes/route';
import ScrollToTop from 'react-scroll-to-top'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />
      <ScrollToTop
        smooth={true}
        width='15px'
        height='15px'
        style={{
          width: 30,
          height: 30,
          cursor: 'pointer'
        }}
        color={'rgb(146, 42, 141)'}
      />
    </>
  )
}

export default App
