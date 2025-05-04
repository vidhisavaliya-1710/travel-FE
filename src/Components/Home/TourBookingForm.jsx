    import React, { useEffect, useState } from 'react'
    import Navbars from './Navbars';
    import Footer from '../Footer/Footer';
    import { Container, Row, Col, Card, Button, Accordion, Breadcrumb, Table, FloatingLabel, Form } from "react-bootstrap";
    import '../Home/Packages.css'
    import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
    import backgroundImage from "../../images/breadcrum.jpg";
    import { useFormik } from 'formik';
    import * as Yup from 'yup';
    import { Booking } from '../../ApiService';
    import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';



    const validate=Yup.object({
        firstname:Yup.string().required('First Name Must be Required...'),
        lastname:Yup.string().required('Last Name Can be Required...'),
        email:Yup.string().required('Email Can be Required...'),
        phone: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
        .required("Phone number is required."),
        location:Yup.string().required('Location Can be Required...'),
        country:Yup.string().required('Country Can be Required...'),
        date: Yup.date()
                .min(new Date(), "Departure date cannot be in the past")
                .required('Departure Time is required.'),
        price:Yup.string().required('Price Can be Required...'),
        guest:Yup.string().required('Guest Can be Required...')
    })

    function TourBookingForm() {
        const locationData = useLocation();
        const { location, price } = locationData.state || {};
        const navigate=useNavigate()
        const dispatch=useDispatch()
        // const {packageId}=useParams()

        const locationFromRedux = useSelector((state) => state.counter.location); // Get location from Redux
    console.log("Redux Location:", locationFromRedux);

    const prices=useSelector((state)=>state.counter.price);
    console.log("redux price",prices)

    const packageId=useSelector((state)=>state.counter.packageId)
    console.log("packageId",packageId)

        const {values,handleBlur,handleChange,handleSubmit,errors,touched,reset,setFieldValue,resetForm,setValues  }=useFormik({
            initialValues: {
                firstname: "",
                lastname: "",
                email: "",
                phone: "",
                location: locationFromRedux || "", // Prefill from state
                country: "",
                date: "",
                price: prices || "", // Prefill from state
                guest: "",
                packageId:packageId,
            },
                validationSchema:validate,
                onSubmit: async (values) => {
                    try {
                        const bookingData = {
                            ...values,
                            finalAmount: finalAmount
                        };
                
                        const response = await Booking(bookingData, dispatch); // API call
                
                        console.log("API Response:", response); // Debugging
                
                        // Use _id from response.data as the booking ID
                        const bookingId = response?._id; 
                
                        if (bookingId) {
                            // alert("Booking Successful!");
                
                                toast.success("Booking Successfully!!")
                                navigate('/payment', { state: { bookingId, amount: finalAmount } });
                           
                        } else {
                            // alert("Booking Failed: Unexpected response");
                            toast.error("Booking Failed: Unexpected response")
                        }
                    } catch (error) {
                        console.error("Booking Error:", error);
                        // alert("Failed to book. Try again later.");
                        toast.error("Failed to book. Try again later.")
                    }
                }
                
                
                
            })

            const guests=values.guest ? values.guest : 1;
            const totalAmount = prices * parseInt(guests); // Ensure guest is at least 1
    const discount = totalAmount * 0.10; // 10% discount
    const tax = (totalAmount - discount) * 0.05; // 5% tax after discount
    const finalAmount = totalAmount - discount + tax; // Final amount calculation




    console.log("totalAmount",totalAmount)

            
        

    return (
        <>

        <Navbars/>

        <div
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    padding: '100px 0',
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
                    <h1 className="mb-4">Booking</h1>
                    <Breadcrumb style={{ justifyContent: 'center' }} className="d-flex">
                        <Breadcrumb.Item>
                            <Link to="/" className="fs-5 text-white text-decoration-none">Home</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active className="fs-5" style={{ color: "#0084b4" }}>Booking</Breadcrumb.Item>
                    </Breadcrumb>
                </Container>
            </div>

            <div className='spacing container'>
                    
                    <Row>
                        <Col lg={8}>
                            <div className='booking_sec p-4 ps-5 pe-5'>
                            <h2 className='mb-3'>Booking Submission</h2>
                            <Form onSubmit={handleSubmit}>
                                    
                                    <Row>
                                        <Col lg={6}>
                                        <FloatingLabel controlId="floatingInput" label="First Name" className="mb-3 form_sec">
                                        <input type="text" placeholder="First Name" name='firstname' className='form_sec form-control'  onChange={handleChange} onBlur={handleBlur} value={values.firstname}/>
                                        {errors.firstname && touched.firstname ?(<div className='text-danger text-center error'>{errors.firstname}</div>):null}
                                    </FloatingLabel>
                                        </Col>
                                        <Col lg={6}>
                                        <FloatingLabel controlId="floatingInput" label="Last Name" className="mb-3 form_sec">
                                        <input type="text" placeholder="Last Name" name='lastname' className='form_sec form-control'  onChange={handleChange} onBlur={handleBlur} value={values.lastname}/>
                                        {errors.lastname && touched.lastname ?(<div className='text-danger text-center error'>{errors.lastname}</div>):null}
                                    </FloatingLabel>
                                        </Col>
                                        
                                    </Row>

                                    <Row>
                                        <Col lg={6}>
                                        <FloatingLabel controlId="floatingInput" label="Email" className="mb-3 form_sec">
                                        <input type="email" placeholder="Email" name='email' className='form_sec form-control'  onChange={handleChange} onBlur={handleBlur} value={values.email}/>
                                        {errors.email && touched.email ?(<div className='text-danger text-center error'>{errors.email}</div>):null}
                                    </FloatingLabel>
                                        </Col>
                                        <Col lg={6}>
                                        <FloatingLabel controlId="floatingInput" label="Phone No" className="mb-3 form_sec">
                                        <input type="text" placeholder="Phone No" name='phone' className='form_sec form-control'  onChange={handleChange} onBlur={handleBlur} value={values.phone}/>
                                        {errors.phone && touched.phone ?(<div className='text-danger text-center error'>{errors.phone}</div>):null}
                                    </FloatingLabel>
                                        </Col>
                                        
                                    </Row>

                                    <Row>
                                        <Col lg={6}>
                                        <FloatingLabel controlId="floatingInput" label="Location" className="mb-3 form_sec">
                                        <input type="text" placeholder="Location" name='location' className='form_sec form-control'  onChange={handleChange} onBlur={handleBlur} value={values.location} readOnly/>
                                        {errors.location && touched.location ?(<div className='text-danger text-center error'>{errors.location}</div>):null}
                                    </FloatingLabel>
                                        </Col>
                                        <Col lg={6}>
                                        <FloatingLabel controlId="floatingInput" label="Country" className="mb-3 form_sec">
                                        <input type="text" placeholder="Country" name='country' className='form_sec form-control'  onChange={handleChange} onBlur={handleBlur} value={values.country}/>
                                        {errors.country && touched.country ?(<div className='text-danger text-center error'>{errors.country}</div>):null}
                                    </FloatingLabel>
                                        </Col>
                                        
                                    </Row>

                                    <Row>
                                        <Col  lg={6}>
                                        <FloatingLabel controlId="floatingInput" label="Date" className="mb-3 form_sec">
                                        <input type="date" placeholder="Date" name='date' className='form_sec form-control'  onChange={handleChange} onBlur={handleBlur} value={values.date} min={new Date().toISOString().split("T")[0]}/>
                                        {errors.date && touched.date ?(<div className='text-danger text-center error'>{errors.date}</div>):null}
                                    </FloatingLabel>
                                        </Col>
                                        <Col lg={6}>
                                        <FloatingLabel controlId="floatingInput" label="Price" className="mb-3 form_sec">
                                        <input type="text" placeholder="Price" name='price' className='form_sec form-control'  onChange={handleChange} onBlur={handleBlur} value={values.price} readOnly/>
                                        {errors.price && touched.price ?(<div className='text-danger text-center error'>{errors.price}</div>):null}
                                    </FloatingLabel>
                                        </Col>
                                        
                                    </Row>

                                    <Row>
                                        <Col  lg={6}>
                                        <FloatingLabel controlId="floatingInput" label="No of Guests" className="mb-3 form_sec">
        <input 
            type="text" 
            placeholder="No of Guests" 
            name="guest" 
            className="form_sec form-control"
            min="1"
            onChange={(e) => {
                handleChange(e);
            }} 
            onBlur={handleBlur} 
            value={values.guest}
        />
        {errors.guest && touched.guest ? <div className="text-danger text-center error">{errors.guest}</div> : null}
    </FloatingLabel>
                                        </Col>
                                        
                                    </Row>

                                    <div className='d-flex justify-content-center'>
                                        <button type="submit" className="border-0 fs-5 mt-2 p-1 ps-3 pe-3 text-white btns rounded">Book</button>
                                        {/* <Link to='/showpackage'><button className="border-0 fs-5 mt-2 p-1 ps-3 pe-3 text-white btns rounded ms-5">Show</button></Link> */}
                                    </div>
                                    {/* <Link to='forgot'><p className='text-center mb-0 mt-3 fs-6 link_sec'>Forgot Password?</p></Link>
                                    <p className='text-center fs-5'>Don't Have an Account?<Link className='link_sec' to='/signup'>SignUp</Link></p> */}
                                </Form>

                            </div>
                        </Col>

                        <Col lg={4}>
        <div className='bill_sec p-4 ps-5 pe-5'>
            <h2>Bill</h2>
            <div className='d-flex justify-content-between'>
                <h4>Total</h4>
                <p className='fs-4'>{prices}</p>
            </div>
            <div className='d-flex justify-content-between'>
                <h4>Total Persons</h4>
                <p className='fs-4'>{guests}</p> 
            </div>
            <div className='d-flex justify-content-between'>
                <h4>Discount (10%)</h4>
                <p className='fs-4'>- {discount}</p>
            </div>
            <div className='d-flex justify-content-between'>
                <h4>Tax (5%)</h4>
                <p className='fs-4'>+ {tax}</p>
            </div><hr/>
            <div className='d-flex justify-content-between'>
                <h3>Final Amount</h3>
                <p className='fs-4'>{finalAmount}</p>  
            </div>
            <div className='d-flex justify-content-center mt-3 mb-3'>
                <Link to='/payment'><button className='border-0 fs-5 mt-2 p-1 ps-3 pe-3 text-white btns rounded'>Payment</button></Link>
            </div>
        </div>

        
    </Col>
    {/* <div className='term_sec p-4 ps-5 pe-5 mt-5'>
            <h2>Term & Conditions</h2>
            <ul>
                <li><p className='fs-5'>To confirm a booking, a minimum 40% of the total package cost must be paid at the time of booking.</p></li>
                <li><p className='fs-5'>The remaining 60% payment the travel date must be paid at the time.</p></li>
                <li> <p className='fs-5'>The 40% advance payment is non-refundable in case of last-minute cancellations.</p></li>
            </ul>
            
        </div> */}

                    </Row>
            </div>

            <Footer/>
        </>
    )
    }

    export default TourBookingForm
