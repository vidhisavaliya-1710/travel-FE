import React, { useEffect, useState } from "react";
import { Breadcrumb, Container } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import backgroundImage from "../../images/breadcrum.jpg";
import Navbars from "../Home/Navbars";
import Footer from "../Footer/Footer";
import { getSinglePackage } from "../../ApiService";
import { useDispatch, useSelector } from "react-redux";

function Gallary() {

   const {id}=useParams();
      const [packages, setPackages] = useState([]);
      const navigate = useNavigate();
      const dispatch=useDispatch()
      const email=useSelector((state)=>state.counter.email)
  
      console.log("user email",email)
  
    
  
  
     useEffect(() => {
        async function fetchPackages() {
          try {
            const data = await getSinglePackage(id,dispatch);
            setPackages(data); // Store fetched data in state
            console.log("packages",data)
          } catch (error) {
            console.error("Error fetching packages:", error);
          }
        }
        fetchPackages();
      },[id,dispatch]);


  return (
    <div>
      <Navbars />
      <div
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    padding: '100px 0',
                    width: '100%',
                    textAlign: 'center',
                    position: 'relative',
                    color: 'white'
                }}
            >
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.6)'
                }}></div>
                <Container style={{ position: 'relative', zIndex: 1 }}>
                    <h1 className="mb-4">Gallery</h1>
                    <Breadcrumb style={{ justifyContent: 'center' }} className="d-flex">
                        <Breadcrumb.Item>
                            <Link to="/" className="fs-5 text-white text-decoration-none">Home</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active className="fs-5" style={{ color: "#0084b4" }}>Gallery</Breadcrumb.Item>
                    </Breadcrumb>
                </Container>
            </div>

      <div style={{ padding: "2rem" }}>
        <h2 className="text-center mb-4" style={{color:'#0084B4'}}>{packages.name}</h2>
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <img
              src={packages?.img?.[0]}
              alt="Gallery item 1"
              style={{ width: "100%", borderRadius: "15px", objectFit: "cover", height:"280px" }}
            />
          </div>
          <div className="col-lg-4 col-md-6">
            <img
              src={packages?.img?.[1]}
              alt="Gallery item 2"
              style={{ width: "100%", borderRadius: "15px", objectFit: "cover", height:"320px"}}
            />
          </div>
          <div className="col-lg-4 col-md-6">
            <img
              src={packages?.img?.[2]}
              alt="Gallery item 3"
              style={{ width: "100%", borderRadius: "15px", objectFit: "cover", height:"280px"}}
            />
          </div>
          <div className="col-lg-6 col-md-12">
            <img
              src={packages?.img?.[3]}
              alt="Gallery item 4"
              style={{ width: "100%", borderRadius: "15px", objectFit: "cover",height:"560px" }}
            />
          </div>
          <div className="col-lg-6 col-md-12">
            <img
              src={packages?.img?.[4]}
              alt="Gallery item 5"
              style={{ width: "100%", borderRadius: "15px", objectFit: "cover",height:"560px" }}
            />
          </div>
          <div className="col-lg-4 col-md-6">
            <img
              src={packages?.img?.[7]}
              alt="Gallery item 6"
              style={{ width: "100%", borderRadius: "15px", objectFit: "cover" }}
            />
          </div>
          <div className="col-lg-4 col-md-6">
            <img
              src={packages?.img?.[6]}
              alt="Gallery item 7"
              style={{ width: "100%", borderRadius: "15px", objectFit: "cover" }}
            />
          </div>
          {/* <div className="col-lg-4 col-md-6">
            <img
              src={require('../../images/gallary8.jpg')}
              alt="Gallery item 8"
              style={{ width: "100%", borderRadius: "15px", objectFit: "cover" }}
            />
          </div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Gallary;
