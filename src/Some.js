import React from "react";

function Some(props) {
  return (
    <div className="App" style={{ color: "black" }}>
      {(props && props.name) || "This is some"}
    </div>
  );
}

export default Some;
