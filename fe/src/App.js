import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import LoginStaff from "./pages/LoginStaff";
import CusInfo from "./pages/CusInfo";
import CusList from "./pages/CusList";
import Navbar from "./components/Navbar";
import VerifyCode from "./pages/VerifyCode";
import SideBar from "./components/SideBar";
import TinhLai1 from "./pages/tinhLai1/TinhLai1";
import { useEffect, useState } from "react";
import SignUp from "./pages/SignUp";
import ListSavingBook from "./pages/ListSavingBook";
import SavingBookDetail from "./pages/SavingBookDetail";
import OpenSavingsBook from "./pages/openSavingBook/OpenSavingBook";
import axios from "axios";
import RutSo from "./pages/RutSo";

function App() {
    const [userRes, setUserRes] = useState();
    const [userData, setUserData] = useState();
    const [isLogin, setIsLogin] = useState(
        localStorage.getItem("isLogin") == "true"
    );

    // const [idCustomer, setIdCustomer] = useState();
    // const [nameCustomer, setNameCustomer] = useState();

    const accessToken = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Custom-Header": "Custom-Value",
        },
    };

    axios
        .get("http://localhost:8080/api/saving/customer", config)
        .then((response) => {
            localStorage.setItem("idCustomer", response.data.data.id);
            localStorage.setItem("nameCustomer", response.data.data.fullName);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });

    // setIdCustomer(localStorage.getItem("idCustomer"));
    // setNameCustomer(localStorage.getItem("nameCustomer"));

    // console.log(customer);
    // console.log(isLogin);

    const handleLogout = () => {
        localStorage.setItem("isLogin", false);
        localStorage.setItem("token", null);
        localStorage.setItem("idCustomer", null);
        localStorage.setItem("nameCustomer", null);
        window.location.href = "/login";
    };

    useEffect(() => {
        setIsLogin(localStorage.getItem("isLogin"));
    }, [localStorage.getItem("isLogin")]);

    return (
        <div className="App">
            <Navbar handleLogout={handleLogout} />
            <Routes>
                <Route
                    path="/login"
                    element={
                        <LoginStaff userData={userData} isLogin={isLogin} />
                    }
                />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/verify" element={<VerifyCode />} />
            </Routes>

            <div className="flex justify-start">
                <div className="w-[20%]">
                    <SideBar />
                </div>
                <div className="w-[70%]">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                isLogin ? <Home /> : <Navigate to="/login" />
                            }
                        />
                        <Route
                            path="/list-saving-book"
                            element={
                                isLogin ? (
                                    <ListSavingBook />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                         <Route
                            path="/list-saving-book/rut-so"
                            element={
                                isLogin ? (
                                    <RutSo />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route
                            path="/passbooks/:id"
                            element={
                                isLogin ? (
                                    <SavingBookDetail />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />

                        <Route
                            path="/tinh-lai"
                            element={
                                isLogin ? (
                                    <TinhLai1 />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route
                            path="/mo-so"
                            element={
                                isLogin ? (
                                    <OpenSavingsBook />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        {/* <Route path="/*" element={isLogin ? <Home /> : <Navigate to="/login"/>} /> */}
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
