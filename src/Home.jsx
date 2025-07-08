import { Link,useNavigate } from "react-router"
import Toplitemenu from "./Components/MenuItem/Toplitemenu";
function Home() {

  let navigate = useNavigate();

  const navigatetowiki =() =>{
    // navigate("/Wiki/123/jameer");
    navigate(`/user/123/username/jameer`)
  }

    return (
      <>
<Toplitemenu></Toplitemenu>


<h1 style={{marginTop:'5vh',fontSize:'revert'}}>Home Page</h1>

       {/* <button onClick={navigatetowiki}>Wiki</button> */}
      </>
    )
  }
  
  export default Home
  