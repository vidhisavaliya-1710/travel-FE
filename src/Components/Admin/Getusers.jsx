import React, { useEffect, useState } from 'react'
import Admin from './Admin'
import {  Link } from 'react-router-dom'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { Table,Form, Row, Col, FloatingLabel } from 'react-bootstrap'
import { FaRegEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { DeleteUser, ShowUsers } from '../../ApiService'
import toast from 'react-hot-toast'

function Getusers() {
    const [users, setUsers] = useState([]);
     const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function fetchUsers() {
            try {
                const data = await ShowUsers();
                setUsers(data);
                console.log("packages", data);
            } catch (error) {
                console.error("Error fetching packages:", error);
            }
        }
        fetchUsers();
    }, []);


    const handleDelete=async(id)=>{
        try {
                  await DeleteUser(id); // Call delete API
                  setUsers((prev) => prev.filter((item) => item._id !== id)); // Remove from state
                //   alert("User deleted successfully!");
                toast.success("User deleted successfully!")
                } catch (error) {
                  console.error("Error deleting package:", error);
                  alert("Failed to delete package.");
                  toast.error("Failed to delete package.")
                }
    }

    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const filteredUsers = users.filter((user) =>
        user.name?.toLowerCase().includes(searchQuery) ||
        user.email?.toLowerCase().includes(searchQuery) ||
        user.city?.toLowerCase().includes(searchQuery)
    );

    return (
        <>
            <div className='d-flex'>
                <Admin />

                {/* Centering Container */}
                <div className='display_package d-flex flex-column align-items-center w-100'>
                    
                    {/* Left Arrow Positioned to the Left */}
                    <div className="w-100">
                        <Link to='/admin' className="ms-3 d-inline-block">
                            <FaArrowLeftLong className='fs-2' />
                        </Link>
                    </div>

                    <h3 className='text-center'>Users</h3>

                    <Form>
                                            <Row className='d-flex justify-content-center'>
                                                <Col lg={12}>
                                                    <FloatingLabel controlId="floatingInput" label="Search by Name, Email,City ..." className="mb-3 form_sec fs-6">
                                                        <input type="text" placeholder="Search..." className='form-control fs-5  h-auto' onChange={handleSearch} />
                                                    </FloatingLabel>
                                                </Col>
                                            </Row>
                                        </Form>

                    {/* Table with Proper Centering */}
                    <div className="table-responsive w-75"> {/* Added a responsive wrapper */}
                        <Table striped bordered hover className='text-center'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone no</th>
                                    <th>City</th>
                                    <th>Country</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.city}</td>
                                        <td>{item.country}</td>
                                        <td>
                                            <Link to={`/updateUser/${item._id}`}>
                                                <FaRegEdit className='fs-4 ms-2' style={{ color: "#0084B4" }} />
                                            </Link>
                                            <Link>
                                                <MdDelete className='text-danger fs-4 ms-3' onClick={()=>handleDelete(item._id)} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Getusers;
