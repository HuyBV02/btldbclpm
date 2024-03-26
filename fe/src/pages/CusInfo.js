import React from "react";

const CusInfo = () => {
    return (
        <div>
            <div className="antialiased">
                <div className="container mx-auto my-60">
                    <div>
                        <div className="bg-white relative shadow rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto">
                            <div className="flex justify-center">
                                <img
                                    src="https://avatars0.githubusercontent.com/u/35900628?v=4"
                                    alt=""
                                    className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"
                                />
                            </div>

                            <div className="mt-16">
                                <h1 className="font-bold text-center text-3xl text-gray-900">
                                    Bui Van Huy
                                </h1>
                                {/* <p className="text-center text-sm text-gray-400 font-medium">
                                    UI Components Factory
                                </p> */}
                                <p>
                                    <span></span>
                                </p>

                                <div className="flex justify-between items-center my-5 px-6">
                                    <div className="text-gray-500  rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">
                                        buihuyml@gmail.com
                                    </div>
                                    <div className="text-gray-500  rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">
                                        09586274678
                                    </div>
                                </div>

                                <div className="my-5 px-6">
                                    <div
                                        href="#"
                                        className="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white"
                                    >
                                        Mở sổ tiết kiệm{" "}
                                    </div>
                                </div>

                                <div className="w-full">
                                    <h3 className="font-medium text-gray-900 text-left px-6">
                                        Thông tin
                                    </h3>

                                    <div className="w-2/3 mx-auto">
                                        <div className="bg-white shadow-md rounded my-6">
                                            <table className="text-left w-full border-collapse">
                                                {/* <!--Border collapse doesn't work on this site yet but it's available in newer tailwind versions --> */}
                                                <thead>
                                                    <tr>
                                                        <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                                                            Mã sổ
                                                        </th>
                                                        <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                                                            
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="hover:bg-grey-lighter">
                                                        <td className="py-4 px-6 border-b border-grey-light">
                                                            so-1
                                                        </td>
                                                        <td className="py-4 px-6 border-b border-grey-light">
                                                            <a
                                                                href="#"
                                                                className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-green hover:bg-green-dark"
                                                            >
                                                               Rút sổ
                                                            </a>
                                                            <a
                                                                href="#"
                                                                className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-blue hover:bg-blue-dark"
                                                            >
                                                                Tính lãi
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr className="hover:bg-grey-lighter">
                                                        <td className="py-4 px-6 border-b border-grey-light">
                                                            so-1
                                                        </td>
                                                        <td className="py-4 px-6 border-b border-grey-light">
                                                            <a
                                                                href="#"
                                                                className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-green hover:bg-green-dark"
                                                            >
                                                               Rút sổ
                                                            </a>
                                                            <a
                                                                href="#"
                                                                className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-blue hover:bg-blue-dark"
                                                            >
                                                                Tính lãi
                                                            </a>
                                                        </td>
                                                    </tr><tr className="hover:bg-grey-lighter">
                                                        <td className="py-4 px-6 border-b border-grey-light">
                                                            so-1
                                                        </td>
                                                        <td className="py-4 px-6 border-b border-grey-light">
                                                            <a
                                                                href="#"
                                                                className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-green hover:bg-green-dark"
                                                            >
                                                               Rút sổ
                                                            </a>
                                                            <a
                                                                href="#"
                                                                className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-blue hover:bg-blue-dark"
                                                            >
                                                                Tính lãi
                                                            </a>
                                                        </td>
                                                    </tr><tr className="hover:bg-grey-lighter">
                                                        <td className="py-4 px-6 border-b border-grey-light">
                                                            so-1
                                                        </td>
                                                        <td className="py-4 px-6 border-b border-grey-light">
                                                            <a
                                                                href="#"
                                                                className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-green hover:bg-green-dark"
                                                            >
                                                               Rút sổ
                                                            </a>
                                                            <a
                                                                href="#"
                                                                className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-blue hover:bg-blue-dark"
                                                            >
                                                                Tính lãi
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CusInfo;
