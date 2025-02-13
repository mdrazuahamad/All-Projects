const InputGroup = (props) => {
  const label = props.label;
  const type = props.type;
  return (
    <div style={{ display: "flex", flexDirection: "column", marginBottom: "1rem" }}>
      <label
        htmlFor='name'
        style={{
          marginBottom: "0.5rem",
          fontFamily: "arial",
          fontSize: "1rem",
          color: "#666",
        }}>
        {label}
      </label>

      <input
        type={type}
        id='name'
        style={{
          padding: "0.5rem 1rem",
          borderRadius: "0.5rem",
          border: "1px solid #ddd",
          outline: "none",
          fontFamily: "arial",
          color: "#666",
        }}
      />
    </div>
  );
};

export default InputGroup;
