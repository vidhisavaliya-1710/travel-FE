import React, { useState } from 'react';
import { Container, Form, Button, Card, Row, Col, Breadcrumb, FloatingLabel } from "react-bootstrap";
import Navbars from './Navbars';
import Footer from '../Footer/Footer';
import backgroundImage from "../../images/breadcrum.jpg";
import { Link } from 'react-router-dom';
import { AddFeedback } from '../../ApiService';
import toast from 'react-hot-toast';

function Feedbacks() {
  const [feedback, setFeedback] = useState({
    fname: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AddFeedback(feedback);
      console.log("Feedback Submitted:", response);
      toast.success("Thank you for your feedback!");
      setFeedback({ fname: "", email: "", message: "" }); // Reset form
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <Navbars />

      {/* Breadcrumb Header */}
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
          <h1 className="mb-4">Feedback</h1>
          <Breadcrumb style={{ justifyContent: 'center' }} className="d-flex flex-wrap">
            <Breadcrumb.Item>
              <Link to="/" className="fs-5 text-white text-decoration-none">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active className="fs-5" style={{ color: "#0084b4" }}>
              Feedback
            </Breadcrumb.Item>
          </Breadcrumb>
        </Container>
      </div>

      {/* Feedback Form Section */}
      <Container className="mt-5 spacing">
        <Row className="align-items-center">
          <Col xs={12} md={6} className="text-center mb-4 mb-md-0">
            <img
              src={require('../../images/feedbacks.png')}
              alt="Feedback illustration"
              className='img-fluid w-75'
            />
          </Col>

          <Col xs={12} md={6}>
            <Card className="shadow p-3 w-100">
              <Card.Body>
                <h2 className="text-center mb-3" style={{ color: '#0084b4' }}>Send Us Your Feedback</h2>
                <p className="text-center text-muted">How was your experience?</p>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col xs={12}>
                      <FloatingLabel controlId="floatingInputName" label="Full Name" className="mb-3">
                        <Form.Control
                          type="text"
                          placeholder="Full Name"
                          name='fname'
                          value={feedback.fname}
                          onChange={handleChange}
                          required
                        />
                      </FloatingLabel>
                    </Col>

                    <Col xs={12}>
                      <FloatingLabel controlId="floatingInputEmail" label="Email" className="mb-3">
                        <Form.Control
                          type="email"
                          placeholder="Email"
                          name='email'
                          value={feedback.email}
                          onChange={handleChange}
                          required
                        />
                      </FloatingLabel>
                    </Col>

                    <Col xs={12}>
                      <FloatingLabel controlId="floatingTextarea" label="Your Feedback" className="mb-3">
                        <Form.Control
                          as="textarea"
                          placeholder="Leave your message here"
                          name='message'
                          value={feedback.message}
                          onChange={handleChange}
                          style={{ height: '100px' }}
                          required
                        />
                      </FloatingLabel>
                    </Col>
                  </Row>

                  <div className="d-flex justify-content-center">
                    <Button type="submit" className="px-4 py-2 fs-5" style={{ background: '#0084b4' }}>
                      Send
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}

export default Feedbacks;
