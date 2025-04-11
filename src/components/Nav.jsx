
import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav style={{ padding: "10px", backgroundColor: "#f5f5f5" }}>
      <Link to="/">
        <button style={{ marginRight: "10px" }}>Job Applications</button>
      </Link>

      
      <Link to="/JobList">
        <button>JobList</button>
      </Link> 
     
    </nav>
  );
};

export default Nav;
