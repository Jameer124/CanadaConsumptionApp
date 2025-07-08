import React from "react";
import { Link ,useNavigate} from "react-router";
import $ from 'jquery';
import MarsLogo from '../../../src/assets/logo/mars_new_logo.png';


export default function Toplitemenu() {
  const domainshortName = import.meta.env.VITE_App_shortName;

  const setScreenName = (ScreenName) => {
    localStorage.setItem(`${domainshortName}` +"ScreenName", ScreenName);
}
  const getScreenName = () => {
    const ScreenNameStr = localStorage.getItem(`${domainshortName}` +"ScreenName");
      if(ScreenNameStr)
          return ScreenNameStr;
      else
          return "Summary";
  }
  const ScreenName = getScreenName();
  
  let navigate = useNavigate();

  const goUrl = (e) => {
    
    $("li.nav-item").removeClass("nav-active");
    $(e.currentTarget).addClass("nav-active");
    setScreenName(e.target.innerText);
    if(e.target.innerText === "Canada Consumption"){
      navigate("/MainIndex");
    }
    else if(e.target.innerText === "Home"){
      navigate("/Home");
    }
    
    else{
      navigate("/MainIndex");
    }
    
  }
 
  return(
    <>
    <nav className="navbar fixed-top navbar-expand-lg navbar-transparent bg-light"></nav>
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid pad-left-035rem">
        <Link className="navbar-brand">
        <img alt="Ecomm" src={MarsLogo} />
        &nbsp;
</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* <li className={`${ScreenName ==="Home" ? "nav-active" : "" } nav-item cursor `} onClick={goUrl}>
                <span className="nav-link active">Home</span>
              </li> */}
              <li className={`${ScreenName ==="Canada Consumption" ? "nav-active" : "" } nav-item cursor `} onClick={goUrl}>
                <span className="nav-link active">Canada Consumption</span>
              </li>
              
            </ul>
            <ul className="navbar-nav">
            <li className="nav-item dropdown d-flex">
            <span className="nav-link">Hi,  Guest</span>
          
        </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
      
  );
}