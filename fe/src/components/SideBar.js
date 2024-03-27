import React from "react";
import { NavLink } from "react-router-dom";

const notActiveStyle = "";
const activeStyle = "";

const SideBar = () => {
    return (
        <div>
            <div className="lg:block hidden bg-white w-64 h-screen fixed rounded-none  border-solid border-r border-black">
                <div className="p-4 space-y-4">
                    {/* <NavLink
                        id="1"
                        to="dang-ki-banking"
                        // aria-label="dashboard"
                        // className=" "
                        className={({ isActive }) =>
                            isActive
                                ? "relative px-4 py-3 flex items-center space-x-4 rounded-lg text-white bg-gradient-to-r from-sky-600 to-cyan-400"
                                : "px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group"
                        }
                    >
                        <span className="">Đăng ký </span>
                    </NavLink> */}

                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? "relative px-4 py-3 flex items-center space-x-4 rounded-lg text-white bg-gradient-to-r from-sky-600 to-cyan-400"
                                : "px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group"
                        }
                    >
                        <i className="fas fa-sign-out-alt"></i>
                        <span>Trang chủ</span>
                    </NavLink>

                    <NavLink
                        to="/mo-so"
                        className={({ isActive }) =>
                            isActive
                                ? "relative px-4 py-3 flex items-center space-x-4 rounded-lg text-white bg-gradient-to-r from-sky-600 to-cyan-400"
                                : "px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group"
                        }
                    >
                        <i className="fas fa-wallet"></i>
                        <span>Mở sổ tiết kiệm</span>
                    </NavLink>
                    <NavLink
                        to="/tinh-lai"
                        className={({ isActive }) =>
                            isActive
                                ? "relative px-4 py-3 flex items-center space-x-4 rounded-lg text-white bg-gradient-to-r from-sky-600 to-cyan-400"
                                : "px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group"
                        }
                    >
                        <i className="fas fa-exchange-alt"></i>
                        <span>Tính lãi</span>
                    </NavLink>
                    <NavLink
                        to="/list-saving-book"
                        className={({ isActive }) =>
                            isActive
                                ? "relative px-4 py-3 flex items-center space-x-4 rounded-lg text-white bg-gradient-to-r from-sky-600 to-cyan-400"
                                : "px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group"
                        }
                    >
                        <i className="fas fa-user"></i>
                        <span>Sổ tiết kiệm</span>

                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
