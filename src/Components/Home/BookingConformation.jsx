import React, { useEffect, useState } from "react";
import { Container, Table, Button, Row, Col, Card, Badge } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { deleteBooking, Getuserbookingdata } from "../../ApiService";
import Navbars from "./Navbars";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function BookingConfirmation() {
    const [bookings, setBookings] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        async function fetchBookings() {
            try {
                const data = await Getuserbookingdata();
                setBookings(data);
            } catch (error) {
                console.error("Error fetching bookings:", error);
                // toast.error("Failed to load bookings");
            }
        }
        fetchBookings();

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this booking?")) {
            try {
                await deleteBooking(id);
                setBookings(prev => prev.filter(item => item._id !== id));
                toast.success("Booking deleted successfully!");
            } catch (error) {
                console.error("Error deleting booking:", error);
                toast.error("Failed to delete booking");
            }
        }
    };

    // Calculate booking amounts
    const calculateAmounts = (booking) => {
        const guests = booking.guest ? parseInt(booking.guest) : 1;
        const totalAmount = booking.price * guests;
        const discount = totalAmount * 0.10;
        const tax = (totalAmount - discount) * 0.05;
        const finalAmount = totalAmount - discount + tax;
        const halfAmount = finalAmount * 0.40;
        const pendingAmount = finalAmount - halfAmount;

        return {
            totalAmount,
            discount,
            tax,
            finalAmount,
            halfAmount,
            pendingAmount
        };
    };

    return (
        <>
            <Navbars />
            
            <Container className="my-4 my-md-5">
                <h2 className="text-center mb-4" style={{ color: '#0084b4', fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
                    Booking Confirmation
                </h2>

                {isMobile ? (
                    // Mobile view - Cards
                    <Row className="g-4">
                        {bookings?.map((item, index) => {
                            const amounts = calculateAmounts(item);
                            
                            return (
                                <Col xs={12} key={index}>
                                    <Card className="shadow-sm">
                                        <Card.Body>
                                            <div className="d-flex justify-content-between mb-2">
                                                <span className="fw-bold">Booking #{index + 1}</span>
                                                <div>
                                                    <Link to={`/bookingupdate/${item._id}`} className="me-2">
                                                        <FaRegEdit style={{ color: "#0084B4" }} />
                                                    </Link>
                                                    <MdDelete 
                                                        className="text-danger" 
                                                        onClick={() => handleDelete(item._id)} 
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                </div>
                                            </div>
                                            
                                            <div className="mb-2">
                                                <span className="text-muted">Name:</span> {item.firstname} {item.lastname}
                                            </div>
                                            <div className="mb-2">
                                                <span className="text-muted">Email:</span> {item.email}
                                            </div>
                                            <div className="mb-2">
                                                <span className="text-muted">Destination:</span> {item?.packageId?.destination || 'N/A'}
                                            </div>
                                            <div className="mb-2">
                                                <span className="text-muted">Tour Type:</span> {item?.packageId?.tourtype || 'N/A'}
                                            </div>
                                            <div className="mb-2">
                                                <span className="text-muted">Guests:</span> {item.guest}
                                            </div>
                                            <div className="mb-2">
                                                <span className="text-muted">Price:</span> ₹{item.price}/guest
                                            </div>
                                            
                                            <div className="mt-3 p-2 bg-light rounded">
                                                <div className="d-flex justify-content-between mb-1">
                                                    <span>Total:</span>
                                                    <span className="fw-bold">₹ {amounts.finalAmount.toFixed(2)}</span>
                                                </div>
                                                <div className="d-flex justify-content-between mb-1">
                                                    <span>Paid:</span>
                                                    <span className="text-success">₹ {amounts.halfAmount.toFixed(2)}</span>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <span>Pending:</span>
                                                    <span className="text-danger">₹ {amounts.pendingAmount.toFixed(2)}</span>
                                                </div>
                                                <div className="mt-2 text-center">
                                                    <Badge bg={item.paymentStatus === "Completed" ? "success" : "danger"}>
                                                        {item.paymentStatus || "Pending"}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            );
                        })}
                    </Row>
                ) : (
                    // Desktop view - Table
                    <div className="table-responsive">
                        <Table striped bordered hover className="shadow-sm">
                            <thead className="">
                                <tr>
                                    <th>No</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Destination</th>
                                    <th>Tour Type</th>
                                    <th>Guests</th>
                                    <th>Price/Guest</th>
                                    <th>Total</th>
                                    <th>Payment Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings?.map((item, index) => {
                                    const amounts = calculateAmounts(item);
                                    
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.firstname} {item.lastname}</td>
                                            <td>{item.email}</td>
                                            <td>{item?.packageId?.destination || 'N/A'}</td>
                                            <td>{item?.packageId?.tourtype || 'N/A'}</td>
                                            <td>{item.guest}</td>
                                            <td>₹ {item.price}</td>
                                            <td><strong>₹ {amounts.finalAmount.toFixed(2)}</strong></td>
                                            <td>
                                                <div className="d-flex flex-column">
                                                    <span className={item.paymentStatus === "Completed" ? "text-success" : "text-danger"}>
                                                        ₹ {amounts.halfAmount.toFixed(2)} {item.paymentStatus || "Pending"}
                                                    </span>
                                                    <span className="text-danger">
                                                        ₹ {amounts.pendingAmount.toFixed(2)} Pending
                                                    </span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="d-flex justify-content-center">
                                                    <Link to={`/bookingupdate/${item._id}`} className="me-3">
                                                        <FaRegEdit style={{ color: "#0084B4" }} />
                                                    </Link>
                                                    <MdDelete 
                                                        className="text-danger fs-3" 
                                                        onClick={() => handleDelete(item._id)} 
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </div>
                )}

                {bookings.length === 0 && (
                    <div className="text-center py-5">
                        <h4>No bookings found</h4>
                        <p>You haven't made any bookings yet.</p>
                        <Link to="/package" className="btn ">
                            Browse Packages
                        </Link>
                    </div>
                )}
            </Container>

            <Footer />
        </>
    );
}

export default BookingConfirmation;