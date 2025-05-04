import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link for internal navigation
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <>
       <footer style={{
      background: '#eaeaea', // Light gray for a clean look
      color: '#333', // Dark text for contrast
      padding: '50px 0',
      textAlign: 'center',
      borderTop: '2px solid #ccc',
    }}>
      <Container>
        <Row>
          {/* Quick Links Section */}
          <Col md={3} sm={6} xs={12} className="mb-4">
            <h5 style={{ fontWeight: 'bold' }}>Quick Links</h5>
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }} className="fs-6">
              <li className='mb-2'>
                <Link to="/package" style={{ color: '#333', textDecoration: 'none' }}>
                  Packages
                </Link>
              </li>

              <li className='mb-2'>
                <Link to="/about" style={{ color: '#333', textDecoration: 'none' }}>
                  About Us
                </Link>
              </li>
              <li className='mb-2'>
                <Link to="/contactus" style={{ color: '#333', textDecoration: 'none' }}>
                  Contact Us
                </Link>
              </li>
              <li className='mb-2'>
                <Link to="/feedback" style={{ color: '#333', textDecoration: 'none' }}>
                  Feedback
                </Link>
              </li>
            </ul>
          </Col>

          {/* Social Media Section */}
          <Col md={3} sm={6} xs={12} className="mb-4">
            <h5 style={{ fontWeight: 'bold' }}>Follow Us</h5>
            <div style={{ fontSize: '24px' }}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: '#3b5998', margin: '0 10px' }}>
                <FaFacebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: '#00acee', margin: '0 10px' }}>
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#C13584', margin: '0 10px' }}>
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: '#0077b5', margin: '0 10px' }}>
                <FaLinkedin />
              </a>
            </div>
          </Col>

          {/* Contact Information Section */}
          <Col md={3} sm={6} xs={12} className="mb-4">
            <h5 style={{ fontWeight: 'bold' }}>Contact Info</h5>
            <p style={{ margin: '5px 0' }}>
              Email: <a href="mailto:support@tourism.com" style={{ color: '#333', textDecoration: 'none' }}>
              traveltracker@gmail.com
              </a>
            </p>
            <p style={{ margin: '5px 0' }}>
              Phone: <a href="tel:+1234567890" style={{ color: '#333', textDecoration: 'none' }}>
              +01852-1265122
              </a>
            </p>
            <p style={{ margin: '5px 0' }}>123 Main Street, City, surat</p>
          </Col>

          {/* Newsletter Subscription Section */}
          {/* Newsletter Subscription Section */}
<Col md={3} sm={6} xs={12} className="mb-4">
  <h5 style={{ fontWeight: 'bold' }}>Stay Updated!</h5>
  <p>Subscribe to our newsletter for updates and offers.</p>
  <div>
    <input
      type="email"
      placeholder="Your Email"
      style={{
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        width: '70%',
        marginBottom: '10px',
      }}
    />
    <Button
      style={{
        padding: '10px 15px',
        borderRadius: '5px',
        backgroundColor: "#0084b4",
        border: "none",
        color: "#fff",
      }}
    >
      Subscribe
    </Button>
  </div>
</Col>

        </Row>

        {/* Footer Bottom Section */}
        <Row>
          <Col>
            <p style={{ fontSize: '18px', opacity: 0.7, marginTop: '20px' }}>
              &copy; {new Date().getFullYear()} Tourism Company. All Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>

      {/* Additional Styling */}
      <style>
        {`
          a:hover {
            text-decoration: underline;
          }

          a:hover svg {
            transform: scale(1.1);
            transition: transform 0.2s;
          }

          input[type="email"] {
            max-width: 100%;
          }

          @media (max-width: 576px) {
            h5 {
              font-size: 16px;
            }
            p, a {
              font-size: 14px;
            }
          }
        `}
      </style>
    </footer>
    </>
  )
}

export default Footer
