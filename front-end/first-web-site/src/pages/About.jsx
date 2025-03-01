
import { useState } from "react";
import Layout from "../components/layout/Layout";
import Button from "../components/button/Button";

function About() {
  const [count, setCount] = useState(0);
  function increment(){
    setCount(count + 1)
  }
  function decrement(){
    setCount(count -1)
  }
  return (
    <Layout>
      <h1>About Us</h1>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Increment</button>
      <Button variant='primary' btnSize='sm'  text='Increment' type='button' onClick={increment} />
      <button onClick={decrement}>Decrement</button>
      <p>MaanRishfa IT Solution</p>
      <p>Address: Noapara, Jessore, Khulna, Bangladesh</p>
      <p>Phone: +8801994540932</p>
    </Layout>
  );
}

export default About;
