import React from "react";

import classnames from "classnames";
import PropTypes from "prop-types";

const noop = () => {};

const Button = ({
  size = "medium",
  style = "primary",
  type = "button",
  buttonText,
  onClick = noop,
  loading,
  className = "",
  icon,
  disabled = false,
}) => {
  const handleClick = e => {
    if (!(disabled || loading)) return onClick(e);

    return null;
  };

  return (
    <button
      disabled={disabled || loading}
      type={type}
      className={classnames(
        [className],
        "group relative flex items-center justify-center gap-x-2 rounded-md border border-transparent text-sm  font-medium leading-5 transition duration-150 ease-in-out focus:outline-none",
        {
          "px-4 py-2": size === "medium",
          "px-2 py-1": size === "small",
          "bg-indigo-600 text-white hover:bg-indigo-700":
            !loading && style === "primary",
          "bg-gray-200 text-gray-800 hover:bg-gray-300":
            !loading && style === "secondary",
          "bg-gray-300 text-gray-800": loading,
          "cursor-wait": loading,
          "cursor-not-allowed opacity-50": disabled,
        }
      )}
      onClick={handleClick}
    >
      {icon && <i className={`ri-${icon} text-base`} />}
      {loading ? "Loading..." : buttonText}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  buttonText: PropTypes.string,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};
export default Button;
