import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Breadcrumb, FloatingLabel } from "react-bootstrap";
import toast from 'react-hot-toast';
import { showContact, UpdateContacts } from '../../ApiService';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6';
import Admin from './Admin';

function UpdateContact() {

    const { id } = useParams(); // Get ID from URL
          const navigate = useNavigate(); 

     const [contact,setcontact]=useState({
            fname:'',
            subject:'',
            email:'',
            pno:'',
            msg:''
        })
    
        const handleChange=(e)=>{
            setcontact({...contact,[e.target.name]:e.target.value})
        }

         useEffect(() => {
                async function fetchBookingData() {
                  try {
                    const response = await showContact();
                    const currentUser = response.find((u) => u._id === id);
                    if (currentUser) {
                      // Convert date to YYYY-MM-DD format
                      const formattedDate = currentUser.date ? new Date(currentUser.date).toISOString().split("T")[0] : "";
                      setcontact({ ...currentUser, date: formattedDate });
                    } else {
                      console.error("No booking data found.");
                    }
                  } catch (error) {
                    console.error("Error fetching booking:", error);
                  }
                }
                fetchBookingData();
              }, [id]);

        const handlesubmit=async(e)=>{
            e.preventDefault();
            try{
                const response=await UpdateContacts(id,contact);
                console.log('Contact us added successfully:', response);
                // alert('Student added successfully!');
                navigate('/showContactUs')
                toast.success("Contact added successfully!")
            }catch(error){
                console.error('Error adding student:', error);
                // alert('Failed to add student');
                toast.error('Failed to add student')
            }
        }
  return (
    <>
    <div className="d-flex"> 
    
        <Admin />
          <Link to='/showuser'><FaArrowLeftLong className='fs-2 ms-5 arrow_icon'/></Link>
   
    <div className="container">
        <div className="row signup">
                <div className="col-lg-6  package_sec p-4 ps-5 pe-5">
                    <h3 className="text-center mb-3">Contact Update</h3>
                    <Form onSubmit={handlesubmit}>
                    <Row>
                                   <Col lg={6}>
                                   <FloatingLabel controlId="floatingInput" label="Full Name" className="mb-3 form_sec">
                                   <input type="text" placeholder="Full Name" name='fname' className='form_sec form-control' onChange={handleChange} value={contact.fname} />
                                   
                               </FloatingLabel>
                                   </Col>
                                   <Col lg={6}>
                                   <FloatingLabel controlId="floatingInput" label="Subject" className="mb-3 form_sec">
                                   <input type="text" placeholder="Subject" name='subject' className='form_sec form-control' onChange={handleChange} value={contact.lname}/>
                                   
                               </FloatingLabel>
                                   </Col>
                                   
                               </Row>

                               <Row>
                                   <Col lg={6}>
                                   <FloatingLabel controlId="floatingInput" label="Email" className="mb-3 form_sec">
                                   <input type="email" placeholder="Email" name='email' className='form_sec form-control'  onChange={handleChange} value={contact.email}/>
                                   
                               </FloatingLabel>
                                   </Col>
                                   <Col lg={6}>
                                   <FloatingLabel controlId="floatingInput" label="Phone" className="mb-3 form_sec">
                                   <input type="text" placeholder="Phone" name='pno' className='form_sec form-control'  onChange={handleChange} value={contact.pno}/>
                                   
                               </FloatingLabel>
                                   </Col>
                                   
                               </Row>
                               <Col lg={12}>
                                   <FloatingLabel controlId="floatingInput" label="Message" className="mb-3 form_sec">
                                   
                                   <textarea name="msg" id="" placeholder="Message" className='form_sec form-control'  onChange={handleChange} value={contact.msg}></textarea>
                                   
                               </FloatingLabel>
                                   </Col>
                           <div className="d-flex justify-content-center">
                           <Button type="submit" className="text-white fs-5 mt-3" style={{ backgroundColor: "#0084b4" }}>
                               Submit
                           </Button>
                           </div>
                    </Form>
                </div>
        </div>
    </div>

    </div>
        
    </>
  )
}

export default UpdateContact
