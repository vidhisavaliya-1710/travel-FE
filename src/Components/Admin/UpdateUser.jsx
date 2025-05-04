import React, { useEffect, useState } from "react";
import Admin from "./Admin";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Col, FloatingLabel, Row, Form } from "react-bootstrap";
import { ShowUsers, Updateuser } from "../../ApiService";
import { FaArrowLeftLong } from "react-icons/fa6";
import toast from "react-hot-toast";

function UpdateUser() {
  const { id } = useParams(); // Get user ID from URL params
  const navigate=useNavigate()
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    country: "",
  });

  useEffect(() => {
    async function fetchUserData() {
      try {
        const data = await ShowUsers();
        const currentUser = data.find((u) => u._id === id); // Find user by ID
        console.log("currentUser",currentUser)
        if (currentUser) {
          setUser(currentUser);
          console.log("setUser",user)
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchUserData();
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Updateuser(id, user); // Pass updated data
      console.log("User Updated:", response);
      // alert("User updated successfully!");
      toast.success("User updated successfully!")
      navigate('/showuser')
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user:", error)
    }
  };

  return (
    <>
      <div className="d-flex">
        <Admin />
          <Link to='/showuser'><FaArrowLeftLong className='fs-2 ms-5 arrow_icon'/></Link>
        <div className="container">
          <div className="row signup">
            <div className="col-lg-6 package_sec p-4 ps-5 pe-5">
              <h3 className="text-center mb-3">Update User</h3>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col>
                    <FloatingLabel controlId="floatingInput" label="Name" className="mb-2 form_sec">
                      <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        className="form_sec form-control"
                        onChange={handleChange}
                        value={user.name}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col>
                    <FloatingLabel controlId="floatingInput" label="Email" className="mb-2 form_sec">
                      <input
                        type="text"
                        placeholder="Email"
                        name="email"
                        className="form_sec form-control"
                        onChange={handleChange}
                        value={user.email}
                      />
                    </FloatingLabel>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FloatingLabel controlId="floatingInput" label="Phone No" className="mb-2 form_sec">
                      <input
                        type="text"
                        placeholder="Phone No"
                        name="phone"
                        className="form_sec form-control"
                        onChange={handleChange}
                        value={user.phone}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col>
                    <FloatingLabel controlId="floatingInput" label="City" className="mb-2 form_sec">
                      <input
                        type="text"
                        placeholder="City"
                        name="city"
                        className="form_sec form-control"
                        onChange={handleChange}
                        value={user.city}
                      />
                    </FloatingLabel>
                  </Col>
                </Row>

                <Row>
                  <Col lg={6}>
                    <FloatingLabel controlId="floatingInput" label="Country" className="mb-2 form_sec">
                      <input
                        type="text"
                        placeholder="Country"
                        name="country"
                        className="form_sec form-control"
                        onChange={handleChange}
                        value={user.country}
                      />
                    </FloatingLabel>
                  </Col>
                </Row>

                <div className="d-flex justify-content-center">
                  <button type="submit" className="border-0 fs-5 mt-2 p-1 ps-3 pe-3 text-white btns rounded">
                    Update
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateUser;
