// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
// import JobList from './components/JobList'
// // import AddJob from './components/JobAdd'
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import { Router } from 'react-router-dom';
// import AddJob from './components/JobAdd';
// import { Navigate } from "react-router-dom";

// function App() {
//   const [count, setCount] = useState(0)
 
//   return (
//     <>
//      <Router>
//       <Routes>
//         {/* <Route path="/" element={<Navigate to="/JobAdd" />} /> */}
//         <Route path="/" element={<AddJob />} />
//         {/* <Route path="/JobList" element={<JobList jobs={[]} onDelete={() => {}} />} /> */}
//       </Routes>
//     </Router>
      
//     </>
//   )
// }

// export default App
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddJob from "./components/JobAdd";
import JobList from "./components/JobList";
import Nav from "./components/Nav"; // if you want the nav always visible

function App() {
  return (
    <Router>
      <Nav /> {/* Shows nav on all pages */}
      <Routes>
        <Route path="/JobAdd" element={<AddJob />} />
        <Route path="/JobList" element={<JobList />} />
        <Route path="*" element={<AddJob />} /> {/* fallback to AddJob or 404 page */}
      </Routes>
    </Router>
  );
}

export default App;
