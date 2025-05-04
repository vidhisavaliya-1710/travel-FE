import React, { useEffect, useState } from 'react';
import Admin from './Admin';
import { MdDelete } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Col, FloatingLabel, Form, Row, Table } from 'react-bootstrap';
import { AllOrders, deleteBooking } from '../../ApiService';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { GoDotFill } from "react-icons/go";
import toast from 'react-hot-toast';

function AllOrder() {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function fetchUsers() {
            try {
                const data = await AllOrders();
                setUsers(data);
                console.log("packages", data);
            } catch (error) {
                console.error("Error fetching packages:", error);
            }
        }
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteBooking(id); // Call delete API
            setUsers((prev) => prev.filter((item) => item._id !== id)); // Remove from state
            toast.success("User deleted successfully!");
        } catch (error) {
            console.error("Error deleting package:", error);
            toast.error("Error deleting package:", error);
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const filteredUsers = users.filter((user) =>
        user.firstname.toLowerCase().includes(searchQuery) ||
        user.lastname.toLowerCase().includes(searchQuery) ||
        user.email.toLowerCase().includes(searchQuery) ||
        user.location.toLowerCase().includes(searchQuery)
    );

    return (
        <>
            <div className='d-flex'>
                <Admin />
                <Link to='/admin'><FaArrowLeftLong className='fs-2 ms-1 arrow_icon' /></Link>
                <div className='display_package ms-3 me-3'>
                    <h3 className='text-center mb-5'>Orders</h3>

                    <Form>
                        <Row className='d-flex justify-content-center'>
                            <Col lg={6}>
                                <FloatingLabel controlId="floatingInput" label="Search by first name, last name, email, or location..." className="mb-3 form_sec fs-6">
                                    <input type="text" placeholder="Search..." className='form-control fs-5  h-auto' onChange={handleSearch} />
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </Form>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Phone no</th>
                                <th>Location</th>
                                <th>Country</th>
                                <th>Date</th>
                                <th>Price</th>
                                <th>Guest</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Payment Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((item, index) => {
                                const guests = item.guest ? parseInt(item.guest) : 1;
                                const totalAmount = item.price * guests;
                                const discount = totalAmount * 0.10;
                                const tax = (totalAmount - discount) * 0.05;
                                const finalAmount = totalAmount - discount + tax;
                                const halfamount = finalAmount * 0.40;
                                const pendingamount = finalAmount - halfamount;

                                const currentDate = new Date();
                                const orderDate = new Date(item.date);
                                currentDate.setHours(0, 0, 0, 0);
                                orderDate.setHours(0, 0, 0, 0);

                                return (
                                    <tr key={index}>
                                        <td>{item.firstname}</td>
                                        <td>{item.lastname}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.location}</td>
                                        <td>{item.country}</td>
                                        <td>{new Date(item.date).toLocaleDateString()}</td>
                                        <td>{item.price}</td>
                                        <td>{item.guest}</td>
                                        <td>{finalAmount}</td>
                                        <td className={orderDate < currentDate ? "text-success" : "text-danger"}>
                                            <GoDotFill className={orderDate < currentDate ? "text-success me-1" : "text-danger me-1"} />
                                            {orderDate < currentDate ? "Complete" : "Pending"}
                                        </td>
                                        <td>
                                            <span className="text-success">₹ {halfamount} Complete</span>
                                            <br /><hr />
                                            <span className="text-danger">₹ {pendingamount} Pending</span>
                                        </td>
                                        <td>
                                            <Link to={`/orderupdate/${item._id}`}>
                                                <FaRegEdit className='fs-4 ms-2' style={{ color: "#0084B4" }} />
                                            </Link>
                                            <Link>
                                                <MdDelete className='text-danger fs-4 ms-3' onClick={() => { handleDelete(item._id) }} />
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    );
}

export default AllOrder;
