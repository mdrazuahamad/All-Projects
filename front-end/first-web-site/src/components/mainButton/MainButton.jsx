import React from "react";
import PropTypes from "prop-types";

const MainButton = ({
  variant = "primary",
  size = "md",
  children,
  className,
  ...props
}) => {
  const baseStyles =
    "rounded-2xl font-medium transition duration-300 ease-in-out focus:outline-none";

  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    outline: "border border-gray-500 text-gray-700 hover:bg-gray-100",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  const sizeStyles = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  return (
    <button
      className={(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}>
      {children}
    </button>
  );
};

MainButton.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary", "outline", "danger"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default MainButton;
