import React from "react";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet";
import homepage from "../assets/img/homepage.png";

const Home = () => {
    const checkLogin = () => {
        console.log("check");
        if (
            localStorage.getItem("isLogin") == undefined ||
            localStorage.getItem("isLogin") == "false"
        ) {
            window.location.href = "/login";
        }
    };

    const imageStyle = {
        width: "1200px", // Độ rộng mong muốn
        height: "600px", // Chiều cao tự động điều chỉnh để giữ tỷ lệ khung hình
    };

    return (
        <div>
            <Helmet>
                <title>Trang chủ</title>
                <meta name="description" content="Home" />
            </Helmet>
            {/* <Navbar/> */}

            <div className="flex items-center justify-center ml-[70px] mt-12">
                <img src={homepage} alt={"logo"} style={imageStyle} />
            </div>
        </div>
    );
};

export default Home;
