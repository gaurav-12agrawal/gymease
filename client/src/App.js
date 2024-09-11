import React, { useState, useEffect, createContext, useReducer } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Privacy from './components/Privacy';
import Faq from './components/Faq';
import Contact from './components/Contact';
import Errorpage from './components/Errorpage';
import Footer from './components/Footer';
import Allcitygyms from './components/Allcitygyms';
import Setdataform from './components/Setdataform';
import Details from './components/Details';
import Editcard from './components/Editcard';
import Signup from './components/Signup';
import Login from './components/Login';
import LogOut from './components/Logout';
import Payment from './components/Payment';
import Adminlogin from './components/Adminlogin';
import Checkoutform from './components/Checkoutform';
import Adminlogout from './components/Adminlogout';
import Screenloader from './components/Screenloader';
import Forgetemail from './components/Forgetemail';
import Forgetpassword from './components/Forgetpassword';
import Forgetemailsuperadmin from './components/Forgetemailsuperadmin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Superadminlogin from './components/Superadminlogin';
import Superadminlogout from './components/Superadminlogout'
import Forgetpasswordadmin from './components/Forgotpasswordadmin';
import { initialState, reducer } from './Reducer/usereducer';
import Mybooking from './components/Mybooking';
import Aboutus from './components/Aboutus';
export const UserContext = createContext();

var hours = 1;
var now = new Date().getTime();
var setupTime = localStorage.getItem('setupTime');
if (setupTime) {
  if (now - setupTime > hours * 60 * 60 * 1000) {
    localStorage.removeItem('isadmin')
    localStorage.removeItem('setupTime')
  }
}


function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

  const [loading, setloading] = useState(false)



  useEffect(() => {
    setloading(true)
    setTimeout(() => {
      setloading(false)
    }, 2000);

  }, [])

  return (
    <UserContext.Provider value={{ state, dispatch }} >

      <div>
        <ToastContainer
          position="top-center" />
        {
          loading ?
            <Screenloader />
            :
            <div>
              <Navbar />
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/booking" element={<Mybooking />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/details/:id" element={<Details />} />
                <Route path="/edit/:id" element={<Editcard />} />
                <Route path='/allcitygyms/:city' element={<Allcitygyms />} />
                <Route path='/setdata' element={<Setdataform />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route path="/logout" element={<LogOut />} />
                <Route path="/details/:id/payment" element={<Payment />} />
                <Route path="/details/:id/payment/checkoutform" element={<Checkoutform />} />
                <Route path="/adminlogin" element={<Adminlogin />} />
                <Route path="/adminlogout" element={<Adminlogout />} />
                <Route path="/forgetemail" element={<Forgetemail />} />
                <Route path="/forgetemail/superadmin" element={<Forgetemailsuperadmin />} />
                <Route path="/forgetpassword/:id/:token" element={<Forgetpassword />} />
                <Route path="/forgetpasswordadmin/:id/:token" element={<Forgetpasswordadmin />} />
                <Route path="/superadminlogin" element={<Superadminlogin />} />
                <Route path="/superadminlogout" element={<Superadminlogout />} />
                <Route path="*" element={<Errorpage />} />
              </Routes>
              <Footer />
            </div>

        }


      </div>

    </UserContext.Provider>

  );
}

export default App;
