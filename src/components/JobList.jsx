// import React, { useState, useEffect } from "react";
// import axios from "axios";
// const JobList = () => {
//   const [jobs, setJobs] = useState([]);
//   const [sortOption, setSortOption] = useState("");

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   const fetchJobs = async () => {
//     try {
//       const res = await axios.get("http://localhost:8000/api/jobs");
//       setJobs(res.data);
//     } catch (error) {
//       console.error("Error fetching jobs:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8000/api/jobs/${id}`);
//       setJobs(jobs.filter((job) => job._id !== id));
//     } catch (error) {
//       console.error("Error deleting job:", error);
//     }
//   };
//   const sortedJobs = [...jobs].sort((a, b) => {
//     if (sortOption === "Status") return a.status.localeCompare(b.status);
//     if (sortOption === "Date") return new Date(b.date) - new Date(a.date);
//     return 0;
//   });
//   return (
//     <>
//       <div className="sort-select">
//         <label>Sort By: </label>
//         <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
//           <option value="">-- Select --</option>
//           <option value="Status">Status</option>
//           <option value="Date">Date</option>
//         </select>
//       </div>

//       {jobs.length === 0 ? (
//         <p>No jobs added yet.</p>
//       ) : (
//         <div className="card-container">
//           {sortedJobs.map((job) => (
//             <div className="job-card" key={job._id}>
//               <h3>{job.company}</h3>
//               <p><strong>Role:</strong> {job.role}</p>
//               <p><strong>Status:</strong> {job.status}</p>
//               <p><strong>Date:</strong> {new Date(job.date).toLocaleDateString()}</p>
//               <p><strong>Link:</strong> <a href={job.link} target="_blank" rel="noreferrer">View</a></p>
//               <button onClick={() => handleDelete(job._id)}>Delete</button>
//             </div>
//           ))}
//         </div>
//       )}
//     </>
//   );
// };

// export default JobList;
import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./JobList.css";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/jobs");
      setJobs(res.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/jobs/${id}`);
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:8000/api/jobs/${id}`, { status: newStatus });
      setJobs(jobs.map((job) =>
        job._id === id ? { ...job, status: newStatus } : job
      ));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const sortedJobs = [...jobs].sort((a, b) => {
    if (sortOption === "Status") return a.status.localeCompare(b.status);
    if (sortOption === "Date") return new Date(b.date) - new Date(a.date);
    return 0;
  });

  return (
    <>
      <div className="sort-select">
        <label>Sort By: </label>
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="">-- Select --</option>
          <option value="Status">Status</option>
          <option value="Date">Date</option>
        </select>
      </div>

      {jobs.length === 0 ? (
        <p>No jobs added yet.</p>
      ) : (
        <div className="card-container">
          {sortedJobs.map((job) => (
            <div className="job-card" key={job._id}>
              <h3>{job.company}</h3>
              <p><strong>Role:</strong> {job.role}</p>
              <p>
                <strong>Status:</strong>
                <select
                  value={job.status}
                  onChange={(e) => handleStatusChange(job._id, e.target.value)}
                  style={{ marginLeft: "10px" }}
                >
                  <option value="Applied">Applied</option>
                  <option value="Interviewing">Interviewing</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </p>
              <p><strong>Date:</strong> {new Date(job.date).toLocaleDateString()}</p>
              <p><strong>Link:</strong> <a href={job.link} target="_blank" rel="noreferrer">View</a></p>
              <button onClick={() => handleDelete(job._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default JobList;
