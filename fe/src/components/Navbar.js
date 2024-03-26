import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({handleLogout}) => {
    return (
        <div>
            <nav className="bg-white border-b border-gray-300">
                <div className="flex justify-between items-center px-9">
                    <div className="ml-1">
                        <img
                            src="https://www.emprenderconactitud.com/img/POC%20WCS%20(1).png"
                            alt="logo"
                            className="h-20 w-28"
                        />
                    </div>

                    <div className="space-x-4">
                        <button className="flex justify-between gap-5" onClick={handleLogout}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                                height="30px"
                            >
                                <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
                            </svg>
                            {/* <h1>Bui Van Huy</h1> */}
                        </button>
                        
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
