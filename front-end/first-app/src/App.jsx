import InputGroup from "./components/input-group/InputGroup";
import Button from "./components/button/Button";

function App() {
  return (
    <div
      style={{
        width: "50%",
        padding: "2rem",
        backgroundColor: "#fff",
        margin: "2rem auto",
        borderRadius: "0.9rem",
      }}>
      <div style={{ textAlign: "center", fontFamily: "arial" }}>
        <h3>Sign Up</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <form action=''>
        <InputGroup label="What's Your Name" type='text' />
        <InputGroup label="What's Your Email" type='email' />
        <InputGroup label="What's Your Password" type='password' />
        <div>
          <Button variant='danger' btnSize='sm' type='reset' text='Reset' />
          <Button variant='primary' btnSize='md' type='submit' text='Submit' />
        </div>
      </form>
    </div>
  );
}

export default App;
