import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { GiCommercialAirplane } from "react-icons/gi";
import '../Admin/Admin.css';
import { GiConfirmed } from "react-icons/gi";
import { BiCategory } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { IoChatbubble } from "react-icons/io5";
import { CgPassword } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";

function Admin() {
  const navigate = useNavigate()
  const auth = localStorage.getItem('authToken')
  const handleremove = () => {
    localStorage.removeItem('authToken')
    navigate('/login')
  }

  useEffect(() => {
    // Check if auth token exists, if not redirect to login page
    if (!auth) {
      navigate('/');
      console.log("back")
    }

  }, [auth, navigate]);
  return (
    <>
      {/* <nav className=" navbar-light navbar_sec">
  <div className="container-fluid">
    <img src={require('../../images/logo.jpg')} alt="" style={{ maxwidth: '120px'}}  />
  </div>
</nav> */}


    <div className="d-flex">
  <div className="sidebar d-flex flex-column p-3 bg-light text-dark pt-4" style={{width: 250}}>
  {/* <img src={require('../../images/logo.png')} alt="" style={{ maxwidth: '120px'}}  /> */}
  <div className='d-flex justify-content-center pb-3'>
  <GiCommercialAirplane className='text-white'  style={{fontSize:"50px"}}/>
  </div>
  <h2 className='text-white'><i>Travel Tracker</i></h2>
    <ul className="nav nav-pills flex-column mb-auto fs- fw-medium mt-3">
      <li>
      <Link className='text-white p-3 fs-5 nav-link' to='/admin'>
      <img src={require('../../images/icon-dashboard.png')} alt="" className='me-2' style={{maxWidth:"20px"}}/>
      Dashboard</Link>
        {/* <a href="" className="nav-link text-dark p-md-3 "><i className="fa fa-dashboard me-4" />Dashboard</a> */}
      </li>
      <li>
      <Link className='text-white p-3 fs-5 nav-link' to='/orders'>
      <GiConfirmed className='me-2' />
      Orders</Link>
        {/* <a href="" className="nav-link text-dark p-3 "><i className="fa-brands fa-first-order-alt me-3" />Orders</a> */}
      </li>
      <li>
      <Link className='text-white p-3 fs-5 nav-link' to='/addpackage'>
      <BiCategory className='me-2'/>
      Packages</Link>
        {/* <a href="" className="nav-link text-dark p-3 "><i className="fa-solid fa-bars me-4" />Packages</a> */}
      </li>
      <li>
      <Link className='text-white p-3 fs-5 nav-link' to='/showuser'>
      <FaRegUserCircle className='me-2'/>
      Users</Link>
        {/* <a href="" className="nav-link text-dark p-3 "><i className="fa fa-users me-3" />Users</a> */}
      </li>
      
      <li>
        <Link className='text-white p-3 fs-5 nav-link' to='/showContactUs'>
        <IoChatbubble className='me-2'/>
        Contact Us</Link>
        {/* <a href="" className="nav-link text-dark p-3 "><i className="fa-solid fa-envelope me-3" />Contact Us</a> */}
      </li>
      
      <li>
      <Link className='text-white p-3 fs-5 nav-link' to='/showfeedback'>
      <FaRegUserCircle className='me-2'/>
      Feedback</Link>
        {/* <a href="" className="nav-link text-dark p-3 "><i className="fa fa-users me-3" />Users</a> */}
      </li><hr />
      <li>
        <Link className='text-white p-3 fs-5 nav-link' to='/changepsw'>
        <CgPassword className='me-2'/>
        Change Password</Link>
        {/* <a href="" className="nav-link text-dark p-3 "><i className="fa-solid fa-envelope me-3" />Contact Us</a> */}
      </li>
      <li>
        <Link className='text-white p-3 fs-5 nav-link' onClick={handleremove}>
        <LuLogOut className='me-2'/>
        Log Out</Link>
        {/* <a href="" className="nav-link text-dark p-3 "><i className="fa-solid fa-envelope me-3" />Contact Us</a> */}
      </li>
      
      {/* <li>
        <form action method="post">
          <button type="submit" name="logout" className="bg_logout border-0 text-white p-3">
            <i className="fa-solid fa-right-from-bracket me-3" />logout</button>
        </form>
      </li> */}
    </ul>
  </div>
</div>
    </>
  )
}

export default Admin
