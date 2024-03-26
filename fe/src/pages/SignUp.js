import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
    const [cccd, setCccd] = useState("");
    const [soThe, setSoThe] = useState("");
    const [maPin, setMaPin] = useState("");
    const [soDienThoai, setSoDienThoai] = useState("");
    const [errors, setErrors] = useState({});

    const validateCccd = (value) => {
        const cccdPattern = /^[0-9]{12}$/;
        return cccdPattern.test(value);
    };

    const validateSoThe = (value) => {
        const soThePattern = /^[0-9]{12}$/;
        return soThePattern.test(value);
    };

    const validateMaPin = (value) => {
        const maPinPattern = /^[0-9]{4}$/;
        return maPinPattern.test(value);
    };

    const validateSoDienThoai = (value) => {
        const soDienThoaiPattern = /^0[0-9]{9}$/;
        return soDienThoaiPattern.test(value);
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
            case "soThe":
                newErrors.soThe = !value
                    ? "Vui lòng nhập Số Thẻ!"
                    : !validateSoThe(value)
                    ? "Vui lòng nhập Số Thẻ hợp lệ!"
                    : "";
                break;
            case "maPin":
                newErrors.maPin = !value
                    ? "Vui lòng nhập Mã PIN!"
                    : !validateMaPin(value)
                    ? "Vui lòng nhập Mã PIN hợp lệ!"
                    : "";
                break;
            case "soDienThoai":
                newErrors.soDienThoai = !value
                    ? "Vui lòng nhập Số Điện Thoại!"
                    : !validateSoDienThoai(value)
                    ? "Vui lòng nhập Số Điện Thoại hợp lệ (bắt đầu bằng số 0)!"
                    : "";
                break;

            default:
                break;
        }

        setErrors(newErrors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newErrors = {};

        // Validate CCCD
        if (!cccd || !validateCccd(cccd)) {
            newErrors.cccd = "Vui lòng nhập CCCD!";
        }

        // Validate Số Thẻ
        if (!soThe || !validateSoThe(soThe)) {
            newErrors.soThe = "Vui lòng nhập Số Thẻ!";
        }

        // Validate Mã PIN
        if (!maPin || !validateMaPin(maPin)) {
            newErrors.maPin = "Vui lòng nhập Mã PIN!";
        }

        // Validate Số Điện Thoại
        if (!soDienThoai || !validateSoDienThoai(soDienThoai)) {
            newErrors.soDienThoai = "Vui lòng nhập Số Điện Thoại!";
        }

        // Set errors state
        setErrors(newErrors);

        // If there are errors, stop form submission
        if (Object.keys(newErrors).length > 0) {
            return;
        }
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
    };

    return (
        <div>
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
                            Chào mừng quý khách
                        </h2>
                        {/* <p className="mt-2 text-sm text-gray-600">
                            Vui lòng đăng nhập
                        </p> */}
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
                            <label className="text-sm font-bold text-gray-700 tracking-wide">
                                CCCD
                            </label>
                            <input
                                className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
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
                        <div className="mt-8 content-center">
                            <label className="text-sm font-bold text-gray-700 tracking-wide">
                                Số thẻ
                            </label>
                            <input
                                className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                                type="text"
                                placeholder=""
                                value={soThe}
                                onChange={(e) => setSoThe(e.target.value)}
                                onBlur={(e) =>
                                    handleBlur("soThe", e.target.value)
                                }
                            />
                            {errors.soThe && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.soThe}
                                </p>
                            )}
                        </div>

                        <div className="mt-8 content-center">
                            <label className="text-sm font-bold text-gray-700 tracking-wide">
                                Mã PIN
                            </label>
                            <input
                                className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                                type="password"
                                placeholder=""
                                value={maPin}
                                onChange={(e) => setMaPin(e.target.value)}
                                onBlur={(e) =>
                                    handleBlur("maPin", e.target.value)
                                }
                            />
                            {errors.maPin && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.maPin}
                                </p>
                            )}
                        </div>

                        <div className="mt-8 content-center">
                            <label className="text-sm font-bold text-gray-700 tracking-wide">
                                Số điện thoại
                            </label>
                            <input
                                className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                                type="text"
                                placeholder=""
                                value={soDienThoai}
                                onChange={(e) => setSoDienThoai(e.target.value)}
                                onBlur={(e) =>
                                    handleBlur("soDienThoai", e.target.value)
                                }
                            />
                            {errors.soDienThoai && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.soDienThoai}
                                </p>
                            )}
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
