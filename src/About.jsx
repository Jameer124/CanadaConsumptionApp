import { Link,useNavigate } from "react-router"



function About() {
  let navigate = useNavigate();

const navigatetohome =() =>{
  navigate("/Home");
}
    return (
      <>
       <h1>About Page</h1>
       <button onClick={navigatetohome}>Redict to home page</button>
      </>
    )
  }
  
  export default About
  