import React, { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Breadcrumb, Button } from 'react-bootstrap';
import { FaMapMarkerAlt, FaRegCalendarAlt, FaStar } from 'react-icons/fa';
import backgroundImage from "../../images/breadcrum.jpg";
import Navbars from '../Home/Navbars';
import './Packages.css';
import { getpackage } from '../../ApiService';

function Packages() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    async function fetchPackages() {
      try {
        const data = await getpackage();
        setPackages(data);
        console.log("packages", data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    }
    fetchPackages();
  }, []);

  return (
    <>
      <Navbars />

      {/* Breadcrumb Section */}
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '100px 0',
          width: '100%',
          textAlign: 'center',
          position: 'relative',
          color: 'white',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
          }}
        ></div>
        <Container style={{ position: 'relative', zIndex: 1 }}>
          <h1 className="mb-4">Our Packages</h1>
          <Breadcrumb style={{ justifyContent: 'center' }} className="d-flex flex-wrap">
            <Breadcrumb.Item>
              <Link to="/" className="fs-5 text-white text-decoration-none">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active className="fs-5" style={{ color: "#0084b4" }}>
              Packages
            </Breadcrumb.Item>
          </Breadcrumb>
        </Container>
      </div>

      {/* Packages Display Section */}
      <Container className="py-4 mb-5 spacing">
        <h2 className="text-center mb-3" style={{ color: "#0084b4" }}>Packages</h2>
        <p className='text-center fs-5 mb-4'>Select Your Best Package For Your Travel</p>

        <Row>
          {packages?.map((item) => (
            <Col xs={12} sm={6} md={6} lg={4} key={item._id} className='mt-4'>
              <Card className="h-100 package-card">
                <div className="image-wrapper">
                  <Card.Img
                    variant="top"
                    src={item.img[0]}
                    alt=""
                    className="img-fluid"
                    style={{ height: '230px', objectFit: 'cover', width: '100%' }}
                  />
                </div>
                <Card.Body>
                  <Card.Title className="fw-bold" style={{ color: 'gray' }}>
                    ₹{item.price}/Per Person
                    <FaRegCalendarAlt className="text-muted ms-4" />
                    <span className="text-muted fw-medium fs-6"> {item.tourtype}</span>
                  </Card.Title>

                  <div className="d-flex align-items-center mt-2">
                    <FaMapMarkerAlt className="me-2 text-danger" />
                    <span className="text-muted">{item.name}</span>
                  </div>
                  <div className="d-flex align-items-center mt-2">
                    <FaStar className="me-2 text-warning" />
                    <span className="text-muted">{item.rating}</span>
                  </div>

                  <div className='d-flex justify-content-center mt-3'>
                    <Link to={`/packagedetails/${item._id}`} className=''>
                      <Button className='package_btn text-white w-100'>
                        View Details
                      </Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Footer />
    </>
  );
}

export default Packages;
