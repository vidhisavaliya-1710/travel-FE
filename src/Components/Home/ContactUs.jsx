import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Breadcrumb, FloatingLabel } from "react-bootstrap";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import backgroundImage from "../../images/breadcrum.jpg";
import { Link } from "react-router-dom";
import Navbars from "../Home/Navbars";
import Footer from "../Footer/Footer";
import { AddContact } from "../../ApiService";
import toast from "react-hot-toast";

const ContactUs = () => {
    const [contact, setcontact] = useState({
        fname: '',
        subject: '',
        email: '',
        pno: '',
        msg: ''
    });

    const handleChange = (e) => {
        setcontact({...contact, [e.target.name]: e.target.value});
    }

    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await AddContact(contact);
            console.log('Contact us added successfully:', response);
            toast.success("Message sent successfully!");
            // Reset form after successful submission
            setcontact({
                fname: '',
                subject: '',
                email: '',
                pno: '',
                msg: ''
            });
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error('Failed to send message');
        }
    }

    return (
        <>
            <Navbars />
            {/* Breadcrumb Section */}
            <div
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    padding: '80px 0',
                    width: '100%',
                    textAlign: 'center',
                    position: 'relative',
                    color: 'white'
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
                    <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)' }} className="mb-3 mb-md-4">Contact Us</h1>
                    <Breadcrumb className="justify-content-center">
                        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }} className="text-white">
                            <span className="fs-5 fs-md-6 text-white text-decoration-none">Home</span>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active className="fs-5 fs-md-6" style={{ color: "#0084b4" }}>
                            Contact Us
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Container>
            </div>

            {/* Contact Information and Form Section */}
            <Container className="my-4 my-md-5">
                {/* Row for Cards */}
                <Row className="g-4 justify-content-evenly mb-5 mb-md-5 mt-3">
                    {/* Address Card */}
                    <Col xs={12} sm={6} md={4} lg={3}>
                        <Card className="shadow text-center h-100 border-0">
                            <Card.Body className="p-4">
                                <div className="icon-container mb-3">
                                    <FaMapMarkerAlt className="icon_sec" />
                                </div>
                                <h3 style={{ fontSize: '1.25rem' }}>Address</h3>
                                <p className="text-muted mb-0">123 Main Street, City, Surat</p>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Email Card */}
                    <Col xs={12} sm={6} md={4} lg={3}>
                        <Card className="shadow text-center h-100 border-0">
                            <Card.Body className="p-4">
                                <div className="icon-container mb-3">
                                    <FaEnvelope className="icon_sec" />
                                </div>
                                <h3 style={{ fontSize: '1.25rem' }}>Email</h3>
                                <p className="text-muted mb-0">traveltracker@gmail.com</p>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Phone Card */}
                    <Col xs={12} sm={6} md={4} lg={3}>
                        <Card className="shadow text-center h-100 border-0">
                            <Card.Body className="p-4">
                                <div className="icon-container mb-3">
                                    <FaPhoneAlt  className="icon_sec" />
                                </div>
                                <h3 style={{ fontSize: '1.25rem' }}>Phone</h3>
                                <p className="text-muted mb-0">+01852-1265122</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Form and Map Section */}
                <Row className="g-4 mt-4">
                    <Col lg={6} className="order-2 order-lg-1">
                        <div className="shadow rounded p-3 p-md-4 p-lg-5 bg-white">
                            <Form onSubmit={handlesubmit}>
                                <h2 style={{ color: "#0084b4", fontSize: 'clamp(1.5rem, 3vw, 2rem)' }} className="mb-3 mb-md-4">Get In Touch</h2>
                                
                                <Row className="g-3">
                                    <Col md={6}>
                                        <FloatingLabel controlId="floatingName" label="Full Name" className="mb-3">
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Full Name" 
                                                name="fname" 
                                                value={contact.fname}
                                                onChange={handleChange}
                                                required
                                            />
                                        </FloatingLabel>
                                    </Col>
                                    <Col md={6}>
                                        <FloatingLabel controlId="floatingSubject" label="Subject" className="mb-3">
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Subject" 
                                                name="subject" 
                                                value={contact.subject}
                                                onChange={handleChange}
                                                required
                                            />
                                        </FloatingLabel>
                                    </Col>
                                    
                                    <Col md={6}>
                                        <FloatingLabel controlId="floatingEmail" label="Email" className="mb-3">
                                            <Form.Control 
                                                type="email" 
                                                placeholder="Email" 
                                                name="email" 
                                                value={contact.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </FloatingLabel>
                                    </Col>
                                    <Col md={6}>
                                        <FloatingLabel controlId="floatingPhone" label="Phone" className="mb-3">
                                            <Form.Control 
                                                type="tel" 
                                                placeholder="Phone" 
                                                name="pno" 
                                                value={contact.pno}
                                                onChange={handleChange}
                                            />
                                        </FloatingLabel>
                                    </Col>
                                    
                                    <Col xs={12}>
                                        <FloatingLabel controlId="floatingMessage" label="Message">
                                            <Form.Control 
                                                as="textarea" 
                                                placeholder="Message" 
                                                style={{ height: '120px' }} 
                                                name="msg" 
                                                value={contact.msg}
                                                onChange={handleChange}
                                                required
                                            />
                                        </FloatingLabel>
                                    </Col>
                                    
                                    <Col xs={12} className="mt-3">
                                        <Button 
                                            type="submit" 
                                            className="text-white w-100 py-2"
                                            style={{ backgroundColor: "#0084b4", fontSize: '1rem' }}
                                        >
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </Col>

                    <Col lg={6} className="order-1 order-lg-2">
                        <div className="h-100">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.515309836883!2d72.85504067467735!3d21.211404981481472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f037f6559e9%3A0x3577b8a8675767b8!2sBaroda%20Prestige%2C%20Varachha%2C%20Surat%2C%20Gujarat%20395006!5e0!3m2!1sen!2sin!4v1741259444604!5m2!1sen!2sin" 
                                width="100%" 
                                height="100%" 
                                style={{ minHeight: '400px', border: '0', borderRadius: '8px' }}
                                allowFullScreen="" 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Google Maps Location"
                            ></iframe>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
};

export default ContactUs;