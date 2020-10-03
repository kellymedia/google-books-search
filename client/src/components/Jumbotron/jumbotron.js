import React from "react";
import "../Jumbotron/jumbotron.css";

function Jumbotron({ children }) {
  return (
    <div style={{ textAlign: "center", height: 250 }} className="jumbotron">
      {children}
    </div>
  );
}

export default Jumbotron;
