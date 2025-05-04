import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SignUp from './Components/SignUp/SignUp';
import Login from './Components/Login/Login';
import { Route, Routes } from 'react-router-dom';
import ForgotPsw from './Components/Forgotpsw/ForgotPsw';
import Verfication from './Components/Verfication/Verfication';
import Newpass from './Components/Forgotpsw/Newpass';
import Changepsw from './Components/Changepsw/Changepsw';
import Home from './Components/Home/Home';
import Admin from './Components/Admin/Admin';
import Navbars from './Components/Home/Navbars';
import Packages from './Components/Home/Packages';
import ContactUs from './Components/Home/ContactUs';
import About from './Components/Home/About';
import Gallary from './Components/Home/Gallary';
import Dashboard from './Components/Admin/Dashboard';
import AddPackage from './Components/Admin/AddPackage';
import ShowPackages from './Components/Admin/ShowPackages';
import Getusers from './Components/Admin/Getusers';
import PackageDetailPage from './Components/Home/PackageDetailPage';
import TourBookingForm from './Components/Home/TourBookingForm';
import UpdatePackage from './Components/Admin/UpdatePackage';
import AllOrder from './Components/Admin/AllOrder';
import Feedbacks from './Components/Home/Feedbacks';
import BookingConformation from './Components/Home/BookingConformation';
import Contactus from './Components/Admin/Contactus';
import ShowFeedback from './Components/Admin/ShowFeedback';
import UpdateUser from './Components/Admin/UpdateUser';
import BookingUpdate from './Components/Home/BookingUpdate';
import UpdateOrder from './Components/Admin/UpdateOrder';
import toast, { ToastBar, Toaster } from 'react-hot-toast';
import { Col, Row } from 'react-bootstrap';
import PaymentPage from './Components/Home/Paymentpage';
import UpdateContact from './Components/Admin/UpdateContact';
import UpdateFeedback from './Components/Admin/UpdateFeedback';

function App() {
  return (
    <>
     <Routes>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/login/forgot' element={<ForgotPsw/>}/>
        <Route path='/verify' element={<Verfication/>}/>
        <Route path='/resetpsw' element={<Newpass/>}/>
        <Route path='/changepsw' element={<Changepsw/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/admin' element={<Dashboard/>}/>
        <Route path='/package' element={<Packages/>}/>
        <Route path='/contactus' element={<ContactUs/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/gallery/:id' element={<Gallary/>}/>
        <Route path='/addpackage' element={<AddPackage/>}/>
        <Route path='/showpackage' element={<ShowPackages/>}/>
        <Route path='/showuser' element={<Getusers/>}/>
        <Route path='/packagedetails/:id' element={<PackageDetailPage/>}/>
        <Route path='/bookingform/:id' element={<TourBookingForm/>}/>
        <Route path='/updatepackage/:id'element={<UpdatePackage/>}/>
        <Route path='/orders' element={<AllOrder/>}/>
        <Route path='/feedback' element={<Feedbacks/>}/>
        <Route path='/bookingconformation' element={<BookingConformation/>}/>
        <Route path='/showContactUs' element={<Contactus/>}/>
        <Route path='/showfeedback' element={<ShowFeedback/>}/>
        <Route path='/updateUser/:id' element={<UpdateUser/>}/>
        <Route path='/bookingupdate/:id' element={<BookingUpdate/>}/>
        <Route path='/orderupdate/:id' element={<UpdateOrder/>}/>
        <Route path='/payment' element={<PaymentPage/>}/>
        <Route path='/UpdateContact/:id' element={<UpdateContact/>}/>
        <Route path='/UpdateFeedback/:id' element={<UpdateFeedback/>}/>
     </Routes>

     <Toaster
        position="top-right"
        toastOptions={{
          duration: 1000,
          error: {
            className: "alert error",
            icon: "⚠️",
          },
          success: {
            className: "alert success",
            icon: "✅",
          },
        }}
      >

{(t) => (
          <ToastBar
            toast={t}
            style={{
              ...t.style,
              animation: t.visible ? "custom-enter 1s ease" : "custom-exit 1s ease",
            }}
            children={(props) => {
              return (
                <Row className="w-100">
                  <Col xl={10} className="d-flex align-items-center">
                    {t?.type === "success" ? (
                      <img
                        width={50}
                        height={50}
                        className="img"
                        style={{ fill: "green", position: "absolute" }}
                        src={require("../src/images/icon-check-circle-green.svg").default}
                        alt="Success Icon"
                      />
                    ) : (
                      <img
                        width={35}
                        height={35}
                        className="img"
                        style={{ fill: "red" }}
                        src={require("../src/images/icon-cross-red.svg").default}
                        alt="Error Icon"
                      />
                    )}
                    <div style={{ marginTop: "5px", marginLeft: t?.type === "success" ? "50px" : "5px" }}>
                      <div>
                        {
                          <strong style={{ fontSize: "20px", marginTop: "25px", marginLeft: "10px" }}>
                            {t?.type === "success" ? "Success" : "Error"}
                          </strong>
                        }
                      </div>
                      <span style={{ color: "gray", float: "left" }}>{props.message}</span>
                    </div>
                  </Col>
                  <Col xl={2} md={12} xs={12} className="d-flex align-items-center justify-content-end">
                    <span
                      className="pointer"
                      style={{ color: "gray", marginLeft: "25px" }}
                      onClick={() => toast.remove(t.id)}
                    >
                      CLOSE
                      {/*props.icon*/}
                    </span>
                  </Col>
                </Row>
              );
            }}
          />
        )}
      </Toaster>
     {/* <SignUp/> */}
     {/* <Login/> */}
    </>
  );
}

export default App;
