import React, { useEffect, useState } from 'react';
import { Button, Container, Nav, Navbar, Row, Col, Card, Carousel } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { RiAccountCircleFill } from "react-icons/ri";
import { FaUmbrellaBeach, FaMountain, FaLandmark, FaStar, FaHotel, FaUtensils, FaMapMarkerAlt } from "react-icons/fa";
import logo from '../../images/logo.jpg'; 
import backgroundImage from '../../images/background.jpg'; 
import AOS from 'aos'; 
import 'aos/dist/aos.css'; 
import Navbars from '../Home/Navbars';
import Footer from '../Footer/Footer';

// Define primary color as a constant
const PRIMARY_COLOR = '#0084B4';

function Home() {
  const navigate = useNavigate();
  const auth = localStorage.getItem('user');
  const [searchQuery, setSearchQuery] = useState('');

  const handleremove = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  useEffect(() => {
    if (auth == false) {
      navigate('/');
      console.log("login......")
    }
    AOS.init({ duration: 1200 });
  }, [auth, navigate]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      console.log('Searching for:', searchQuery);
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const popularDestinations = [
    { id: 1, name: 'Bali, Indonesia', image: require('../../images/bali.jpg'), rating: 4.8 },
    { id: 2, name: 'Paris, France', image: require('../../images/paris.jpg'), rating: 4.7 },
    { id: 3, name: 'Tokyo, Japan', image: require('../../images/Lake Geneva.jpg'), rating: 4.9 },
    { id: 4, name: 'New York, USA', image: require('../../images/Cultural.jpg'), rating: 4.6 },
  ];

  const features = [
    { icon: <FaStar size={40} color={PRIMARY_COLOR} />, title: "Best Price Guarantee", description: "We guarantee the best prices for all our packages." },
    { icon: <FaHotel size={40} color={PRIMARY_COLOR} />, title: "Handpicked Hotels", description: "Luxurious hotels with top ratings and amenities." },
    { icon: <FaUtensils size={40} color={PRIMARY_COLOR} />, title: "World Class Service", description: "Our team is available 24/7 to assist you." },
    { icon: <FaMapMarkerAlt size={40} color={PRIMARY_COLOR} />, title: "Local Guides", description: "Expert local guides for authentic experiences." },
  ];

  return (
    <>
      <Navbars primaryColor={PRIMARY_COLOR} />
      
      {/* Hero Section */}
      <section 
        className="hero-section d-flex align-items-center py-5 py-lg-0" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          // minHeight: '60vh',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Container className="py-3 py-lg-5">
          <div className="hero-text" data-aos="fade-up">
            <h1 className="display-4 display-md-3 display-lg-2 mb-3 mb-md-4">Discover Your Perfect Getaway</h1>
            <p className="lead mb-4 mb-md-5 fs-5 fs-md-4">Explore the world's most beautiful destinations with our expertly crafted tours</p>
            
            <div className="d-grid gap-2 d-md-block">
              <Link to='/package'>
                <Button 
                  variant="primary" 
                  size="lg"  
                  className="px-4 py-2"
                  style={{backgroundColor: PRIMARY_COLOR, borderColor: PRIMARY_COLOR}}
                >
                  Explore Packages
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Special Offers */}
      <section className="py-5">
        <Container>
          <div className="section-heading text-center mb-4 mb-md-5">
            <span style={{color: PRIMARY_COLOR}} className="fs-5 fw-bold">EXCLUSIVE OFFERS</span>
            <h2 className="display-5 display-md-4 fw-bold mt-2">Featured Special Offers</h2>
            <p className="text-muted mx-auto fs-6 fs-md-5" style={{maxWidth: '700px'}}>
              Discover our handpicked selection of special travel packages designed to give you the best experiences
            </p>
          </div>
          
          <Row className="g-3 g-md-4">
            <Col xs={12} md={6} lg={4} data-aos="fade-up">
              <Card className="h-100 border-0 shadow-sm overflow-hidden">
                <div className="position-relative overflow-hidden" style={{height: '200px', minHeight: '200px'}}>
                  <Card.Img 
                    variant="top" 
                    src={require('../../images/mounatin.jpg')} 
                    className="img-fluid h-100 w-100" 
                    style={{objectFit: 'cover'}}
                  />
                </div>
                <Card.Body className="p-3 p-md-4">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted"><FaMountain className="me-2" />Adventure</span>
                    <div className="text-warning">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                  </div>
                  <Card.Title className="fs-5 fs-md-4">Mountain Adventure</Card.Title>
                  <Card.Text className="text-muted fs-6">
                    Explore the mountains with thrilling hiking and trekking adventures through breathtaking.
                  </Card.Text>
                  <div className="d-flex justify-content-center align-items-center mt-3">
                    <Link to='/package'>
                      <Button variant="btn" style={{borderColor: PRIMARY_COLOR, color: PRIMARY_COLOR}}>
                        View Details
                      </Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col xs={12} md={6} lg={4} data-aos="fade-up" data-aos-delay="100">
              <Card className="h-100 border-0 shadow-sm overflow-hidden">
                <div className="position-relative overflow-hidden" style={{height: '200px', minHeight: '200px'}}>
                  <Card.Img 
                    variant="top" 
                    src={require('../../images/beach.jpg')} 
                    className="img-fluid h-100 w-100" 
                    style={{objectFit: 'cover'}}
                  />
                </div>
                <Card.Body className="p-3 p-md-4">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted"><FaUmbrellaBeach className="me-2" />Beach</span>
                    <div className="text-warning">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                  </div>
                  <Card.Title className="fs-5 fs-md-4">Beach Getaway</Card.Title>
                  <Card.Text className="text-muted fs-6">
                    Enjoy a relaxing beach vacation, perfect for unwinding by the sea with luxury accommodations.
                  </Card.Text>
                  <div className="d-flex justify-content-center align-items-center mt-3">
                    <Link to='/package'>
                      <Button variant="outline-primary" style={{borderColor: PRIMARY_COLOR, color: PRIMARY_COLOR}}>
                        View Details
                      </Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col xs={12} md={6} lg={4} data-aos="fade-up" data-aos-delay="200">
              <Card className="h-100 border-0 shadow-sm overflow-hidden">
                <div className="position-relative overflow-hidden" style={{height: '200px', minHeight: '200px'}}>
                  <Card.Img 
                    variant="top" 
                    src={require('../../images/Cultural.jpg')} 
                    className="img-fluid h-100 w-100" 
                    style={{objectFit: 'cover'}}
                  />
                </div>
                <Card.Body className="p-3 p-md-4">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted"><FaLandmark className="me-2" />Cultural</span>
                    <div className="text-warning">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                  </div>
                  <Card.Title className="fs-5 fs-md-4">Cultural Tour</Card.Title>
                  <Card.Text className="text-muted fs-6">
                    Immerse yourself in history and culture with guided tours to ancient cities and heritage sites.
                  </Card.Text>
                  <div className="d-flex justify-content-center align-items-center mt-3">
                    <Link to='/package'>
                      <Button variant="outline-primary" style={{borderColor: PRIMARY_COLOR, color: PRIMARY_COLOR}}>
                        View Details
                      </Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          <div className="text-center mt-4 mt-md-5" data-aos="fade-up">
            <Link to='/package'>
              <Button 
                size="lg" 
                style={{backgroundColor: PRIMARY_COLOR, borderColor: PRIMARY_COLOR}}
              >
                View All Packages
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Popular Destinations Section */}
      <section className="py-5 bg-light">
        <Container>
          <div className="section-heading text-center mb-4 mb-md-5">
            <span style={{color: PRIMARY_COLOR}} className="fs-5 fw-bold">TOP DESTINATIONS</span>
            <h2 className="display-5 display-md-4 fw-bold mt-2">Popular Destinations</h2>
            <p className="text-muted mx-auto fs-6 fs-md-5" style={{maxWidth: '700px'}}>
              Explore our most sought-after travel destinations loved by travelers worldwide
            </p>
          </div>
          
          <Row className="g-3 g-md-4">
            {popularDestinations.map((destination, index) => (
              <Col xs={12} sm={6} lg={3} key={destination.id} data-aos="fade-up" data-aos-delay={index * 100}>
                <Card className="h-100 border-0 shadow-sm overflow-hidden destination-card">
                  <div className="position-relative overflow-hidden" style={{height: '250px', minHeight: '250px'}}>
                    <Card.Img 
                      variant="top" 
                      src={destination.image} 
                      className="img-fluid w-100 h-100" 
                      style={{objectFit: 'cover'}}
                    />
                    <div className="position-absolute bottom-0 start-0 end-0 p-3 text-white" 
                      style={{background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent'}}>
                      <h5 className="mb-0">{destination.name}</h5>
                      <div className="d-flex align-items-center">
                        <FaStar className="text-warning me-1" />
                        <span>{destination.rating}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* About Us Section */}
      <section className="py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0" data-aos="fade-right">
              <img 
                src={require('../../images/about.jpg')} 
                alt="About Us" 
                className="img-fluid rounded shadow w-100" 
                style={{maxHeight: '500px', objectFit: 'cover'}}
              />
            </Col>
            <Col lg={6} data-aos="fade-left">
              <div className="ps-lg-3 ps-xl-5">
                <span style={{color: PRIMARY_COLOR}} className="fs-5 fw-bold">ABOUT US</span>
                <h2 className="display-5 display-md-4 fw-bold mt-2 mb-3 mb-md-4">We Are The World's Best Travel Agency</h2>
                <p className="text-muted mb-4 fs-6">
                  Founded in 2010, our travel agency has been dedicated to creating unforgettable travel experiences 
                  for our clients. With a team of passionate travel experts, we craft personalized journeys that 
                  go beyond the ordinary.
                </p>
                
                <div className="mb-4">
                  <div className="d-flex mb-3">
                    <div className="me-3" style={{color: PRIMARY_COLOR}}>
                      <FaStar size={24} />
                    </div>
                    <div>
                      <h5 className="mb-1">Award-Winning Service</h5>
                      <p className="text-muted mb-0 fs-6">
                        Recognized as the best travel agency for 3 consecutive years by Travel Excellence Awards.
                      </p>
                    </div>
                  </div>
                  
                  <div className="d-flex mb-3">
                    <div className="me-3" style={{color: PRIMARY_COLOR}}>
                      <FaMapMarkerAlt size={24} />
                    </div>
                    <div>
                      <h5 className="mb-1">Global Network</h5>
                      <p className="text-muted mb-0 fs-6">
                        Partnerships with over 500 hotels and 200 tour operators across 50 countries.
                      </p>
                    </div>
                  </div>
                  
                  <div className="d-flex">
                    <div className="me-3" style={{color: PRIMARY_COLOR}}>
                      <FaHotel size={24} />
                    </div>
                    <div>
                      <h5 className="mb-1">Quality Accommodations</h5>
                      <p className="text-muted mb-0 fs-6">
                        We personally inspect every hotel and resort we recommend to our clients.
                      </p>
                    </div>
                  </div>
                </div>
                
                <Link to='/about'>
                  <Button 
                    variant="" 
                    size="lg"
                    style={{borderColor: PRIMARY_COLOR, color: PRIMARY_COLOR}}
                  >
                    Learn More About Us
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-5 bg-light">
        <Container>
          <div className="section-heading text-center mb-4 mb-md-5">
            <span style={{color: PRIMARY_COLOR}} className="fs-5 fw-bold">OUR ADVANTAGES</span>
            <h2 className="display-5 display-md-4 fw-bold mt-2">Why Choose Us</h2>
            <p className="text-muted mx-auto fs-6 fs-md-5" style={{maxWidth: '700px'}}>
              We go the extra mile to make your travel experience exceptional
            </p>
          </div>
          
          <Row className="g-3 g-md-4">
            {features.map((feature, index) => (
              <Col xs={12} sm={6} md={6} lg={3} key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                <Card className="h-100 border-0 bg-white shadow-sm text-center p-3 p-md-4">
                  <div className="mb-3" style={{color: PRIMARY_COLOR}}>
                    {feature.icon}
                  </div>
                  <Card.Title className="fs-5 mb-2 mb-md-3">{feature.title}</Card.Title>
                  <Card.Text className="text-muted fs-6">
                    {feature.description}
                  </Card.Text>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Testimonial Section */}
      <section className="py-5">
        <Container>
          <div className="section-heading text-center mb-4 mb-md-5">
            <span style={{color: PRIMARY_COLOR}} className="fs-5 fw-bold">TESTIMONIALS</span>
            <h2 className="display-5 display-md-4 fw-bold mt-2">What Our Clients Say</h2>
            <p className="text-muted mx-auto fs-6 fs-md-5" style={{maxWidth: '700px'}}>
              Hear from travelers who have experienced our services firsthand
            </p>
          </div>
          
          <Row className="g-3 g-md-4">
            <Col xs={12} md={6} lg={4} data-aos="fade-up">
              <Card className="h-100 border-0 shadow-sm p-3 p-md-4">
                <div className="d-flex mb-4">
                  <img 
                    src={require('../../images/reviewer1.jpg')} 
                    alt="Rima Shah" 
                    className="rounded-circle me-3" 
                    style={{width: '60px', height: '60px', objectFit: 'cover'}}
                  />
                  <div>
                    <h5 className="mb-1">Rima Shah</h5>
                    <p className="text-muted mb-0">Traveller</p>
                    <div className="text-warning">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                  </div>
                </div>
                <Card.Text className="text-muted fs-6">
                  "We had an amazing experience with this tour company! Every detail was taken care of, from airport transfers to daily itineraries. The guides were and friendly. Will definitely book with them again!"
                </Card.Text>
              </Card>
            </Col>
            
            <Col xs={12} md={6} lg={4} data-aos="fade-up" data-aos-delay="100">
              <Card className="h-100 border-0 shadow-sm p-3 p-md-4">
                <div className="d-flex mb-4">
                  <img 
                    src={require('../../images/reviewer2.jpg')} 
                    alt="Dina Jain" 
                    className="rounded-circle me-3" 
                    style={{width: '60px', height: '60px', objectFit: 'cover'}}
                  />
                  <div>
                    <h5 className="mb-1">Dina Jain</h5>
                    <p className="text-muted mb-0">Traveller</p>
                    <div className="text-warning">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                  </div>
                </div>
                <Card.Text className="text-muted fs-6">
                  "The cultural tour was one of the best experiences we've had. It was both informative and fun! The itinerary was perfectly balanced with sightseeing and free time. The hotels were excellent too."
                </Card.Text>
              </Card>
            </Col>
            
            <Col xs={12} md={6} lg={4} data-aos="fade-up" data-aos-delay="200">
              <Card className="h-100 border-0 shadow-sm p-3 p-md-4">
                <div className="d-flex mb-4">
                  <img 
                    src={require('../../images/reviewer3.jpg')} 
                    alt="Preet Mehta" 
                    className="rounded-circle me-3" 
                    style={{width: '60px', height: '60px', objectFit: 'cover'}}
                  />
                  <div>
                    <h5 className="mb-1">Preet Mehta</h5>
                    <p className="text-muted mb-0">Traveller</p>
                    <div className="text-warning">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                  </div>
                </div>
                <Card.Text className="text-muted fs-6">
                  "The beach getaway package was exactly what we needed. It was relaxing and rejuvenating! The resort was stunning and the staff went above and beyond to make our stay memorable. Can't wait to return!"
                </Card.Text>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call to Action Section */}
      <section className="py-5" style={{backgroundColor: PRIMARY_COLOR, color: 'white'}}>
        <Container className="text-center py-3 py-md-4">
          <h2 className="display-5 display-md-4 fw-bold mb-3 mb-md-4">Ready for Your Next Adventure?</h2>
          <p className="lead mb-4 mb-md-5 mx-auto fs-5 fs-md-4" style={{maxWidth: '700px'}}>
            Contact us today to start planning your dream vacation. Our travel experts are ready to create a personalized itinerary just for you.
          </p>
          <Link to='/contactus'>
            <Button 
              variant="light" 
              size="lg" 
              className="px-4 py-2"
            >
              Contact Us Now
            </Button>
          </Link>
        </Container>
      </section>

      <Footer primaryColor={PRIMARY_COLOR} />

      {/* Custom CSS */}
      {/* <style>
        {`
          /* Base styles for mobile 
          .hero-section {
            min-height: 60vh;
          }
          
          /* Medium devices (tablets, 768px and up) 
          @media (min-width: 768px) {
            .hero-section {
              min-height: 70vh;
            }
          }
          
          /* Large devices (desktops, 992px and up) 
          @media (min-width: 992px) {
            .hero-section {
              min-height: 90vh;
            }
          }
          
          /* Ensure cards have consistent height on mobile 
          @media (max-width: 767px) {
            .destination-card {
              margin-bottom: 1.5rem;
            }
          }
          
          /* Adjust testimonial images on small screens 
          @media (max-width: 575px) {
            .testimonial-img {
              width: 50px !important;
              height: 50px !important;
            }
          }

          /* Destination card hover effect 
          .destination-card:hover img {
            transform: scale(1.05);
            transition: transform 0.3s ease;
          }

          /* Button hover effects 
          .btn-outline-primary:hover {
            background-color: ${PRIMARY_COLOR} !important;
            color: white !important;
          }

          /* Card hover shadow effect 
          .card:hover {
            box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
            transition: all 0.3s ease;
          }
        `}
      </style> */}
    </>
  );
}

export default Home;