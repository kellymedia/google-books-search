import React from "react";

import "./deleteBtn.css";

function DeleteBtn(props) {
  return (
    <button
      className="delete-btn btn"
      tabIndex="0"
      onClick={() => props.handleDeleteSubmit(props.id)}
      style={{ float: "right", marginBottom: 10 }}
    >
      <i className="far fa-trash-alt"></i>
      {props.children}
    </button>
  );
}

export default DeleteBtn;
