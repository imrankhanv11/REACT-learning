import React from "react";
import { ToastContainer } from "react-toastify";

const Home : React.FC = () =>{
    return(
        <div>
            Home
            
            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    )
}

export default React.memo(Home);