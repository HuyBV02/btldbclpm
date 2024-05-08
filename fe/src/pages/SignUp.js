import React, { useState, useEffect, useRef } from "react";
import { NavLink, json } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";

const SignUp = () => {
    const [cccd, setCccd] = useState("");
    const [soThe, setSoThe] = useState("");
    const [maPin, setMaPin] = useState("");
    const [soDienThoai, setSoDienThoai] = useState("");
    const [errors, setErrors] = useState({});
    const [errorsCccd, setErrorsCccd] = useState("");
    const [errorsSothe, setErrorsSothe] = useState("");
    const [errorsMapin, setErrorsMapin] = useState("");
    const [isCccd, setIsCccd] = useState(false);
    const [isSothe, setIsSothe] = useState(false);
    const [isMapin, setIsMapin] = useState(false);
    const [isSdt, setIsSdt] = useState(false);
    const [errorsSdt, setErrorsSdt] = useState([]);

    const firstInputRef = useRef(null);

    // Sử dụng useEffect để đặt focus vào input đầu tiên khi component được tải
    useEffect(() => {
        if (firstInputRef.current) {
            firstInputRef.current.focus();
        }
    }, []);

    const handleChangeCccd = (e) => {
        let value = e.target.value;
        // Loại bỏ tất cả các ký tự không phải số
        value = value.replace(/\D/g, "");
        // Giới hạn chiều dài của giá trị nhập vào là 12 ký tự
        value = value.slice(0, 12);
        if (value.length !== 12) {
            setErrorsCccd("CCCD phải có đủ 12 số");
            setCccd(false);
        } else {
            // Nếu có đủ 12 số, xóa thông báo lỗi
            setErrorsCccd("");
            setIsCccd(true);
        }
        if (value.length == 12) setIsCccd(true);
        setCccd(value);
    };
    const handleChangeSothe = (e) => {
        let value = e.target.value;
        // Kiểm tra nếu giá trị nhập vào không phải số thì không cập nhật state
        value = value.replace(/\D/g, "");
        value = value.slice(0, 12);
        if (value.length !== 12) {
            setErrorsSothe("Số thẻ phải có đủ 12 số");
            setIsSothe(false);
        } else {
            // Nếu có đủ 12 số, xóa thông báo lỗi
            setErrorsSothe("");
            setIsSothe(true);
        }
        if (value.length == 12) setIsSothe(true);
        setSoThe(value);
    };
    const handleChangeMapin = (e) => {
        let value = e.target.value;
        // Kiểm tra nếu giá trị nhập vào không phải số thì không cập nhật state
        value = value.replace(/\D/g, "");
        value = value.slice(0, 4);
        if (value.length !== 4) {
            setErrorsMapin("Mã pin có 4 chữ số");
            setIsMapin(false);
        } else {
            setErrorsMapin("");
            setIsMapin(true);
        }
        if (value.length == 4) setIsMapin(true);
        setMaPin(value);
    };
    const handleChangeSdt = (e) => {
        let value = e.target.value;
        // Loại bỏ tất cả các ký tự không phải số
        value = value.replace(/\D/g, "");
        // Giới hạn chiều dài của giá trị nhập vào là 15 ký tự
        value = value.slice(0, 10);

        // Kiểm tra xem giá trị nhập vào có số 0 ở đầu không
        let errorMes = [];
        if (value.charAt(0) !== "0") {
            // setErrorsSdt("Số điện thoại phải chưa chính xác");
            setIsSdt(false);
            errorMes.push("Số điện thoại phải chưa chính xác . ");
        } else if (value.length > 10) {
            setIsSdt(false);
            errorMes.push("Số điện thoại phải có 10 số");
        }
        if (value.charAt(0) == "0" && value.length == 10) {
            setIsSdt(true);
        }
        console.log(isCccd);
        setErrorsSdt(errorMes);
        setSoDienThoai(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isCccd && isMapin && isSdt && isSothe) {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods":
                        "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                },
            };
            try {
                // Send a POST request to your backend API endpoint with the form data
                const response = await axios.post(
                    "http://localhost:8080/api/saving/register",
                    {
                        identityCardNumber: cccd,
                        accountNumber: soThe,
                        pin: maPin,
                        phoneNumber: soDienThoai,
                    },
                    config
                );

                console.log("Response from backend:", response.data);
                if (response.data.message === "Success") {
                    window.location.href = "/verify";
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div>
            <Helmet>
                <title>Đăng ký</title>
            </Helmet>
            <div
                className="relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover relative items-center"
                style={{
                    backgroundImage:
                        "url(https://lawnet.vn/uploads/image/2023/09/23/041647320.jpeg)",
                }}
            >
                <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl z-10">
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl font-bold text-gray-900">
                            ĐĂNG KÝ E-BANKING
                        </h2>
                    </div>

                    <div className="flex items-center justify-center space-x-2">
                        <span className="h-px w-16 bg-gray-300"></span>
                        <span className="h-px w-16 bg-gray-300"></span>
                    </div>
                    <form
                        className="mt-8 space-y-6"
                        onSubmit={handleSubmit}
                        method="POST"
                    >
                        <input type="hidden" name="remember" value="true" />
                        <div className="relative">
                            <div className="absolute right-0 mt-4"></div>
                            <label className="text-left text-sm font-bold text-gray-700 tracking-wide">
                                CCCD
                            </label>
                            <input
                                ref={firstInputRef}
                                className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                                type="text"
                                placeholder=""
                                value={cccd}
                                onChange={handleChangeCccd}
                            />
                            <p className="error-messagess"> {errorsCccd}</p>
                        </div>
                        <div className="mt-8 content-center">
                            <label className="text-left text-sm font-bold text-gray-700 tracking-wide">
                                Số thẻ
                            </label>
                            <input
                                className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                                type="text"
                                placeholder=""
                                value={soThe}
                                onChange={handleChangeSothe}
                            />
                            <p className="error-messagess"> {errorsSothe}</p>
                        </div>

                        <div className="mt-8 content-center">
                            <label className="text-left text-sm font-bold text-gray-700 tracking-wide">
                                Mã PIN
                            </label>
                            <input
                                className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                                type="password"
                                placeholder=""
                                value={maPin}
                                onChange={handleChangeMapin}
                            />
                            <p className="error-messagess"> {errorsMapin}</p>
                        </div>

                        <div className="mt-8 content-center">
                            <label className="text-left text-sm font-bold text-gray-700 tracking-wide">
                                Số điện thoại
                            </label>
                            <input
                                className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                                type="text"
                                placeholder=""
                                value={soDienThoai}
                                onChange={handleChangeSdt}
                            />
                            <p className="error-messagess"> {errorsSdt}</p>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full mt-5 flex justify-center bg-indigo-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg cursor-pointer transition ease-in duration-300"
                            >
                                Đăng ký
                            </button>
                        </div>
                        <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
                            <span></span>
                            <NavLink
                                to="/login"
                                className="text-indigo-500 hover:text-indigo-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
                            >
                                Đã có tài khoản
                            </NavLink>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
