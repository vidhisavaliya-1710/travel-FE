import React, { useEffect, useState } from 'react'
import Admin from './Admin'
import './Admin.css';
import Table from 'react-bootstrap/Table';
import { deletePackage, getpackage } from '../../ApiService';
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import toast from 'react-hot-toast';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';

function ShowPackages() {
   const [packages, setPackages] = useState([]);
     const [searchQuery, setSearchQuery] = useState('');
  
    useEffect(() => {
      async function fetchPackages() {
        try {
          const data = await getpackage();
          setPackages(data); // Store fetched data in state
          console.log("packages",data)
        } catch (error) {
          console.error("Error fetching packages:", error);
        }
      }
      fetchPackages();
    },[]);

    const handleDelete = async (id) => {
      
        try {
          await deletePackage(id); // Call delete API
          setPackages((prev) => prev.filter((item) => item._id !== id)); // Remove from state
          // alert("Package deleted successfully!");
          toast.success("Package deleted successfully!")
        } catch (error) {
          console.error("Error deleting package:", error);
          // alert("Failed to delete package.");
          toast.error("Error deleting package:", error)
        }
      
    };


    const handleSearch = (e) => {
      setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredUsers = packages.filter((packages) =>
    packages.name?.toLowerCase().includes(searchQuery) ||
  packages.Destination?.toLowerCase().includes(searchQuery)
  );

  return (
    <>
        <div className='d-flex'>
        <Admin/>
          <Link to='/addpackage'><FaArrowLeftLong className='fs-2 ms-5 arrow_icon'/></Link>
        <div className='display_package ms-3 me-3'>
        {/* <Link to='/addpackage'><FaArrowLeftLong className='fs-2 ms-5'/></Link> */}
          <h3 className='text-center'>All Packages</h3>

          <Form>
                        <Row className='d-flex justify-content-center'>
                            <Col lg={6}>
                                <FloatingLabel controlId="floatingInput" label="Search by Name, location..." className="mb-3 form_sec fs-6">
                                    <input type="text" placeholder="Search..." className='form-control fs-5  h-auto' onChange={handleSearch} />
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </Form>

          <Table striped bordered hover>
      <thead>
        <tr>
          <th>Package Name</th>
          <th>Destination</th>
          <th>Departure Time</th>
          <th>Return Time</th>
          <th>Included</th>
          <th>Excluded</th>
          <th>Duration</th>
          <th>Price</th>
          <th>Vehicle</th>
          <th>Rating</th>
          <th>Image</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          filteredUsers?.map((item)=>{
            return(
              <>
                <tr>
                  <td>{item.name}</td>
                  <td>{item.destination}</td>
                  <td>{item.departuretime}</td>
                  <td>{item.returnrime}</td>
                  <td>{item.included}</td>
                  <td>{item.excluded}</td>
                  <td>{item.tourtype}</td>
                  <td>{item.price}</td>
                  <td>{item.vehicle}</td>
                  <td>{item.rating}</td>
                  <td><img src={item.img[0]} width='150px' height='100px'/></td>
                  <td>
                    <tr>
                    <td><Link to={`/updatepackage/${item._id}`}><FaRegEdit className='fs-4 ms-2' style={{color:"#0084B4"}}/></Link></td>
                      <td><MdDelete className='text-danger fs-4 ms-3' style={{ cursor: "pointer" }}
                      onClick={() => handleDelete(item._id)}/></td>
                      
                    </tr>
                  </td>
                </tr>
              </>
            )
          })
        }
      </tbody>
    </Table>
        </div>
        </div>
    </>
  )
}

export default ShowPackages
