import React, { useEffect, useState } from 'react'
import Admin from './Admin'
import '../Admin/Admin.css'
import { GiConfirmed } from "react-icons/gi";
import { FaRegUserCircle } from "react-icons/fa";
import { IoChatbubble } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";
import { Chart } from 'react-charts';
import { AllOrders, getpackage, showfeedback, ShowUsers } from '../../ApiService';
import { useNavigate } from 'react-router-dom';
import ShowFeedback from './ShowFeedback';

function Dashboard() {

  const [orders, setOrders] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [msg,setMsg]=useState(0);
  const [packages,setPackage]=useState(0);

  const navigate = useNavigate();
    const auth = localStorage.getItem('authToken');
  useEffect(() => {
      if (!auth) {
        navigate('/login');
        console.log("login......")
      }
    }, [auth, navigate]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await AllOrders(); // Fetch orders from API
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }
    fetchOrders();
  }, []);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const users = await ShowUsers();
        setUserCount(users.length); // Update user count state
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const users = await showfeedback();
        setMsg(users.length); // Update user count state
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const users = await getpackage();
        setPackage(users.length); // Update user count state
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchUsers();
  }, []);

  const processedData = React.useMemo(() => {
    if (orders.length === 0) return [];
  
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    // Step 1: Initialize dataMap with all 12 months set to 0 orders
    const dataMap = new Map(monthNames.map(month => [month, 0]));
  
    // Step 2: Process orders and update counts
    orders.forEach(order => {
      if (!order.date) return;
  
      let orderDate;
      try {
        orderDate = new Date(order.date);
        if (isNaN(orderDate)) throw new Error("Invalid date");
      } catch (error) {
        console.error("Skipping invalid date:", order.date);
        return;
      }
  
      const monthIndex = orderDate.getMonth(); // Get month index (0-11)
      const monthName = monthNames[monthIndex]; // Convert to month name
  
      dataMap.set(monthName, dataMap.get(monthName) + 1); // Increment order count
    });
  
    // Step 3: Convert to chart-friendly format
    return [
      {
        label: 'Orders Per Month',
        data: Array.from(dataMap.entries()).map(([month, count]) => ({ x: month, y: count }))
      }
    ];
  }, [orders]);
  
  console.log("Processed Data:", processedData);
  
  
  console.log("Processed Data:", processedData);
  
  
  
  

  console.log("cdscsd",processedData)


  const axes = React.useMemo(
    () => [
      { primary: true, type: 'ordinal', position: 'bottom' }, // ✅ Use 'ordinal' for categorical month names
      { type: 'linear', position: 'left', tickValues: [5, 10, 15, 20] } // ✅ Y-axis steps
    ],
    []
  );
  
  return (
    <>
     <div className='d-flex'>
     <Admin/>
     <div className="bg_admin">
  <div className="container pt-5 pb-5">
    <div className="row d-flex gap-3 justify-content-center">
      <div className="col-lg-3 text-dark rounded-2 lh-1 admin_box p-3 box_color" style={{height: '190px'}}>
        <a href="">
          <div className="d-flex align-items-center justify-content-center mt-4">
            {/* <i className="fa-brands fa-first-order-alt fs-3 p-2 rounded-2 user_icon3" /> */}
            <GiConfirmed className='p-2 rounded-2 user_icon3' />
            <span className="ms-3">
              <h3 className="text-dark fs-2">{orders.length}</h3>
              <p className="fs-3 text-dark">Orders</p>
            </span>
          </div>
        </a>
      </div>
      <div className="col-lg-3 text-dark rounded lh-1 admin_box p-3 box_color " style={{height: '190px'}}>
        <a href="">
          <div className="d-flex align-items-center justify-content-center mt-4">
            {/* <i className="fa-solid fa-users fs-3 p-2 rounded-2 user_icon2" /> */}
            <FaRegUserCircle className='p-2 rounded-2 user_icon2'/>
            <span className="ms-3">
              <h3 className="text-dark fs-2">{userCount}</h3>
              <p className="fs-3 text-dark">Users</p>
            </span>
          </div>
        </a>
      </div>
      <div className="col-lg-3 text-dark rounded lh-1 admin_box p-3 box_color" style={{height: '190px'}}>
        <a href="">
          <div className="d-flex align-items-center justify-content-center mt-4">
            {/* <i className="fa-solid fa-envelope fs-3 p-2 rounded-2 user_icon1" /> */}
            <IoChatbubble className='p-2 rounded-2 user_icon1'/>
            <span className="ms-3">
              <h3 className="text-dark fs-2">{msg}</h3>
              <p className="fs-3 text-dark">Messages</p>
            </span>
          </div>
        </a>
      </div>
      <div className="col-lg-3 text-dark rounded lh-1 admin_box p-3 box_color" style={{height: '190px'}}>
        <a href="">
          <div className="d-flex align-items-center justify-content-center mt-4">
            {/* <i className="fa-solid fa-user fs-3 p-2 rounded-2 user_icon" /> */}
            <MdAdminPanelSettings className='p-2 rounded-2 user_icon'/>
            <span className="ms-3">
              <h3 className=" text-dark fs-2">{packages}</h3>
              <p className="text-dark fs-3">Packages</p>
            </span>
          </div>
        </a>
      </div>
    </div>
  </div>

  <div className='d-flex justify-content-center mt-4'>
  <div
      style={{
        width: '900px',
        height: '400px',
      }}
    >
       {/* {processedData.length > 0 ? (
                <Chart data={processedData} axes={axes} className='mb-3'/>
              ) : (
                <p className="text-center">No data available for the chart</p>
              )} */}
    </div>
  </div>
</div>
     </div>

    </>
  )
}

export default Dashboard
