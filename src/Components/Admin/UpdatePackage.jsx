import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import '../../App.css';
import Admin from './Admin'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { Breadcrumb, Container, Navbar, Row, Col } from "react-bootstrap";
import { addpackages, UpdatePachage } from '../../ApiService';
import axios from 'axios';
import { FaArrowLeftLong } from 'react-icons/fa6';
import toast from 'react-hot-toast';

const init = {
    // img:'',
    name: '',
    destination: '',
    departuretime: '',
    returnrime: '',
    included: '',
    excluded: '',
    tourtype: '',
    price: '',
    vehicle: '',
    rating: '',
    rating: '',
    img: null,
}

const validate = Yup.object({
    name: Yup.string().required('Package Name Must be Required...'),
    destination: Yup.string().required('Destination Can be Required...'),
    departuretime: Yup.string().required('Departure Time Can be Required...'),
    returnrime: Yup.string().required('Return Time Can be Required...'),
    included: Yup.string().required('Inclueded Can be Required...'),
    excluded: Yup.string().required('Excluded Can be Required...'),
    tourtype: Yup.string().required('Tour Type Can be Required...'),
    price: Yup.string().required('Price Can be Required...'),
    vehicle: Yup.string().required('vehicle Can be required...'),
    description: Yup.string().required('Description Can be Required...'),
    rating: Yup.string().required('Rating Can be Required...'),
})

function UpdatePackage() {

    const navigate = useNavigate()
    const { id } = useParams()

    // const [value,setValues]=useState([])
    const [previewImage, setPreviewImage] = useState("");

    console.log("previewImage", previewImage)

    const { values, handleBlur, handleChange, handleSubmit, errors, touched, reset, setFieldValue, resetForm, setValues } = useFormik({
        initialValues: init,
        validationSchema: validate,
        onSubmit: async (values) => {
            const formData = new FormData();
            for (const key in values) {
                if (key === "img") {
                    if (values.img instanceof File) {
                        formData.append("img", values.img);
                    }
                } else {
                    formData.append(key, values[key]);
                }
            }

            try {
                await UpdatePachage(id, formData);
                // resetForm(); 
                // alert("Package added successfully!");
                toast.success("Package added successfully!")
                navigate('/showpackage');
            } catch (error) {
                // alert("Failed to add package.");
                toast.error("Failed to add package.")
            }
        }
    })


    useEffect(() => {
        const fetchPackage = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/getSinglepackage/${id}`);
                // const packageData = data.data;
                const packageData = data.data;
                console.log("packageData---------", packageData)
                setValues({
                    ...packageData
                });

                setPreviewImage(packageData.img);
                console.log("dataa", data.data) // Prefill form with existing data
            } catch (error) {
                console.error("Error fetching package:", error);
            }
        };
        if (id) fetchPackage();
    }, [id, setValues]);

    return (
        <>
            <div className='d-flex'>
                <Admin />
                  <Link to='/addpackage'><FaArrowLeftLong className='fs-2 ms-5 arrow_icon'/></Link>
                <div className="container">
                    <div className="row signup">

                        <div className="col-lg-6 package_sec p-4 ps-5 pe-5">
                            <div>
                                <h3 className='text-center mb-3'>Add Packages</h3>
                                <Form onSubmit={handleSubmit}>

                                    <Row>
                                        <Col>
                                            <FloatingLabel controlId="floatingInput" label="Package Name" className="mb-2 form_sec">
                                                <input type="text" placeholder="Name" name='name' className='form_sec form-control' onChange={handleChange} onBlur={handleBlur} value={values.name} />
                                                {errors.name && touched.name ? (<div className='text-danger text-center error'>{errors.name}</div>) : null}
                                            </FloatingLabel>
                                        </Col>
                                        <Col>
                                            <FloatingLabel controlId="floatingInput" label="Destination" className="mb-2 form_sec">
                                                <input type="text" placeholder="Destination" name='destination' className='form_sec form-control' onChange={handleChange} onBlur={handleBlur} value={values.destination} />
                                                {errors.destination && touched.destination ? (<div className='text-danger text-center error'>{errors.destination}</div>) : null}
                                            </FloatingLabel>
                                        </Col>

                                    </Row>

                                    <Row>
                                        <Col>
                                            <FloatingLabel controlId="floatingInput" label="Departure Time" className="mb-2 form_sec">
                                                <input type="date" placeholder="Departure Time" name='departuretime' className='form_sec form-control' onChange={handleChange} onBlur={handleBlur} value={values.departuretime} />
                                                {errors.departuretime && touched.departuretime ? (<div className='text-danger text-center error'>{errors.departuretime}</div>) : null}
                                            </FloatingLabel>
                                        </Col>
                                        <Col>
                                            <FloatingLabel controlId="floatingInput" label="Returnr Time" className="mb-2 form_sec">
                                                <input type="date" placeholder="Returnr Time" name='returnrime' className='form_sec form-control' onChange={handleChange} onBlur={handleBlur} value={values.returnrime} />
                                                {errors.returnrime && touched.returnrime ? (<div className='text-danger text-center error'>{errors.returnrime}</div>) : null}
                                            </FloatingLabel>
                                        </Col>

                                    </Row>

                                    <Row>
                                        <Col>
                                            <FloatingLabel controlId="floatingInput" label="Included" className="mb-2 form_sec">
                                                <input type="textarea" placeholder="Included" name='included' className='form_sec form-control' onChange={handleChange} onBlur={handleBlur} value={values.included} />
                                                {errors.included && touched.included ? (<div className='text-danger text-center error'>{errors.included}</div>) : null}
                                            </FloatingLabel>
                                        </Col>
                                        <Col>
                                            <FloatingLabel controlId="floatingInput" label="Excluded" className="mb-2 form_sec">
                                                <input type="textarea" placeholder="Excluded" name='excluded' className='form_sec form-control' onChange={handleChange} onBlur={handleBlur} value={values.excluded} />
                                                {errors.excluded && touched.excluded ? (<div className='text-danger text-center error'>{errors.excluded}</div>) : null}
                                            </FloatingLabel>
                                        </Col>

                                    </Row>

                                    <Row>
                                        <Col>
                                            <FloatingLabel controlId="floatingInput" label="Tour Type" className="mb-2 form_sec">
                                                <input type="text" placeholder="Tour Type" name='tourtype' className='form_sec form-control' onChange={handleChange} onBlur={handleBlur} value={values.tourtype} />
                                                {errors.tourtype && touched.tourtype ? (<div className='text-danger text-center error'>{errors.tourtype}</div>) : null}
                                            </FloatingLabel>
                                        </Col>
                                        <Col>
                                            <FloatingLabel controlId="floatingInput" label="Price" className="mb-2 form_sec">
                                                <input type="text" placeholder="Price" name='price' className='form_sec form-control' onChange={handleChange} onBlur={handleBlur} value={values.price} />
                                                {errors.price && touched.price ? (<div className='text-danger text-center error'>{errors.price}</div>) : null}
                                            </FloatingLabel>
                                        </Col>

                                    </Row>


                                    <Row>
                                        <Col>
                                            <FloatingLabel controlId="floatingInput" label="Vehicle" className="mb-2 form_sec">
                                                <input type="text" placeholder="Vehicle" name='vehicle' className='form_sec form-control' onChange={handleChange} onBlur={handleBlur} value={values.vehicle} />
                                                {errors.vehicle && touched.vehicle ? (<div className='text-danger text-center error'>{errors.vehicle}</div>) : null}
                                            </FloatingLabel>
                                        </Col>
                                        <Col>
                                            <FloatingLabel controlId="floatingInput" label="Description" className="mb-2 form_sec">
                                                <input type="text" placeholder="Description" name='description' className='form_sec form-control' onChange={handleChange} onBlur={handleBlur} value={values.description} />
                                                {errors.description && touched.description ? (<div className='text-danger text-center error'>{errors.description}</div>) : null}
                                            </FloatingLabel>
                                        </Col>

                                    </Row>

                                    <Row>
                                        <Col>
                                            <FloatingLabel controlId="floatingInput" label="Rating" className="mb-2 form_sec">
                                                <input type="text" placeholder="Rating" name='rating' className='form_sec form-control' onChange={handleChange} onBlur={handleBlur} value={values.rating} />
                                                {errors.rating && touched.rating ? (<div className='text-danger text-center error'>{errors.rating}</div>) : null}
                                            </FloatingLabel>
                                        </Col>
                                        <Col>
                                            <FloatingLabel controlId="floatingInput" label="Images" className="mb-2 form_sec">
                                                <input
                                                    type="file"
                                                    name="img"
                                                    className="form-control"
                                                    onChange={(event) => {
                                                        const file = event.currentTarget.files[0];
                                                        setFieldValue("img", file);
                                                        setPreviewImage(URL.createObjectURL(file)); // Show preview
                                                    }}
                                                    onBlur={handleBlur}
                                                />
                                                {errors.img && touched.img ? (<div className='text-danger text-center error'>{errors.img}</div>) : null}
                                            </FloatingLabel>

                                            {previewImage && <img src={previewImage} alt="Preview" style={{ width: "100px", height: "100px", marginTop: "10px" }} />}

                                        </Col>

                                    </Row>

                                    <div className='d-flex justify-content-center'>
                                        <button type="submit" className="border-0 fs-5 mt-2 p-1 ps-3 pe-3 text-white btns rounded">Update</button>
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

export default UpdatePackage
