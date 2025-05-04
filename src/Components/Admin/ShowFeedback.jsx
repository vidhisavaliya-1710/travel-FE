import React, { useEffect, useState } from 'react'
import { Col, FloatingLabel, Row, Table,Form } from 'react-bootstrap';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import {  Link } from 'react-router-dom';
import Admin from './Admin';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { DeleteFeedbacks, showContact, showfeedback } from '../../ApiService';
import toast from 'react-hot-toast';

function ShowFeedback() {

  const [feedback, setfeedback] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await showfeedback();
        setfeedback(data);
        console.log("Contact", data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    }
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await DeleteFeedbacks(id); // Call delete API
      setfeedback((prev) => prev.filter((item) => item._id !== id)); // Remove from state
      // alert("User deleted successfully!");
      toast.success("Feedback Delete Successfully")
    } catch (error) {
      console.error("Error deleting package:", error);
      // alert("Failed to delete package.");
      toast.error("Failed to delete Feedback")
    }
  }
  

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredUsers = feedback.filter((feedback) =>
    feedback.name?.toLowerCase().includes(searchQuery) ||
  feedback.email?.toLowerCase().includes(searchQuery) 
  );

  return (
    <>
      <div className='d-flex'>
        <Admin />
        <Link to='/admin'><FaArrowLeftLong className='fs-2 ms-5 arrow_icon' /></Link>
        <div className='display_package'>

          {/* Left Arrow Positioned to the Left */}

          <h3 className='text-center fs-1'>Feedback</h3>

          <Form>
            <Row className='d-flex justify-content-center'>
              <Col lg={12}>
                <FloatingLabel controlId="floatingInput" label="Search by Name, Email ..." className="mb-3 form_sec fs-6">
                  <input type="text" placeholder="Search..." className='form-control fs-5  h-auto' onChange={handleSearch} />
                </FloatingLabel>
              </Col>
            </Row>
          </Form>

          {/* Table with Proper Centering */}
          {/* Added a responsive wrapper */}
          <div className="d-flex justify-content-center w-100 ">
            <div className="table-responsive w-100">
              <Table striped bordered hover className="text-center w-100">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers?.map((item, index) => (
                    <tr key={index}>
                      <td>{item.fname}</td>
                      <td>{item.email}</td>
                      <td>{item.msg}</td>
                      <td>
                        <Link to={`/UpdateFeedback/${item._id}`}>
                          <FaRegEdit className="fs-4 ms-2" style={{ color: "#0084B4" }} />
                        </Link>
                        <Link>
                          <MdDelete className="text-danger fs-4 ms-3" onClick={() => handleDelete(item._id)} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default ShowFeedback
