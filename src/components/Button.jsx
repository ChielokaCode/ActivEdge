import React from "react";

const Button = ({ styling, onClick, text }) => {
  return (
    <div className={styling} onClick={onClick}>
      {text}
    </div>
  );
};

export default Button;
