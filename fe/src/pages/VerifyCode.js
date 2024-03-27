import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";

const VerifyCode = ({ userData, isLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const [cccd, setCccd] = useState("");
    const [errors, setErrors] = useState({});

    const firstInputRef = useRef(null);

    // Sử dụng useEffect để đặt focus vào input đầu tiên khi component được tải
    useEffect(() => {
        if (firstInputRef.current) {
            firstInputRef.current.focus();
        }
    }, []);

    console.log({ email, password, code, cccd });

    const validateCccd = (value) => {
        const cccdPattern = /^[0-9]{12}$/;
        return cccdPattern.test(value);
    };

    const validateMaCode = (value) => {
        const maPinPattern = /^[0-9]{6}$/;
        return maPinPattern.test(value);
    };

    const validatePassword = (value) => {
        const minLength = 8;
        const hasUppercase = /[A-Z]/.test(value);
        const hasNumber = /[0-9]/.test(value);

        let errorMessage = "";

        if (value.length < minLength) {
            errorMessage = "Mật khẩu không hợp lệ (tối thiểu 8 kí tự)";
        } else if (!hasUppercase) {
            errorMessage = "Mật khẩu không hợp lệ (phải chứa kí tự in hoa)";
        } else if (!hasNumber) {
            errorMessage = "Mật khẩu không hợp lệ (phải chứa kí tự số)";
        }

        return errorMessage;
    };

    const validateUsername = (value) => {
        const minLength = 8;
        return value.length < minLength
            ? "Tên đăng nhập phải ít nhất 8 kí tự!"
            : "";
    };

    const handleBlur = (field, value) => {
        let newErrors = { ...errors };

        switch (field) {
            case "cccd":
                newErrors.cccd = !value
                    ? "Vui lòng nhập CCCD!"
                    : !validateCccd(value)
                    ? "Vui lòng nhập CCCD hợp lệ!"
                    : "";
                break;
            case "email":
                newErrors.email = !value
                    ? "Vui lòng nhập tên đăng nhập!"
                    : validateUsername(value);
                break;
            // case "password":
            //     newErrors.password = !value ? "Vui lòng nhập mật khẩu!" : "";
            //     break;
            case "code":
                newErrors.code = !value
                    ? "Vui lòng nhập Mã OTP!"
                    : !validateMaCode(value)
                    ? "Vui lòng nhập Mã OTP hợp lệ!"
                    : "";
                break;
            case "password":
                newErrors.password = !value
                    ? "Vui lòng nhập mật khẩu!"
                    : validatePassword(value);
                break;

            default:
                break;
        }

        setErrors(newErrors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={(e) =>
                                    handleBlur("email", e.target.value)
                                }
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email}
                                </p>
                            )}
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
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={(e) =>
                                    handleBlur("password", e.target.value)
                                }
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.password}
                                </p>
                            )}
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
                                onChange={(e) => setCode(e.target.value)}
                                onBlur={(e) =>
                                    handleBlur("code", e.target.value)
                                }
                            />
                            {errors.code && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.code}
                                </p>
                            )}
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
                                onChange={(e) => setCccd(e.target.value)}
                                onBlur={(e) =>
                                    handleBlur("cccd", e.target.value)
                                }
                            />
                            {errors.cccd && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.cccd}
                                </p>
                            )}
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
