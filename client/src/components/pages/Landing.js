import React from "react";
import mainLogo from "../../img/logo-landing.png";
import SignUp from "../ui/SignUp";
import Login from "../ui/Login";

export default function Landing() {
   return (
      <div className="background-image">
         <div className="container-fluid">
            <div className="row">
               <div className="offset-1 pt-5 d-none d-sm-inline">
                  <img
                     className="d-inline align-top"
                     src={mainLogo}
                     alt="logo"
                  />
                  <h1 className="d-inline pl-3 text-white">
                     <span className="align-middle">White Bear</span>
                  </h1>
               </div>
               <div className="offset-1 pt-5 d-sm-none">
                  <img
                     className="d-inline"
                     src={mainLogo}
                     width="100px"
                     alt="smaller-logo"
                  />
                  <h4 className="d-inline-block pl-3 text-white">White Bear</h4>
               </div>
            </div>
            <div className="row ">
               <SignUp />
               <Login />
            </div>
         </div>
      </div>
   );
}
