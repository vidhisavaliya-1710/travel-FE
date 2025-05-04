import React, { useState } from 'react';
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Card,
    Alert,
    InputGroup,
    Breadcrumb,
    FloatingLabel
} from 'react-bootstrap';
import backgroundImage from "../../images/breadcrum.jpg";
import Navbars from './Navbars';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { useSelector } from 'react-redux';
import { Payment } from '../../ApiService';
import toast from 'react-hot-toast';

const PaymentPage = () => {
    const [payment, setpayment] = useState({
        email: '',
        cardNo: '',
        exdate: '',
        cvv: '',
        payment_method: '',
        currency: '',
        amount: '',
        transaction_id: '',
        payment_id: '',
    });
    const [paymentMethod, setPaymentMethod] = useState('credit');
    const [paymentComplete, setPaymentComplete] = useState(false);
    const location = useLocation();
    const { bookingId, amount } = location.state || {};
    console.log("bookingId---", bookingId)

    const finalAmount = useSelector((state) => state.counter.finalAmount)
    const Total = finalAmount * 0.40;
    const lastAmount = finalAmount * 0.60;
    console.log("total-------", Total)
    console.log("finalAmount---", finalAmount)

    const handlechange = (e) => {
        setpayment({ ...payment, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (event) => {

        event.preventDefault();

        // Generate a random transaction ID
        const generateTransactionId = () => {
            return "TXN_" + Date.now() + Math.floor(Math.random() * 1000);
        };

        // Generate a random payment ID if it’s empty
        const generatePaymentId = () => {
            return "PAY_" + Date.now() + Math.floor(Math.random() * 1000);
        };

        const updatedPayment = {
            ...payment,
            booking_id: bookingId,
            // amount,
            // paymentStatus: "Completed", // or "Pending" based on actual implementation
            // paymentMethod: "Online",
            amount: Total, // 40% of finalAmount
            payment_method: paymentMethod,
            transaction_id: generateTransactionId(),
            payment_id: payment.payment_id || generatePaymentId(),  // Ensure it's always set
        };

        setpayment(updatedPayment);

        try {
            const response = await Payment(updatedPayment); // Pass updated data
            console.log("Payment Successful:", response);
            // alert("Payment successfully!");
            toast.success("Payment SuccessFully!")
            setPaymentComplete(true);
        } catch (error) {
            console.error("Error processing payment:", error);
            toast.error("Something Worng!")
        }
    };

    return (

        <>

            <Navbars />

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
                            Payment
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Container>
            </div>
            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <Card className='payment_sec p-3'>
                            <h2>Payment</h2>
                            <Card.Body>
                                <Form onSubmit={handleSubmit}>

                                    <Row className=" pt-2">
                                        <Col><h4>Total</h4></Col>
                                        <Col className="text-end"><h4>{finalAmount}</h4></Col>
                                    </Row>
                                    <Row className="pt-2">
                                        <Col><h4>- 60%</h4></Col>
                                        <Col className="text-end"><h4>{lastAmount}</h4></Col>
                                    </Row>
                                    <Row className="border-top pt-2">
                                        <Col><h4>Total Pay (40%)</h4></Col>
                                        <Col className="text-end"><h4>{Total}</h4></Col>
                                    </Row>

                                    {/* Payment Method Selection */}
                                    <Row>
                                        <Col lg={6} className='mt-3'>
                                            <FloatingLabel controlId="floatingInput" label="Email" className="mb-3 form_sec">
                                                <input type="email" placeholder="Email" name='email' className='form_sec form-control' value={payment.email} onChange={handlechange} />
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                    <h4 className="mt-4">Payment Method</h4>
                                    <Form.Group className="mb-3 ">
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="Credit Card"
                                            name="paymentMethod"
                                            id="credit"
                                            checked={paymentMethod === 'credit'}
                                            onChange={() => setPaymentMethod('credit')}
                                            value={payment.payment_method}
                                        />
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="UPI"
                                            name="paymentMethod"
                                            id="UPI"
                                            checked={paymentMethod === 'UPI'}
                                            onChange={() => setPaymentMethod('UPI')}
                                            value={payment.payment_method}
                                        />
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="Paypal"
                                            name="paymentMethod"
                                            id="UPI"
                                            checked={paymentMethod === 'Paypal'}
                                            onChange={() => setPaymentMethod('Paypal')}
                                            value={payment.payment_method}
                                        />
                                    </Form.Group>

                                    {/* Credit Card Details */}
                                    {paymentMethod === 'credit' && (
                                        <>
                                            {/* <Form.Group className="mb-3" controlId="cardName">
                                                <Form.Label>Name on Card</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Name as appears on card"
                                                    required
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide the name on your card.
                                                </Form.Control.Feedback>
                                            </Form.Group> */}

                                            <Col lg={6}>
                                                <FloatingLabel controlId="floatingInput" label="Card Number" className="mb-3 form_sec">
                                                    <input type="text " placeholder="Card Number" name='cardNo' className='form_sec form-control' value={payment.cardNo} onChange={handlechange} />
                                                </FloatingLabel>
                                            </Col>
                                            <Row>
                                                <Col lg={6}>
                                                    <FloatingLabel controlId="floatingInput" label="Expiration Date" className="mb-3 form_sec">
                                                        <input type="date" placeholder="Expiration Date" name='exdate' className='form_sec form-control' value={payment.exdate} onChange={handlechange} />
                                                    </FloatingLabel>
                                                </Col>

                                                <Col lg={6}>
                                                    <FloatingLabel controlId="floatingInput" label="CVV" className="mb-3 form_sec">
                                                        <input type="text " placeholder="CVV" name='cvv' className='form_sec form-control' value={payment.cvv} onChange={handlechange} />
                                                    </FloatingLabel>
                                                </Col>

                                            </Row>
                                            {/* <Form.Group className="mb-3" controlId="cardNumber">
                                                <Form.Label>Card Number</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="1234 5678 9012 3456"
                                                    required
                                                    maxLength="19"
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide a valid card number.
                                                </Form.Control.Feedback>
                                            </Form.Group> */}
                                            {/* <Row className="mb-3">
                                                <Col md={6}>
                                                    <Form.Group controlId="expiryDate">
                                                        <Form.Label>Expiration Date</Form.Label>
                                                        <InputGroup hasValidation>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="MM/YY"
                                                                required
                                                                maxLength="5"
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide expiration date.
                                                            </Form.Control.Feedback>
                                                        </InputGroup>
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group controlId="cvv">
                                                        <Form.Label>CVV</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="123"
                                                            required
                                                            maxLength="4"
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide your CVV.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                            </Row> */}
                                        </>
                                    )}

                                    {/* PayPal Info */}
                                    {paymentMethod === 'UPI' && (
                                        <Col lg={6}>
                                            <FloatingLabel controlId="floatingInput" label="UPI ID" className="mb-3 form_sec">
                                                <input type="text " placeholder="UPI ID" name='payment_id' className='form_sec form-control' value={payment.payment_id} onChange={handlechange} />
                                            </FloatingLabel>
                                        </Col>
                                    )}

                                    {paymentMethod === 'Paypal' && (
                                        <Col lg={6}>
                                            <FloatingLabel controlId="floatingInput" label="Paypal ID" className="mb-3 form_sec">
                                                <input type="text " placeholder="Paypal ID" name='payment_id' className='form_sec form-control' value={payment.payment_id} onChange={handlechange} />
                                            </FloatingLabel>
                                        </Col>
                                    )}

                                    {/* Billing Address */}
                                    {/* <h5 className="mt-4">Billing Address</h5>
                <Form.Group className="mb-3" controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="1234 Main St" 
                    required 
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide your address.
                  </Form.Control.Feedback>
                </Form.Group>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="city">
                      <Form.Label>City</Form.Label>
                      <Form.Control type="text" required />
                      <Form.Control.Feedback type="invalid">
                        Please provide your city.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group controlId="state">
                      <Form.Label>State</Form.Label>
                      <Form.Control type="text" required />
                      <Form.Control.Feedback type="invalid">
                        Please provide your state.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group controlId="zip">
                      <Form.Label>Zip</Form.Label>
                      <Form.Control type="text" required />
                      <Form.Control.Feedback type="invalid">
                        Please provide your zip code.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row> */}

                                    {/* Terms and Conditions */}

                                    <h5 style={{color:'#0084B4'}} className='mt-3'>Term & Conditions</h5>
                                    
                                        <p className='fs-6'>To confirm a booking, a minimum 40% of the total package cost must be paid at the time of booking.The remaining 60% payment the travel date must be paid at the time.The 40% advance payment is non-refundable in case of last-minute cancellations.</p>
                                        
                                    
                                    <Form.Group className="mb-3">
                                        <Form.Check
                                            required
                                            label="I agree to the terms and conditions"
                                            feedback="You must agree before submitting."
                                            feedbackType="invalid"
                                            id="termsCheck"
                                        />
                                    </Form.Group>

                                    {/* Submit Button */}
                                    <div className="d-flex justify-content-center gap-2">
                                        <Button variant="" size='' type="submit" style={{padding: '10px 15px',borderRadius: '5px',backgroundColor: "#0084b4",border: "none",color: "#fff"}} className='fs-5'>
                                            Pay ${Total}
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
};

export default PaymentPage;