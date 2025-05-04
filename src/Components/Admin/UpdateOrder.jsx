import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { Breadcrumb, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";

import { Link } from "react-router-dom";
import backgroundImage from "../../images/breadcrum.jpg";
import { AllOrders, Getuserbookingdata, updateBooking } from "../../ApiService";
import Admin from "./Admin";
import { FaArrowLeftLong } from "react-icons/fa6";
import toast from "react-hot-toast";

function UpdateOrder() {

     const { id } = useParams(); // Get ID from URL
      const navigate = useNavigate(); // For redirection
    
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
    
      // Fetch existing booking details when component loads
      useEffect(() => {
        async function fetchBookingData() {
          try {
            const response = await AllOrders();
            const currentUser = response.find((u) => u._id === id);
            if (currentUser) {
              // Convert date to YYYY-MM-DD format
              const formattedDate = currentUser.date ? new Date(currentUser.date).toISOString().split("T")[0] : "";
              setBook({ ...currentUser, date: formattedDate });
            } else {
              console.error("No booking data found.");
            }
          } catch (error) {
            console.error("Error fetching booking:", error);
          }
        }
        fetchBookingData();
      }, [id]);
      
    
      // Handle input change
      const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
      };
    
      // Handle form submission
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await updateBooking(id, book); // Call API to update booking
          // alert("Booking updated successfully!");
          toast.success("Booking Update successfully!")
          navigate("/orders"); // Redirect to BookingConfirmation page
        } catch (error) {
          console.error("Error updating booking:", error);
          toast.error("Error updating booking:", error)
        }
      };


  return (
    <>
        <div className='d-flex'>
                        <Admin />
                          <Link to='/addpackage'><FaArrowLeftLong className='fs-2 ms-5 arrow_icon'/></Link>
                          <div className="container">
                <Row>
                  <Col lg={8}>
                    <div className="order_sec p-4 ps-5 pe-5">
                      <h2 className="mb-3">Update Booking</h2>
                      <Form onSubmit={handleSubmit}>
                        <Row>
                          <Col lg={6}>
                            <FloatingLabel controlId="floatingInput" label="First Name" className="mb-3 form_sec">
                              <input type="text" name="firstname" className="form_sec form-control" onChange={handleChange} value={book.firstname} />
                            </FloatingLabel>
                          </Col>
                          <Col lg={6}>
                            <FloatingLabel controlId="floatingInput" label="Last Name" className="mb-3 form_sec">
                              <input type="text" name="lastname" className="form_sec form-control" onChange={handleChange} value={book.lastname} />
                            </FloatingLabel>
                          </Col>
                        </Row>
        
                        <Row>
                          <Col lg={6}>
                            <FloatingLabel controlId="floatingInput" label="Email" className="mb-3 form_sec">
                              <input type="email" name="email" className="form_sec form-control" onChange={handleChange} value={book.email} />
                            </FloatingLabel>
                          </Col>
                          <Col lg={6}>
                            <FloatingLabel controlId="floatingInput" label="Phone No" className="mb-3 form_sec">
                              <input type="text" name="phone" className="form_sec form-control" onChange={handleChange} value={book.phone} />
                            </FloatingLabel>
                          </Col>
                        </Row>
        
                        <Row>
                          <Col lg={6}>  
                            <FloatingLabel controlId="floatingInput" label="Location" className="mb-3 form_sec">
                              <input type="text" name="location" className="form_sec form-control" onChange={handleChange} value={book.location} />
                            </FloatingLabel>
                          </Col>
                          <Col lg={6}>
                            <FloatingLabel controlId="floatingInput" label="Country" className="mb-3 form_sec">
                              <input type="text" name="country" className="form_sec form-control" onChange={handleChange} value={book.country} />
                            </FloatingLabel>
                          </Col>
                        </Row>
        
                        <Row>
                          <Col lg={6}>
                            <FloatingLabel controlId="floatingInput" label="Date" className="mb-3 form_sec">
                              <input type="date" name="date" className="form_sec form-control" onChange={handleChange} value={book.date} />
                            </FloatingLabel>
                          </Col>
                          <Col lg={6}>
                            <FloatingLabel controlId="floatingInput" label="Price" className="mb-3 form_sec">
                              <input type="text" name="price" className="form_sec form-control" onChange={handleChange} value={book.price} readOnly />
                            </FloatingLabel>
                          </Col>
                        </Row>
        
                        <Row>
                          <Col lg={6}>
                            <FloatingLabel controlId="floatingInput" label="No of Guests" className="mb-3 form_sec">
                              <input type="text" name="guest" className="form_sec form-control" onChange={handleChange} value={book.guest} />
                            </FloatingLabel>
                          </Col>
                        </Row>
        
                        <div className="d-flex justify-content-center">
                          <button type="submit" className="border-0 fs-5 mt-2 p-1 ps-3 pe-3 text-white btns rounded">
                            Update Booking
                          </button>
                        </div>
                      </Form>
                    </div>
                  </Col>
                </Row>
              </div>
        </div>  
    </>
  )
}

export default UpdateOrder
