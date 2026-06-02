import React from "react";

function LabeledInput(props) {
  const { label, id, ...rest } = props;

  return (
    <>
      <label htmlFor={id} className="block text-sm mb-2">
        {label}
      </label>

      <input
        className="py-3 pl-4 text-sm rounded-md w-full bg-white"
        id={id}
        {...rest}
      />
    </>
  );
}

export default LabeledInput;