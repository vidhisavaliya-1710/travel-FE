import React, { useEffect, useState } from 'react'
import Navbars from '../Home/Navbars'
import Footer from '../Footer/Footer';
import { Container, Row, Col, Card, Button, Accordion, Breadcrumb, Table } from "react-bootstrap";
import { FaClock, FaUsers, FaMapMarkerAlt, FaStar, FaBus } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import backgroundImage from "../../images/breadcrum.jpg";
import { getSinglePackage } from '../../ApiService';
import '../Home/Packages.css'
import { useDispatch, useSelector } from 'react-redux';

function PackageDetailPage() {

    const {id}=useParams();
    const [packages, setPackages] = useState([]);
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const email=useSelector((state)=>state.counter.email)

    console.log("user email",email)

    const handleBookNow = () => {

      if(!email){
        navigate("/login");
      }else{
        navigate(`/bookingform/${packages._id}`);
      }
      
    };


   useEffect(() => {
      async function fetchPackages() {
        try {
          const data = await getSinglePackage(id,dispatch);
          setPackages(data); // Store fetched data in state
          console.log("packages",data)
        } catch (error) {
          console.error("Error fetching packages:", error);
        }
      }
      fetchPackages();
    },[id,dispatch]);

  return (
    <>
      
        <Navbars/>
      <div
                            style={{
                                backgroundImage: `url(${backgroundImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                padding: '100px',
                                width: '100%',
                                textAlign: 'center',
                            }}
                        >
                            <Container>
                                <Breadcrumb style={{ justifyContent: 'center' }} className="d-flex">
                                    <Breadcrumb.Item linkAs="span">
                                        <Link to="/" className="fs-5 text-white" style={{ textDecoration: "none", color: "inherit" }}>
                                            Home
                                        </Link>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item active className="fs-5" style={{ color: "#0084b4" }}>
                                       Package Details
                                    </Breadcrumb.Item>
                                </Breadcrumb>
                            </Container>
                        </div>



<Container className="my-5">
        {/* Package Overview */}
        <Row>
          <Col md={8} className="mb-4">
            <h2 className="fw-bold text-dark">{packages.name}</h2>
            <p className="text-muted fs-5">
              <FaMapMarkerAlt className="me-2 text-primary" /> {packages.destination}
            </p>
            <p className="text-muted fs-5">
              <FaStar className="text-warning me-1" /> {packages.rating}
            </p>
            </Col>
            </Row>
            <Row className="text-muted fs-5 ">
              <Col className="d-flex align-items-center">
                <FaClock className="me-2 icon_color fs-4" /> Duration: {packages.tourtype}
              </Col>
              <Col className="d-flex align-items-center fs-5">
                <FaUsers className="me-1 icon_color fs-4" /> Group size: 30 people
              </Col>
              <Col className="d-flex align-items-center fs-5">
                <FaMapMarkerAlt className="me-1 icon_color fs-4" /> Location: {packages.destination}
              </Col>
            </Row>
        
        

        {/* Package Image and Overview */}
        <Row className="mt-4">
          <Col lg={6} className="mb-4">
            <Card className="border-0 shadow-lg overflow-hidden rounded-4">
              <Card.Img
                variant="top"
                src={packages?.img?.[0]}
                className="img-fluid"
                style={{ height: "500px", objectFit: "cover" }}
              />
            </Card>
          </Col>

          <Col lg={6} className="mb-4">
            <Card className="p-4 shadow-sm border-0 h-100 bg-light">
              <h4 className="fw-bold text-secondary">Included</h4>
              <p className="text-muted fs-5">
              ✅{packages.included}
              </p>

              <h4 className="fw-bold text-secondary">Excluded</h4>
              <p className="text-muted fs-5">
              ❌ {packages.excluded}
              </p>
              {/* <ul className="list-unstyled text-muted">
                <li>✅ <strong>Guided hikes</strong> through lush rainforests</li>
                <li>✅ Spot <strong>exotic wildlife</strong> in their natural habitat</li>
                <li>✅ <strong>Canoe rides</strong> along the Amazon River</li>
                <li>✅ Engage with <strong>indigenous communities</strong></li>
                <li>✅ Enjoy <strong>delicious local cuisine</strong> under the stars</li>
              </ul> */}

              {/* Why Choose This Trip Section */}
              <div className="mt-3 p-3 bg-white shadow-sm rounded">
                <h5 className="fw-bold text-secondary">🌟 Why Choose This Trip?</h5>
                <p className="text-muted">
                  {packages.description} 🌎✨
                </p>
              </div>
                
              <div className="my-5 d-flex">
            <Button
              style={{
                padding: '10px 15px',
                borderRadius: '5px',
                backgroundColor: "#0084b4",
                border: "none",
                color: "#fff",
              }}

              className='fs-5'
              onClick={handleBookNow}
            >
              Book Now
            </Button>

            <Link to={`/gallery/${packages._id}`}>
            <Button
              style={{
                padding: '10px 15px',
                borderRadius: '5px',
                backgroundColor: "#0084b4",
                border: "none",
                color: "#fff",
              }}

              className='fs-5 ms-4'
            >
              View Gallery
            </Button>
            </Link>
        </div>
        
            </Card>
          </Col>
        </Row>

        {/* Trip Details Table */}
        <Card className="mt-3 p-4 shadow-sm border-0">
          <h2 className="fw-bold mb-3 " style={{color:'#0084b4'}}>Trip Details</h2>
          <Table bordered hover responsive className="">
            <tbody>
              <tr className='fs-5'>
                <td className="fw-bold">Destination</td>
                <td>{packages.destination}</td>
              </tr>
              <tr className='fs-5'>
                <td className="fw-bold">Departure</td>
                <td>Required</td>
              </tr>
              <tr className='fs-5'>
                <td className="fw-bold">Price</td>
                <td>₹{packages.price} Per Person</td>
              </tr>
              <tr className='fs-5'>
                <td className="fw-bold">Departure Time</td>
                <td>{packages.departuretime}</td>
              </tr>
              <tr className='fs-5'>
                <td className="fw-bold">Return Time</td>
                <td>{packages.returnrime}</td>
              </tr>
              <tr className='fs-5'>
                <td className="fw-bold">Included</td>
                <td className="text-start">
                   <p>✅ {packages.included}</p>
                  {/* <p>✅ Private Transport</p>
                  <p>✅ Entrance Fees</p>
                  <p>✅ Meals & Snacks</p>  */}
                </td>
              </tr>
              <tr className='fs-5'>
                <td className="fw-bold">Excluded</td>
                <td className="text-start">
                  <p>❌ {packages.excluded}</p>
                </td>
              </tr>
              <tr className='fs-5'>
                <td colSpan="2" className="text-center bg-light">
                  <FaBus className="text-danger me-2" /> <strong>Travel With {packages.vehicle}</strong>
                </td>
              </tr>
            </tbody>
          </Table>
        </Card>

        {/* Book Now Button */}
        
      </Container>
      
                        <Footer/>


    </>
  )
}

export default PackageDetailPage
