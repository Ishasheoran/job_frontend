import React, { useState ,useEffect} from "react";
import axios from "axios";
import JobList from "./JobList";
import Nav from "./Nav";
const AddJob=()=>{
    const [company, setCompany] = useState("");
    const[role,setRole]=useState("");
    const[link,setLink]=useState("");
    const [status, setStatus] = useState("Applied");
    const [date, setDate] = useState("");
    const [jobs, setJobs] = useState([]);
    const fetchJobs = async () => {
        try {
          const res = await axios.get("https://job-backend-82mk.onrender.com/api/jobs");
          setJobs(res.data);
        } catch (error) {
          console.error("Error fetching jobs:", error);
        }
      };
    
      useEffect(() => {
        fetchJobs();
      }, []);
    const handleDelete = async (id) => {
        try {
          await axios.delete(`https://job-backend-82mk.onrender.com/api/jobs/${id}`);
          setJobs(jobs.filter((job) => job._id !== id));
        } catch (error) {
          console.error("Error deleting job:", error);
        }
      };
      
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const newJob = {
          company,
          role,
          status,
          date,
          link,
        };
    
        try {
          await axios.post("https://job-backend-82mk.onrender.com/api/jobs", newJob);
          alert("Job added successfully!");
          
          // Optional: Reset form
          fetchJobs();
          setCompany("");
          setRole("");
          setStatus("Applied");
          setDate("");
          setLink("");
        } catch (error) {
          console.error("Error adding job:", error);
          alert("Failed to add job.");
        }
      };
    
    return(
        <>
        {/* <Nav /> */}
        <h1>Add Job Application</h1>
        <form onSubmit={handleSubmit}>
            <input type="text"  placeholder="company" value={company}   onChange={(e) => setCompany(e.target.value)}/>
            <input type="text"  placeholder="role" value={role}   onChange={(e) => setRole(e.target.value)}/>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>
            {/* <input type="text" placeholder="status"value={status} /> */}
            <input type="date" placeholder="date" value={date} onChange={(e) => setDate(e.target.value)}/>
            <input type="link" placeholder="link" value={link} onChange={(e) => setLink(e.target.value)}/>
            <button type="submit">submit</button>
            </form>
            {/* <JobList jobs={jobs} setJobs={setJobs} onDelete={handleDelete} /> */}
            </>
                
    )
}
export default AddJob;
