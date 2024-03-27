import React from "react";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet";

const Home = () => {
    const checkLogin = () => {
      console.log("check");
        if (localStorage.getItem("isLogin") == undefined || localStorage.getItem("isLogin") == "false") {
            window.location.href = "/login";
        }
    };
    return (
        <div>
            <Helmet>
                <title>Trang chủ</title>
                <meta name="description" content="Home" />
            </Helmet>
            {/* <Navbar/> */}
            Home
        </div>
    );
};

export default Home;
