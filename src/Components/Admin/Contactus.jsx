import React, { useEffect, useState } from 'react'
import { Col, FloatingLabel, Form, Row, Table } from 'react-bootstrap';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Admin from './Admin';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { DeleteContact, showContact } from '../../ApiService';
import toast from 'react-hot-toast';

function Contactus() {

  const [contact, setContact] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await showContact();
        setContact(data);
        console.log("Contact", data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    }
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await DeleteContact(id); // Call delete API
      setContact((prev) => prev.filter((item) => item._id !== id)); // Remove from state
      // alert("User deleted successfully!");
      toast.success("Contact Delete Successfully")
    } catch (error) {
      console.error("Error deleting package:", error);
      // alert("Failed to delete package.");
      toast.error("Failed to delete Contact")
    }
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredUsers = contact.filter((contact) =>
    contact.name?.toLowerCase().includes(searchQuery) ||
    contact.email?.toLowerCase().includes(searchQuery) ||
    contact.city?.toLowerCase().includes(searchQuery)
  );

  return (
    <>
      <div className='d-flex'>
        <Admin />
        <Link to='/admin'><FaArrowLeftLong className='fs-2 ms-5 arrow_icon' /></Link>
        <div className='display_package ms-3 me-3'>

          {/* Left Arrow Positioned to the Left */}
          {/* <Link to='/admin'><FaArrowLeftLong className='fs-2 ms-5'/></Link> */}
          <h3 className='text-center'>Contact Us</h3>


          <Form>
            <Row className='d-flex justify-content-center'>
              <Col lg={6}>
                <FloatingLabel controlId="floatingInput" label="Search by Name, Email,City ..." className="mb-3 form_sec fs-6">
                  <input type="text" placeholder="Search..." className='form-control fs-5  h-auto' onChange={handleSearch} />
                </FloatingLabel>
              </Col>
            </Row>
          </Form>
          {/* Table with Proper Centering */}
          {/* Added a responsive wrapper */}
          <div className="d-flex justify-content-center w-100">
            <div className="table-responsive w-100">
              <Table striped bordered hover className="text-center">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone no</th>
                    <th>Message</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers?.map((item, index) => (
                    <tr key={index}>
                      <td>{item.fname}</td>
                      <td>{item.subject}</td>
                      <td>{item.email}</td>
                      <td>{item.pno}</td>
                      <td>{item.msg}</td>
                      <td>
                        <Link to={`/UpdateContact/${item._id}`}>
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

export default Contactus
