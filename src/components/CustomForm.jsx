import React from "react";

const CustomForm = ({
  onSubmit,
  formStyling,
  htmlFor,
  labelStyling,
  labelText,
  inputId,
  inputValue,
  inputOnChange,
  inputPlaceholder,
  inputClassName,
  commentError,
  buttonText,
}) => {
  return (
    <>
      <form onSubmit={onSubmit} className={formStyling}>
        <label htmlFor={htmlFor} className={labelStyling}>
          {labelText}
        </label>
        <input
          type="text"
          id={inputId}
          value={inputValue}
          onChange={inputOnChange}
          placeholder={inputPlaceholder}
          className={inputClassName}
        />
        {commentError}
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 mb-2"
        >
          {buttonText}
        </button>
      </form>
    </>
  );
};

export default CustomForm;
