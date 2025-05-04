import React, { useEffect } from 'react'
import { Container, Dropdown, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { RiAccountCircleFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import '../Home/Home.css';
import { AOS } from 'aos';

function Navbars() {

  const navigate = useNavigate();
  const auth = localStorage.getItem('authToken');

  const handleremove = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

    // useEffect(() => {
    //     if (!auth) {
    //       navigate('/');
    //     }
    //     // AOS.init({ duration: 1200 });
    //   }, [auth, navigate]);
  return (
    <>
         {/* <Navbar expand="lg" className="bg-body-tertiary fs-5" sticky="top">
      <Container fluid>
        <Navbar.Brand href="#" className="fs-3 d-flex align-items-center">
          <img src={require('../../images/logo.jpg')} // Replace with the actual logo path
            alt="Logo" style={{ width: '100%', maxWidth: '120px' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav"/>
        <Navbar.Collapse id="navbarNav"  className='d-flex justify-content-around'>
          <Nav className="fs-5" navbarScroll>
          <Nav.Link href="" className=''>
            <Link to='/home' className='me-2 nav_sec'>Home</Link>
            </Nav.Link>

            <Nav.Link href="" className=''>
             <Link to='/package' className='pe-3 fw-medium nav_sec'>Packages</Link>
            </Nav.Link>

            <Nav.Link href="" className=''>
             <Link to='/gallery' className='me-2 nav_sec'>Gallery</Link>
            </Nav.Link>

            <Nav.Link href="" className=''>
             <Link to='/about' className='me-2 nav_sec'>About Us</Link>
            </Nav.Link>

            <Nav.Link href="" className=''>
             <Link to='/contactus' className='me-2 nav_sec'>Contact Us</Link>
            </Nav.Link>

            
          </Nav>
          <div className="d-flex align-items-center" style={{marginLeft:"20px"}}>

          <NavDropdown title={<RiAccountCircleFill style={{ fontSize: '1.8em', color: '#333' }} />} id="navbarScrollingDropdown">
            
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>  */}

<div className="bg-white sticky-top">
      <Navbar collapseOnSelect expand="lg" className="px-4">
        <div className="d-flex align-items-center w-100">
          {/* Left Side Logo */}
          <Navbar.Brand href="" className="me-auto">
            <img
              src={require('../../images/logo.jpg')} // Replace with the actual logo path
              alt="Logo"
              style={{ width: '100%', maxWidth: '120px' }}
            />
          </Navbar.Brand>

          {/* Navbar Toggle for Mobile */}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          {/* Center Navigation Items */}
          <Navbar.Collapse id="responsive-navbar-nav">
           
            <Nav className="fs-4 mx-auto text-center" navbarScroll>
          <Nav.Link href="" className=''>
            <Link to='/' className='me-4 nav_sec'>Home</Link>
            </Nav.Link>

            <Nav.Link href="" className=''>
             <Link to='/package' className='me-4 fw-medium nav_sec'>Packages</Link>
            </Nav.Link>

            {/* <Nav.Link href="" className=''>
             <Link to='/gallery' className='me-4 nav_sec'>Gallery</Link>
            </Nav.Link> */}

            <Nav.Link href="" className=''>
             <Link to='/about' className='me-4 nav_sec'>About Us</Link>
            </Nav.Link>

            <Nav.Link href="" className=''>
             <Link to='/contactus' className='me-4 nav_sec'>Contact Us</Link>
            </Nav.Link>

            <Nav.Link href="" className=''>
             <Link to='/feedback' className='me-4 nav_sec'>Feedback</Link>
            </Nav.Link>

            <Nav.Link href="" className=''>
             <Link to='/bookingconformation' className='me-4 nav_sec'>Booking</Link>
            </Nav.Link>

            
          </Nav>
           
          

          {/* Right Side Account Icon */}
          <div className="ms-auto text-sm-center">
            <NavDropdown
              title={<RiAccountCircleFill style={{ color: '#333', cursor: 'pointer' }} className='fs-1'/>}
              id=""
              align="end" // Align dropdown to right
              menuVariant="light" // Ensure it's visible on white background
              // style={{ width: '180px' }} // Prevents scroll issue
            >
              <Link to='/changepsw' className='fs-5 ms-2 text-dark'>Change Password</Link>
              {/* <NavDropdown.Item as={Link} href="/changepsw" className='fs-5'>Change Password</NavDropdown.Item> */}
              <NavDropdown.Item onClick={handleremove} className='fs-5'>Logout</NavDropdown.Item>
            </NavDropdown>
          </div>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>  
    </>
  )
}

export default Navbars
