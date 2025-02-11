export const CheckAuth = () => {
  const token = localStorage.getItem("token");
  if (token !== null || undefined) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        nani_header_key: token,
      },
    };
    fetch("http://localhost:3095/user/auth/", options)
      .then((response) => response.json())
      .then((res) => {
        localStorage.setItem("userrole", res?.user[0]?.user_role)
        // return res;
      });
  }
};
