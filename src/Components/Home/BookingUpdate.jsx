import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbars from "./Navbars";
import { Breadcrumb, Button, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import backgroundImage from "../../images/breadcrum.jpg";
import { Getuserbookingdata, updateBooking } from "../../ApiService";
import toast from "react-hot-toast";

function BookingUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    location: "",
    country: "",
    date: "",
    price: "",
    guest: "",
  });

  useEffect(() => {
    async function fetchBookingData() {
      try {
        const response = await Getuserbookingdata();
        const currentUser = response.find((u) => u._id === id);
        if (currentUser) {
          const formattedDate = currentUser.date ? new Date(currentUser.date).toISOString().split("T")[0] : "";
          setBook({ ...currentUser, date: formattedDate });
        } else {
          console.error("No booking data found.");
        }
      } catch (error) {
        console.error("Error fetching booking:", error);
        toast.error("Failed to load booking data");
      }
    }
    fetchBookingData();
  }, [id]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBooking(id, book);
      toast.success("Booking updated successfully!");
      navigate("/bookingconformation");
    } catch (error) {
      console.error("Error updating booking:", error);
      toast.error("Failed to update booking");
    }
  };

  return (
    <>
      <Navbars />
      {/* Hero/Breadcrumb Section */}
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "80px 0",
          width: "100%",
          textAlign: "center",
          position: "relative",
          color: "white"
        }}
      >
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)'
        }}></div>
        <Container style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)' }} className="mb-3 mb-md-4">Update Booking</h1>
          <Breadcrumb className="justify-content-center">
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }} className="text-white">
              <span className="fs-5 fs-md-6 text-white text-decoration-none">Home</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item active className="fs-5 fs-md-6" style={{ color: "#0084b4" }}>
              Update Booking
            </Breadcrumb.Item>
          </Breadcrumb>
        </Container>
      </div>

      {/* Booking Form Section */}
      <Container className="my-4 my-md-5">
        <Row className="justify-content-center">
          <Col xs={12} lg={8} xl={8}>
            <div className="bg-white p-3 p-md-4 p-lg-5 shadow rounded">
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#0084b4' }} className="mb-3 mb-md-4 text-center text-md-start">
                Update Your Booking
              </h2>
              
              <Form onSubmit={handleSubmit}>
                <Row className="g-3">
                  <Col xs={12} md={6}>
                    <FloatingLabel controlId="floatingFirstName" label="First Name" className="mb-3">
                      <Form.Control
                        type="text"
                        name="firstname"
                        value={book.firstname}
                        onChange={handleChange}
                        required
                      />
                    </FloatingLabel>
                  </Col>
                  <Col xs={12} md={6}>
                    <FloatingLabel controlId="floatingLastName" label="Last Name" className="mb-3">
                      <Form.Control
                        type="text"
                        name="lastname"
                        value={book.lastname}
                        onChange={handleChange}
                        required
                      />
                    </FloatingLabel>
                  </Col>

                  <Col xs={12} md={6}>
                    <FloatingLabel controlId="floatingEmail" label="Email" className="mb-3">
                      <Form.Control
                        type="email"
                        name="email"
                        value={book.email}
                        onChange={handleChange}
                        required
                      />
                    </FloatingLabel>
                  </Col>
                  <Col xs={12} md={6}>
                    <FloatingLabel controlId="floatingPhone" label="Phone No" className="mb-3">
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={book.phone}
                        onChange={handleChange}
                        required
                      />
                    </FloatingLabel>
                  </Col>

                  <Col xs={12} md={6}>
                    <FloatingLabel controlId="floatingLocation" label="Location" className="mb-3">
                      <Form.Control
                        type="text"
                        name="location"
                        value={book.location}
                        onChange={handleChange}
                        required
                      />
                    </FloatingLabel>
                  </Col>
                  <Col xs={12} md={6}>
                    <FloatingLabel controlId="floatingCountry" label="Country" className="mb-3">
                      <Form.Control
                        type="text"
                        name="country"
                        value={book.country}
                        onChange={handleChange}
                        required
                      />
                    </FloatingLabel>
                  </Col>

                  <Col xs={12} md={6}>
                    <FloatingLabel controlId="floatingDate" label="Date" className="mb-3">
                      <Form.Control
                        type="date"
                        name="date"
                        value={book.date}
                        onChange={handleChange}
                        required
                      />
                    </FloatingLabel>
                  </Col>
                  <Col xs={12} md={6}>
                    <FloatingLabel controlId="floatingPrice" label="Price" className="mb-3">
                      <Form.Control
                        type="text"
                        name="price"
                        value={book.price}
                        onChange={handleChange}
                        readOnly
                      />
                    </FloatingLabel>
                  </Col>

                  <Col xs={12} md={6}>
                    <FloatingLabel controlId="floatingGuest" label="No of Guests" className="mb-3">
                      <Form.Control
                        type="number"
                        name="guest"
                        value={book.guest}
                        onChange={handleChange}
                        required
                        min="1"
                      />
                    </FloatingLabel>
                  </Col>

                  <Col xs={12} className="mt-3">
                    <div className="d-grid">
                      <Button
                        type="submit" 
                        className="text-white py-2"
                        style={{ backgroundColor: "#0084b4", fontSize: '1rem' }}
                      >
                        Update Booking
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}

export default BookingUpdate;