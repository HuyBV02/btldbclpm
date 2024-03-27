import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

function RutSo({ currentBookChoice }) {
    const [isAll, setIsAll] = useState(true); // Mặc định rút toàn bộ (true)
    const [amount, setAmount] = useState("");
    const [createdAt, setCreatedAt] = useState(new Date().toISOString());
    const [showModal, setShowModal] = useState(false);
    const [tokenVerify, setTokenVerify] = useState();
    const [code, setCode] = useState();

    // console.log(currentBookChoice.id)

    const handleSubmit = async (event) => {
        event.preventDefault();

        const adjustedCreatedAt = new Date(createdAt);
        adjustedCreatedAt.setMinutes(adjustedCreatedAt.getMinutes() + 420);

        let formData = {
            isAll,
            createdAt: adjustedCreatedAt.toISOString(),
        };

        if (!isAll) {
            formData = {
                ...formData,
                amount,
            };
        }

        console.log(formData);

        try {
            const response = await axios.post(
                `http://localhost:8080/api/saving/customers/${localStorage.getItem(
                    "idCustomer"
                )}/passbooks/${currentBookChoice.id}/withdraw`,
                formData
            );
            if (response.data.message === "Success") {
                setShowModal(true);
                setTokenVerify(response.data.data.shortTokenRecip);
            }
            console.log(response.data);
            // Xử lý response ở đây (nếu cần)
        } catch (error) {
            console.error("Error:", error);
            // Xử lý lỗi ở đây (nếu cần)
        }
    };

    console.log(tokenVerify);

    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowModal(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // const accessToken = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: `Bearer ${tokenVerify}`,
            "Custom-Header": "Custom-Value",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
    };

    console.log(code);
    const handleSubmitCode = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `http://localhost:8080/api/saving/customers/${localStorage.getItem(
                    "idCustomer"
                )}/passbooks/${currentBookChoice.id}/verify`,
                {"code":code} ,
                config
            );
            if (response.data.message === "Success") {
            }
            console.log("Response:", response.data);
            // Xử lý response ở đây (nếu cần)
        } catch (error) {
            console.error("Error:", error);
            // Xử lý lỗi ở đây (nếu cần)
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md mt-10">
            <h2 className="text-center text-xl font-semibold mb-4">Rút tiền</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="inline-flex items-center">
                        <input
                            type="radio"
                            value="full"
                            checked={isAll}
                            onChange={() => setIsAll(true)}
                            className="form-radio h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2">Rut toàn bộ</span>
                    </label>
                </div>
                <div className="mb-4">
                    <label className="inline-flex items-center">
                        <input
                            type="radio"
                            value="partial"
                            checked={!isAll}
                            onChange={() => setIsAll(false)}
                            className="form-radio h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2">Rút 1 phần</span>
                    </label>
                </div>
                {!isAll && (
                    <div className="mb-4">
                        <label className="block mb-2">
                            Số tiền:
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                                className="block w-full mt-1 p-2 border rounded-md"
                            />
                        </label>
                    </div>
                )}
                <div className="mb-4">
                    <label className="block mb-2">
                        Thời gian:
                        <input
                            type="datetime-local"
                            value={createdAt.slice(0, 16)}
                            onChange={(e) => setCreatedAt(e.target.value)}
                            required
                            className="block w-full mt-1 p-2 border rounded-md"
                        />
                    </label>
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Submit
                    </button>
                </div>
            </form>
            {showModal && (
                <div
                    ref={modalRef}
                    className="fixed inset-0 flex items-center justify-center z-50"
                    tabindex="-1"
                >
                    {/* <div className="absolute inset-0 "></div> */}
                    <div className="bg-white p-6 rounded-md shadow-md">
                        <h2 className="text-xl font-semibold mb-4">
                            Nhập mã OTP
                        </h2>
                        <form onSubmit={handleSubmitCode}>
                            <input
                                type="number"
                                onChange={(e) => setCode(e.target.value)}
                                required
                            />
                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                >
                                    Đóng
                                </button>
                                <button
                                    type="submit"
                                    className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mr-2"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RutSo;
