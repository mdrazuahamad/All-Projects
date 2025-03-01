const variant = {
  primary: {
    backgroundColor: "#007bff",
    color: "#fff",
  },

  success: {
    backgroundColor: "#28a745",
    color: "#fff",
  },
  danger: {
    backgroundColor: "#dc3545",
    color: "#fff",
  },
};
const btnSize = {
  sm: {
    padding: "0.5rem 1rem",
    fontSize: "0.9rem",
  },
  md: {
    padding: "0.7rem 1.2rem",
    fontSize: "1rem",
  },
  lg: {
    padding: "1rem 1.5rem",
    fontSize: "1.1rem",
  },
};

const Button = (props) => {
  const userVariant = variant[props.variant];
  const userSize = btnSize[props.btnSize];
  return (
    <button
      type={props.type}
      style={{
        fontWeight: "700",
        textTransform: "uppercase",
        letterSpacing: "1px",
        borderRadius: "4px",
        border: "none",
        outline: "none",
        cursor: "pointer",
        marginRight: "1rem",
        ...userVariant,
        ...userSize,
      }}>
      {props.text}
    </button>
  );
};

export default Button;
