import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";

const TinhLai = ({ oneSavingBook, currentBookChoice }) => {
    const firstInputRef = useRef(null);

    // Sử dụng useEffect để đặt focus vào input đầu tiên khi component được tải
    useEffect(() => {
        if (firstInputRef.current) {
            firstInputRef.current.focus();
        }
    }, []);

    // console.log(currentBookChoice.id)

    return (
        <div>
            <div className=" mt-5 mx-2">
                <div className="lg:flex gap-4 items-stretch">
                    <div className="bg-white md:p-2 p-6 rounded-lg border border-gray-200 mb-4 lg:mb-0 shadow-md lg:w-[35%]">
                        <div className="flex justify-center items-center space-x-5 h-full">
                            <div>
                                <p>Số dư</p>
                                <h2 className="text-4xl font-bold text-gray-600">
                                    {currentBookChoice.amount}
                                </h2>
                            </div>
                            <img
                                src="https://www.emprenderconactitud.com/img/Wallet.png"
                                alt="wallet"
                                className="h-24 md:h-20 w-38"
                            />
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg xs:mb-4 max-w-full shadow-md lg:w-[65%]">
                        <div className="flex flex-wrap justify-between h-full">
                            <NavLink
                                to={{
                                    pathname: "rut-so",
                                    state: { bookCode: currentBookChoice.id },
                                }}
                                className="flex-1 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-lg flex flex-col items-center justify-center p-4 space-y-2 border border-gray-200 m-2"
                            >
                                <i className="fas fa-hand-holding-usd text-white text-4xl"></i>
                                <p className="text-white">Rút sổ</p>
                            </NavLink>

                            {/* <div className="flex-1 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-lg flex flex-col items-center justify-center p-4 space-y-2 border border-gray-200 m-2">
                                <i className="fas fa-exchange-alt text-white text-4xl"></i>
                                <p className="text-white">Transferir</p>
                            </div>

                            <div className="flex-1 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-lg flex flex-col items-center justify-center p-4 space-y-2 border border-gray-200 m-2">
                                <i className="fas fa-qrcode text-white text-4xl"></i>
                                <p className="text-white">Canjear</p>
                            </div> */}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-md my-4">
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left border-b-2 w-full">
                                    <h2 className="text-ml font-bold text-gray-600">
                                        Chi tiết
                                    </h2>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b w-full flex">
                                <td className="px-4 py-2 text-left align-top w-1/2">
                                    <div>
                                        <h2>Ngày tạo</h2>
                                        {/* <p>24/07/2023</p> */}
                                    </div>
                                </td>
                                <td className="px-4 py-2 text-right text-cyan-500 w-1/2">
                                    <p>
                                        <span>
                                            {moment
                                                .utc(
                                                    currentBookChoice.createdAt
                                                )
                                                .utcOffset(7)
                                                .format("YYYY-MM-DD HH:mm:ss")}
                                        </span>
                                    </p>
                                </td>
                            </tr>
                            <tr className="border-b w-full flex">
                                <td className="px-4 py-2 text-left align-top w-1/2">
                                    <div>
                                        <h2>Kì hạn</h2>
                                        {/* <p>24/06/2023</p> */}
                                    </div>
                                </td>
                                <td className="px-4 py-2 text-right text-cyan-500 w-1/2">
                                    <p>
                                        <span>{currentBookChoice.term}</span>
                                    </p>
                                </td>
                            </tr>
                            <tr className="border-b w-full flex">
                                <td className="px-4 py-2 text-left align-top w-1/2">
                                    <div>
                                        <h2>Lãi suất</h2>
                                        {/* <p>24/06/2023</p> */}
                                    </div>
                                </td>
                                <td className="px-4 py-2 text-right text-cyan-500 w-1/2">
                                    <p>
                                        <span>
                                            {currentBookChoice.interestRate}%
                                        </span>
                                    </p>
                                </td>
                            </tr>
                            <tr className="border-b w-full flex">
                                <td className="px-4 py-2 text-left align-top w-1/2">
                                    <div>
                                        <h2>Phương thức thanh toán</h2>
                                        {/* <p>02/05/2023</p> */}
                                    </div>
                                </td>
                                <td className="px-4 py-2 text-right text-cyan-500 w-1/2">
                                    <p>
                                        <span>
                                            {currentBookChoice.paymentMethod}
                                        </span>
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TinhLai;
