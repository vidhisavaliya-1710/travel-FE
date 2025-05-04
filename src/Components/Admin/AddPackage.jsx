import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import '../../App.css';
import Admin from './Admin'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Breadcrumb, Container, Navbar,Row,Col } from "react-bootstrap";
import { addpackages } from '../../ApiService';
import toast from 'react-hot-toast';

const init={
    // img:'',
    name:'',
    destination:'',
    departuretime:'',
    returnrime:'',
    included:'',
    excluded:'',
    tourtype:'',
    price:'',
    description:'',
    vehicle:'',
    rating:'',
    img:[],
    
}

const validate = Yup.object({
    name: Yup.string().required('Package Name is required.'),
    destination: Yup.string().required('Destination is required.'),
    departuretime: Yup.date()
        .min(new Date(), "Departure date cannot be in the past")
        .required('Departure Time is required.'),
    returnrime: Yup.date()
        .min(Yup.ref('departuretime'), "Return date cannot be before departure date")
        .required('Return Time is required.'),
    included: Yup.string().required('Included is required.'),
    excluded: Yup.string().required('Excluded is required.'),
    tourtype: Yup.string().required('Tour Type is required.'),
    price: Yup.string().required('Price is required.'),
    vehicle: Yup.string().required('Vehicle is required.'),
    description: Yup.string().required('Description is required.'),
    rating: Yup.string().required('Rating is required.'),
    img: Yup.array().min(1, 'At least one image is required'),
   
});



function AddPackage() {

    const [selectedImages, setSelectedImages] = useState([]);

    const navigate=useNavigate()
    const {values,handleBlur,handleChange,handleSubmit,errors,touched,reset,setFieldValue,resetForm }=useFormik({
        initialValues:init,
        validationSchema:validate,
        onSubmit: async (values) => {
            const formData = new FormData();

            // Append all form fields
            for (const key in values) {
                if (key !== "img") {
                    formData.append(key, values[key]);
                }
            }

            // Append all selected images
            values.img.forEach(file => {
                formData.append('img', file);
            });

            try {
                await addpackages(formData);
                resetForm();
                setSelectedImages([]);
                navigate('/showpackage');
                toast.success("Successfully Added Package!");
            } catch (error) {
                toast.error("Failed to add package.");
                toast.error(error)
            }
        }
    })


    const handleFileChange = (event) => {
        const files = Array.from(event.target.files); // Convert FileList to array
        setFieldValue("img", files);
        setSelectedImages(files.map(file => URL.createObjectURL(file))); // Preview images
    };

  return (
    <>

        <div className='d-flex'>
        <Admin/>
            <div className="container">
                <div className="row signup">
                    
                    <div className="col-lg-6 package_sec p-4 ps-5 pe-5">
                        <div>
                            <h3 className='text-center mb-3'>Add Packages</h3>
                            <Form onSubmit={handleSubmit}>
                                
                                <Row>
                                    <Col>
                                    <FloatingLabel controlId="floatingInput" label="Package Name" className="mb-2 form_sec">
                                    <input type="text" placeholder="Name" name='name' className='form_sec form-control'  onChange={handleChange} onBlur={handleBlur} value={values.name}/>
                                    {errors.name && touched.name ?(<div className='text-danger text-center error'>{errors.name}</div>):null}
                                </FloatingLabel>
                                    </Col>
                                    <Col>
                                    <FloatingLabel controlId="floatingInput" label="Destination" className="mb-2 form_sec">
                                    <input type="text" placeholder="Destination" name='destination' className='form_sec form-control'  onChange={handleChange} onBlur={handleBlur} value={values.destination}/>
                                    {errors.destination && touched.destination ?(<div className='text-danger text-center error'>{errors.destination}</div>):null}
                                </FloatingLabel>
                                    </Col>
                                    
                                </Row>

                                <Row>
                                    <Col>
                                    <FloatingLabel controlId="floatingInput" label="Departure Time" className="mb-2 form_sec">
                                    <input 
        type="date" 
        placeholder="Departure Time" 
        name='departuretime' 
        className='form_sec form-control'  
        onChange={handleChange} 
        onBlur={handleBlur} 
        value={values.departuretime}
        min={new Date().toISOString().split("T")[0]} // Disable past dates
    />
                                    {errors.departuretime && touched.departuretime ?(<div className='text-danger text-center error'>{errors.departuretime}</div>):null}
                                </FloatingLabel>
                                    </Col>
                                    <Col>
                                    <FloatingLabel controlId="floatingInput" label="Returnr Time" className="mb-2 form_sec">
                                    <input 
        type="date" 
        placeholder="Return Time" 
        name='returnrime' 
        className='form_sec form-control'  
        onChange={handleChange} 
        onBlur={handleBlur} 
        value={values.returnrime}
        min={values.departuretime || new Date().toISOString().split("T")[0]} // Disable past dates & ensure return date is after departure
    />
                                    {errors.returnrime && touched.returnrime ?(<div className='text-danger text-center error'>{errors.returnrime}</div>):null}
                                </FloatingLabel>
                                    </Col>
                                    
                                </Row>

                                <Row>
                                    <Col>
                                    <FloatingLabel controlId="floatingInput" label="Included" className="mb-2 form_sec">
                                    <input type="textarea" placeholder="Included" name='included' className='form_sec form-control'  onChange={handleChange} onBlur={handleBlur} value={values.included}/>
                                    {errors.included && touched.included ?(<div className='text-danger text-center error'>{errors.included}</div>):null}
                                </FloatingLabel>
                                    </Col>
                                    <Col>
                                    <FloatingLabel controlId="floatingInput" label="Excluded" className="mb-2 form_sec">
                                    <input type="textarea" placeholder="Excluded" name='excluded' className='form_sec form-control'  onChange={handleChange} onBlur={handleBlur} value={values.excluded}/>
                                    {errors.excluded && touched.excluded ?(<div className='text-danger text-center error'>{errors.excluded}</div>):null}
                                </FloatingLabel>
                                    </Col>
                                    
                                </Row>

                                <Row>
                                    <Col>
                                    <FloatingLabel controlId="floatingInput" label="Tour Type" className="mb-2 form_sec">
                                    <input type="text" placeholder="Tour Type" name='tourtype' className='form_sec form-control'  onChange={handleChange} onBlur={handleBlur} value={values.tourtype}/>
                                    {errors.tourtype && touched.tourtype ?(<div className='text-danger text-center error'>{errors.tourtype}</div>):null}
                                </FloatingLabel>
                                    </Col>
                                    <Col>
                                    <FloatingLabel controlId="floatingInput" label="Price" className="mb-2 form_sec">
                                    <input type="text" placeholder="Price" name='price' className='form_sec form-control'  onChange={handleChange} onBlur={handleBlur} value={values.price}/>
                                    {errors.price && touched.price ?(<div className='text-danger text-center error'>{errors.price}</div>):null}
                                </FloatingLabel>
                                    </Col>
                                    
                                </Row>


                                <Row>
                                    <Col>
                                    <FloatingLabel controlId="floatingInput" label="Vehicle" className="mb-2 form_sec">
                                    <input type="text" placeholder="Vehicle" name='vehicle' className='form_sec form-control'  onChange={handleChange} onBlur={handleBlur} value={values.vehicle}/>
                                    {errors.vehicle && touched.vehicle ?(<div className='text-danger text-center error'>{errors.vehicle}</div>):null}
                                </FloatingLabel>
                                    </Col>
                                    <Col>
                                    <FloatingLabel controlId="floatingInput" label="Description" className="mb-2 form_sec">
                                    <input type="text" placeholder="Description" name='description' className='form_sec form-control'  onChange={handleChange} onBlur={handleBlur} value={values.description}/>
                                    {errors.description && touched.description ?(<div className='text-danger text-center error'>{errors.description}</div>):null}
                                </FloatingLabel>
                                    </Col>
                                    
                                </Row>

                                <Row>
                                    <Col>
                                    <FloatingLabel controlId="floatingInput" label="Rating" className="mb-2 form_sec">
                                    <input type="text" placeholder="Rating" name='rating' className='form_sec form-control'  onChange={handleChange} onBlur={handleBlur} value={values.rating}/>
                                    {errors.rating && touched.rating ?(<div className='text-danger text-center error'>{errors.rating}</div>):null}
                                </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel controlId="floatingInput" label="Images" className="mb-2 form_sec">
                                            <input
                                                type="file"
                                                name='img'
                                                className='form-control'
                                                onChange={handleFileChange}
                                                onBlur={handleBlur}
                                                multiple
                                            />
                                            {errors.img && touched.img && <div className='text-danger text-center'>{errors.img}</div>}
                                        </FloatingLabel>
                                    </Col>
                                    
                                </Row>

                                <div className='d-flex justify-content-center'>
                                    <button type="submit" className="border-0 fs-5 mt-2 p-1 ps-3 pe-3 text-white btns rounded">Add</button>
                                    <Link to='/showpackage'><button className="border-0 fs-5 mt-2 p-1 ps-3 pe-3 text-white btns rounded ms-5">Show</button></Link>
                                </div>
                                {/* <Link to='forgot'><p className='text-center mb-0 mt-3 fs-6 link_sec'>Forgot Password?</p></Link>
                                <p className='text-center fs-5'>Don't Have an Account?<Link className='link_sec' to='/signup'>SignUp</Link></p> */}
                            </Form>

           
            
                            </div>
                          
                        </div>
                    </div>
                </div>
        </div>
    </>
  )
}

export default AddPackage
