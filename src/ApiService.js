import axios, { Axios } from "axios";
import { setLocation, setPrice,setPackageId, setFinalamount } from "./Components/Slice/AuthSlice";

export const getpackage=async()=>{
    try{
        const response=await axios.get("http://localhost:8000/getpackage")

        return response.data.data
    }
    catch(error){
        console.error("Error in getRdsFN:", error);
        throw error; // Rethrow the error to be handled by the calling function
    }
}

export const addpackages=async(formData,dispatch)=>{
    try{
        const response=await axios.post("http://localhost:8000/addpackage",formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        console.log('Response package:', response);
    
        // if (response.data && response.data.location) {
        //   dispatch(setLocation(response.data.location));  // Update Redux state
        // }

        return response.data
        

    }
    catch(error){
        console.error("Error in getRdsFN:", error);
        throw error; 
    }
}

export const getSinglePackage=async(id,dispatch)=>{
    try{
        const response=await axios.get(`http://localhost:8000/getSinglepackage/${id}`)

        console.log('Response package:', response.data.data.destination);
    
        if (response.data.data && response.data.data.destination) {
          dispatch(setLocation(response.data.data.destination)); 
        //  // Update Redux state
            dispatch(setPrice(response.data.data.price));
            dispatch(setPackageId(response.data.data._id))
        }
        

        return response.data.data

    }
    catch(error){
        console.error("Error in get Single properties Data:", error);
    throw error;
    }
}

export const ShowUsers=async()=>{
    try{
        const response=await axios.get("http://localhost:8000/signup")

        return response.data.data
    }
    catch(error){
        console.error("Error in getRdsFN:", error);
        throw error;
    }
}

export const Booking=async(payload,dispatch)=>{
    const token = localStorage.getItem("authToken");
    try{
        const response = await axios.post("http://localhost:8000/booking", payload, {
            headers: {
                "Content-Type": "application/json",
                 "Authorization": `Bearer ${token}`
              },
        });

        console.log("response booking",response);
        dispatch(setFinalamount(response.data.data.finalAmount))
        return response.data.data;

    }
    catch(error){
        console.error("Error in getRdsFN:", error);
        throw error;
    }
}

export const UpdatePachage=async(id,packagedata)=>{
    try{
        const response=await axios.post(`http://localhost:8000/updatepackage/${id}`,packagedata,{
            headers: { "Content-Type": "multipart/form-data" },
        })

        console.log("update package",response.data.data)
        return response.data.data
    }catch(error){
        console.error("Error in getRdsFN:", error);
        throw error;
    }
}


export const deletePackage=async(id)=>{
    try{
        const response=await axios.post(`http://localhost:8000/deletepackage/${id}`)

        console.log("delete record",response.data)
        return response.data
    }catch(error){
        console.error("Error in getRdsFN:", error);
        throw error;
    }
}

export const AllOrders=async()=>{
    try{
        const response=await axios.get("http://localhost:8000/getbook")

        return response.data.data
    }catch(error){
        console.error("Error in getRdsFN:", error);
        throw error;
    }
}

export const Getuserbookingdata=async()=>{
    const token = localStorage.getItem("authToken");
    try{
        const response=await axios.get("http://localhost:8000/Getuserbookingdata",{
            headers: {
                 "Authorization": `Bearer ${token}`
              },
     })
        console.log("Getuserbookingdata",response.data)
        return response.data
    }catch(error){
        console.error("Error in getRdsFN:", error);
        throw error;
    }
}

export const AddContact=async(formdata)=>{
    try{
        const response=await axios.post('http://localhost:8000/addContact',formdata,{
            headers: {
                "Content-Type": "application/json",
              },
        })

        console.log("AddContact",response.data.data)

        return response.data.data


    }catch(error){
        console.error("Error in getRdsFN:", error);
        throw error;
    }
}

export const AddFeedback=async(formdata)=>{
    try{
        const response=await axios.post('http://localhost:8000/addfeedback',formdata,{
            headers: {
                "Content-Type": "application/json",
              },

              
        })

        console.log("AddContact",response.data.data)

        return response.data.data
    }catch(error){
        console.error("Error in getRdsFN:", error);
        throw error;
    }
}

export const showContact=async()=>{
    try{

        const response=await axios.get('http://localhost:8000/getcontact')

        return response.data.data

    }catch(error){
        console.error("Error in getRdsFN:", error);
        throw error;
    }
}

export const showfeedback=async()=>{
    try{

        const response=await axios.get('http://localhost:8000/showfeedback')

        return response.data.data

    }catch(error){
        console.error("Error in getRdsFN:", error);
        throw error
    }
}

export const Updateuser=async(id,formdata)=>{
    try{
        const response=await axios.post(`http://localhost:8000/updateuserprofile/${id}`,formdata,{
            headers: {
                "Content-Type": "application/json",
              },
        })

        console.log("update user data",response.data.data)

        return response.data.data
    }catch(error){
        console.error("Error in getRdsFN:", error);
        throw error
    }
}

export const DeleteUser=async(id)=>{
    try{
        const response=await axios.post(`http://localhost:8000/deleteuser/${id}`)

        console.log("Response to the delete record",response.data.data)

        return response.data.data

    }catch(error){
        console.error("Error in getRdsFN:", error);
        throw error
    }
}

export const updateBooking=async(id,formdata)=>{
    try{
        const response=await axios.post(`http://localhost:8000/bookingupdate/${id}`,formdata,{
            headers: {
                "Content-Type": "application/json",
              },
        })

        console.log("update user data",response.data.data)

        return response.data.data
        
    }catch(error){
        console.error("Error in getRdsFN:", error);
        throw error
    }
}

export const deleteBooking=async(id)=>{
    try{
        const response=await axios.post(`http://localhost:8000/bookingdelete/${id}`)

        console.log("delete booking",response.data.data)

        return response.data.data
    }catch(error){
        console.error("Error in getRdsFN:", error);
        throw error
    }
}

export const Payment=async(payload)=>{

    const token=localStorage.getItem('authToken')
    try{
        const response = await axios.post("http://localhost:8000/createpayment", payload, {
            headers: {
                "Content-Type": "application/json",
                 "Authorization": `Bearer ${token}`
              },
        });

        console.log("payment data",response.data.data)
        return response.data.data
    }catch(error){
        console.error("Error in getRdsFN:", error);
        throw error
    }
}

export const UpdateContacts=async(id,formData)=>{
    try{
        const response=await axios.post(`http://localhost:8000/UpdateContact/${id}`,formData,{
            headers: {
                "Content-Type": "application/json",
              },
        })

        console.log("update user data",response.data.data)

        return response.data.data
    }catch(error){
        console.error("Error in getRdsFN:", error);
        throw error
    }
}

export const DeleteContact=async(id)=>{
    try{
        const response=await axios.post(`http://localhost:8000/bookingdelete/${id}`)

        console.log("Delete Contact",response.data.data)

        return response.data.data
    }catch(error){
        console.error("Error in getRdsFN:", error);
        throw error
    }
}

export const UpdateFeedbacks=async(id,formData)=>{
    try{
        const response=await axios.post(`http://localhost:8000/updateFeedback/${id}`,formData,{
            headers: {
                "Content-Type": "application/json",
              },
        })

        console.log("update user data",response.data.data)

        return response.data.data
    }catch(error){
        console.error("Error in getRdsFN:", error);
        throw error
    }
}

export const DeleteFeedbacks=async(id)=>{
    try{
        const response=await axios.post(`http://localhost:8000/DeleteFeedback/${id}`)

        console.log("Delete Contact",response.data.data)

        return response.data.data
    }catch(error){
        console.error("Error in getRdsFN:", error);
        throw error
    }
}