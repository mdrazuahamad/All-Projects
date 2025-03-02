
import { useState } from "react";
import Layout from "../components/layout/Layout";
import DisplayCount from "../components/displayCount/DisplayCount";
import Button from "../components/button/Button";
import UpdateIncrementDecrement from "../components/input-group/UpdateIncrementDecrement"

function About() {
  const [count, setCount] = useState(0);
  const [incrementValue, setIncrementValue]= useState(5)
  const [decrementValue, setDecrementValue]= useState(10)
  function increment(){
    setCount(count + incrementValue)
  }
  function decrement(){
    setCount(count - decrementValue)
  }
  function handleIncrementChange(e){
    setIncrementValue(parseInt(e.target.value))
  }
  function handleDecrementChange(e){
    setDecrementValue(parseInt(e.target.value))
  }

  return (
    <Layout>
      <h1>About Us</h1>
      <DisplayCount count={count}/>
      <UpdateIncrementDecrement incrementValue={incrementValue} decrementValue={decrementValue} handleIncrementChange={handleIncrementChange} handleDecrementChange={handleDecrementChange}  />
      <Button increment={increment} decrement={decrement} />
      <p>MaanRishfa IT Solution</p>
      <p>Address: Noapara, Jessore, Khulna, Bangladesh</p>
      <p>Phone: +8801994540932</p>
    </Layout>
  );
}

export default About;
