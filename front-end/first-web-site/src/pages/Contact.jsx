import Layout from "../components/layout/Layout";

function Contact() {
  const functionCall = (e) => {
    console.log("Hello Word " + e.target.name, e.target.value);
  };
  return (
    <Layout>
      <h1>Contact Us</h1>
      <p>MaanRishfa IT Solution</p>
      <p>Address: Noapara, Jessore, Khulna, Bangladesh</p>
      <p>Phone: +8801994540932</p>
      <input
        type='text'
        name='name'
        onChange={(e) => functionCall(e)}
        placeholder='Enter your name'
      />
      <input
        type='text'
        name='name1'
        onChange={(e) => functionCall(e)}
        placeholder='Enter your name'
      />
      <input
        type='text'
        name='name2'
        onChange={(e) => functionCall(e)}
        placeholder='Enter your name'
      />
      <button onClick={() => functionCall}> Create 2 </button>
    </Layout>
  );
}

export default Contact;
