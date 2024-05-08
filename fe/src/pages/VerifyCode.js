import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";

const VerifyCode = ({ userData, isLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const [cccd, setCccd] = useState("");
    const [errors, setErrors] = useState("true");
    const [errorsEmail, setErrorsEmail] = useState([]);
    const [errorsPassword, setErrorsPassword] = useState([]);
    const [errorsMaOtp, setErrorsMaOtp] = useState("");
    const [errorsCccd, setErrorsCccd] = useState("");
    const [isUsert, setIsUser] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const [isMaOtp, setIsMaOtp] = useState(false);
    const [isCccd, setIsCccd] = useState(false);
    const firstInputRef = useRef(null);

    // Sử dụng useEffect để đặt focus vào input đầu tiên khi component được tải
    useEffect(() => {
        if (firstInputRef.current) {
            firstInputRef.current.focus();
        }
    }, []);

    console.log({ email, password, code, cccd });
    const handleChangeEmail = (e) => {
        let value = e.target.value;
        value = value.replace(/[^a-zA-Z0-9]/g, "");
        value = value.slice(0, 20);
        if (value.length <= 6) {
            setErrorsEmail("Uesname phải có tối thiểu 6 kí tự");
            setIsUser(false);
        } else {
            setErrorsEmail("");
        }
        if (value.length >= 6) setIsUser(true);
        setEmail(value);
    };
    const handleChangePassword = (e) => {
        let value = e.target.value;
        value = value.replace(/[^a-zA-Z0-9]/g, "");
        value = value.slice(0, 20);
        // Kiểm tra độ dài tối thiểu là 6 ký tự
        const isLengthValid = value.length >= 6;
        // Kiểm tra có ít nhất một ký tự in hoa
        const hasUppercase = /[A-Z]/.test(value);
        // Kiểm tra có ít nhất một ký tự số
        const hasNumber = /[0-9]/.test(value);

        // Nếu mật khẩu không đáp ứng yêu cầu
        if (!isLengthValid || !hasUppercase || !hasNumber) {
            // Tạo một mảng để chứa các thông báo lỗi
            let errorMessages = [];

            // Kiểm tra từng yêu cầu và thêm thông báo lỗi tương ứng vào mảng
            if (!isLengthValid) {
                setIsPassword(false);
                errorMessages.push("Mật khẩu phải chứa ít nhất 6 ký tự");
            }
            if (!hasUppercase) {
                setIsPassword(false);
                errorMessages.push("Mật khẩu phải chứa ít nhất 1 ký tự in hoa");
            }
            if (!hasNumber) {
                setIsPassword(false);
                errorMessages.push("Mật khẩu phải chứa ít nhất 1 ký tự số");
            }

            // Cập nhật state errors với mảng thông báo lỗi
            setErrorsPassword(errorMessages.join(", "));
        } else {
            // Nếu mật khẩu đáp ứng yêu cầu, xóa thông báo lỗi
            setErrorsPassword("");
        }
        if (isLengthValid && hasUppercase && hasNumber) {
            setIsPassword(true);
        }
        setPassword(value);
    };
    const handleChangeMaOtp = (e) => {
        let value = e.target.value;
        value = value.replace(/\D/g, "");
        value = value.slice(0, 6);
        if (value.length !== 6) {
            setErrorsMaOtp("Mã OTP có đủ 6 số");
            setIsMaOtp(false);
        } else {
            setErrorsMaOtp("");
        }
        if (value.length == 6) {
            setIsMaOtp(true);
        }
        setCode(value);
    };
    const handleChangeCccd = (e) => {
        let value = e.target.value;
        // Loại bỏ tất cả các ký tự không phải số
        value = value.replace(/\D/g, "");
        // Giới hạn chiều dài của giá trị nhập vào là 12 ký tự
        value = value.slice(0, 12);
        if (value.length !== 12) {
            setErrorsCccd("CCCD phải có đủ 12 số");
            setIsCccd(false);
        } else {
            // Nếu có đủ 12 số, xóa thông báo lỗi
            setErrorsCccd("");
        }
        if (value.length == 12) {
            setIsCccd(true);
        }
        setCccd(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isCccd && isMaOtp && isPassword && isUsert) {
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
                    "http://localhost:8080/api/saving/verify",
                    {
                        username: email,
                        password,
                        code,
                        identityCardNumber: cccd,
                    },
                    config
                );

                console.log("Response from backend:", response.data);
                if (response.data.message === "Success") {
                    window.location.href = "/login";
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <>
            <Helmet>
                <title>Xác thực</title>
            </Helmet>
            <div
                className="relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover relative items-center"
                style={{
                    backgroundImage:
                        "url(https://images.unsplash.com/photo-1525302220185-c387a117886e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)",
                }}
            >
                <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl z-10">
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl font-bold text-gray-900">
                            Xác thực
                        </h2>
                        <p className="mt-2 text-sm text-gray-600"></p>
                    </div>

                    <div className="flex items-center justify-center space-x-2">
                        <span className="h-px w-16 bg-gray-300"></span>
                        {/* <span className="text-gray-500 font-normal">OR</span> */}
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
                                Username
                            </label>
                            <input
                                ref={firstInputRef}
                                className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                                type="text"
                                placeholder=""
                                value={email}
                                onChange={handleChangeEmail}
                            />
                            <p className="error-messagess"> {errorsEmail}</p>
                        </div>
                        <div className="mt-8 content-center">
                            <label className="text-left text-sm font-bold text-gray-700 tracking-wide">
                                Password
                            </label>
                            <input
                                className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                                type="password"
                                placeholder=""
                                value={password}
                                onChange={handleChangePassword}
                            />
                            <p className="error-messagess"> {errorsPassword}</p>
                        </div>

                        <div className="mt-8 content-center">
                            <label className="text-left text-sm font-bold text-gray-700 tracking-wide">
                                Mã OTP
                            </label>
                            <input
                                className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                                type="text"
                                placeholder=""
                                value={code}
                                onChange={handleChangeMaOtp}
                            />
                            <p className="error-messagess"> {errorsMaOtp}</p>
                        </div>

                        <div className="mt-8 content-center">
                            <label className="text-left text-sm font-bold text-gray-700 tracking-wide">
                                CCCD
                            </label>
                            <input
                                className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                                type="text"
                                placeholder=""
                                value={cccd}
                                onChange={handleChangeCccd}
                            />
                            <p className="error-messagess"> {errorsCccd}</p>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full mt-5 flex justify-center bg-indigo-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg cursor-pointer transition ease-in duration-300"
                            >
                                Xác thực
                            </button>
                        </div>
                        {/* <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
                        <span></span>
                        <NavLink
                            to="/signup"
                            className="text-indigo-500 hover:text-indigo-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
                        >
                            Đăng ký sử dụng E-Banking
                        </NavLink>
                    </p> */}
                    </form>
                </div>
            </div>
        </>
    );
};

export default VerifyCode;
