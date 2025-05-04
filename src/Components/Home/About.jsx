import React from "react";
import { Breadcrumb, Container, Row, Col, Card } from "react-bootstrap";
import Navbars from "../Home/Navbars";
import backgroundImage from "../../images/breadcrum.jpg";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";

function About() {
    return (
        <div>
            <Navbars />
            
            {/* Hero Section with Breadcrumb */}
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
          <h1 className="mb-4">About Us</h1>
          <Breadcrumb style={{ justifyContent: 'center' }} className="d-flex flex-wrap">
            <Breadcrumb.Item>
              <Link to="/" className="fs-5 text-white text-decoration-none">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active className="fs-5" style={{ color: "#0084b4" }}>
                About Us
            </Breadcrumb.Item>
          </Breadcrumb>
        </Container>
      </div>

            {/* About Section */}
            <section className="py-4 py-md-5">
                <Container>
                    <Row className="align-items-center">
                        <Col lg={6} className="mb-4 mb-lg-0 order-2 order-lg-1">
                            <h4 style={{ color: '#0084b4' }}>About Us</h4>
                            <h2 className="mb-3 mb-md-4" style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>
                                We Are The World's Best Travel Agency
                            </h2>
                            <p className="lead mb-3">
                                With over 15 years of experience, we've been creating unforgettable travel experiences for our clients.
                            </p>
                            <p className="mb-3 lead">
                                Our team of passionate travel experts is dedicated to crafting personalized journeys that go beyond the ordinary. 
                                We believe travel should be transformative, not just transactional.
                            </p>
                            <p className="mb-3 mb-md-4 lead">
                                From luxury getaways to adventurous expeditions, we tailor each itinerary to your unique preferences, 
                                ensuring every detail is perfect.
                            </p>
                            <div className="mt-3 mt-md-4">
                                <Link 
                                    to="/contactus" 
                                    className="btn text-white px-4 py-2"
                                    style={{ backgroundColor: '#0084B4', fontSize: '1.3rem' }}
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </Col>
                        <Col lg={6} className="order-1 order-lg-2 mb-4 mb-lg-0">
                            <img 
                                src={require('../../images/about.jpg')} 
                                alt="About Us" 
                                className="img-fluid rounded shadow" 
                                style={{ 
                                    width: '100%', 
                                    height: 'auto',
                                    maxHeight: '500px',
                                    objectFit: 'cover' 
                                }}
                            />
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Our Team Section */}
            <section className="py-4 py-md-5 bg-light">
                <Container>
                    <div className="text-center mb-4 mb-md-5">
                        <h4 style={{ color: '#0084b4' }}>Our Team</h4>
                        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>Meet The Experts</h2>
                        <p className="lead">The passionate people behind your perfect journey</p>
                    </div>
                    <Row>
                        <Col xs={12} md={6} lg={4} className="mb-4">
                            <Card className="h-100 border-0 shadow-sm">
                                <Card.Img 
                                    variant="top" 
                                    src={require('../../images/team2.jpeg')} 
                                    style={{ 
                                        height: '250px', 
                                        objectFit: 'cover',
                                        width: '100%'
                                    }}
                                />
                                <Card.Body className="text-center text-md-start">
                                    <Card.Title>Sarah Johnson</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">Founder & CEO</Card.Subtitle>
                                    <Card.Text>
                                        20+ years of travel experience with expertise in luxury European tours.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} md={6} lg={4} className="mb-4">
                            <Card className="h-100 border-0 shadow-sm">
                                <Card.Img 
                                    variant="top" 
                                    src={require('../../images/reviewer2.jpg')} 
                                    style={{ 
                                        height: '250px', 
                                        objectFit: 'cover',
                                        width: '100%'
                                    }}
                                />
                                <Card.Body className="text-center text-md-start">
                                    <Card.Title>Michael Chen</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">Adventure Specialist</Card.Subtitle>
                                    <Card.Text>
                                        Expert in adventure travel with certifications in mountaineering and diving.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} md={6} lg={4} className="mb-4">
                            <Card className="h-100 border-0 shadow-sm">
                                <Card.Img 
                                    variant="top" 
                                    src={require('../../images/reviewer3.jpg')} 
                                    style={{ 
                                        height: '250px', 
                                        objectFit: 'cover',
                                        width: '100%'
                                    }}
                                />
                                <Card.Body className="text-center text-md-start">
                                    <Card.Title>Emma Rodriguez</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">Customer Experience</Card.Subtitle>
                                    <Card.Text>
                                        Dedicated to ensuring every client receives exceptional service.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Stats Section - Uncomment if needed */}
            {/* <section className="py-4 py-md-5" style={{ backgroundColor: '#0084b4', color: 'white' }}>
                <Container>
                    <Row className="text-center">
                        <Col xs={6} md={3} className="mb-4 mb-md-0">
                            <h2 className="display-4">15+</h2>
                            <p className="mb-0">Years Experience</p>
                        </Col>
                        <Col xs={6} md={3} className="mb-4 mb-md-0">
                            <h2 className="display-4">50+</h2>
                            <p className="mb-0">Destinations</p>
                        </Col>
                        <Col xs={6} md={3} className="mb-4 mb-md-0">
                            <h2 className="display-4">10k+</h2>
                            <p className="mb-0">Happy Travelers</p>
                        </Col>
                        <Col xs={6} md={3}>
                            <h2 className="display-4">24/7</h2>
                            <p className="mb-0">Support</p>
                        </Col>
                    </Row>
                </Container>
            </section> */}

            <Footer />
        </div>
    );
}

export default About;