import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";

const LoginStaff = ({ isLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const setIsLogin = () => {
        localStorage.setItem("isLogin", true);
    };

    const firstInputRef = useRef(null);

    // Sử dụng useEffect để đặt focus vào input đầu tiên khi component được tải
    useEffect(() => {
        if (firstInputRef.current) {
            firstInputRef.current.focus();
        }
    }, []);

    console.log({ email, password });

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
            // Gửi yêu cầu đăng nhập đến API
            const response = await axios.post(
                "http://localhost:8080/api/saving/login",
                {
                    username: email,
                    password,
                },
                config
            );

            console.log(response);
            setIsLogin();
            // Lưu trữ token vào localStorage
            localStorage.setItem("token", response.data.data.token);
            // localStorage.setItem("isLogin", true);

            window.location.href = "/";
        } catch (error) {
            console.error("Đăng nhập không thành công", error);
        }
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
            case "email":
                newErrors.email = !value
                    ? "Vui lòng nhập tên đăng nhập!"
                    : validateUsername(value);
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

    return (
        <>
            <Helmet>
                <title>Đăng nhập</title>
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
                            Xin chào
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Vui lòng đăng nhập
                        </p>
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
                                placeholder="admin"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={(e) =>
                                    handleBlur("email", e.target.value)
                                }
                                // value="mail@gmail.com"
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
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={(e) =>
                                    handleBlur("password", e.target.value)
                                }
                                // value="*****|"
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full mt-5 flex justify-center bg-indigo-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg cursor-pointer transition ease-in duration-300"
                            >
                                Đăng nhập
                            </button>
                        </div>
                        <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
                            <span></span>
                            <NavLink
                                to="/signup"
                                className="text-indigo-500 hover:text-indigo-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
                            >
                                Đăng ký sử dụng E-Banking
                            </NavLink>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginStaff;
