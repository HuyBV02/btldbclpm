import React from "react";
import Navbar from "../components/Navbar";

const Home = () => {
    const checkLogin = () => {
      console.log("check");
        if (localStorage.getItem("isLogin") == undefined || localStorage.getItem("isLogin") == "false") {
            window.location.href = "/login";
        }
    };
    return (
        <div>
            {/* <Navbar/> */}
            Home
        </div>
    );
};

export default Home;
