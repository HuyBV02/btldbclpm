import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
// import { Navigate } from "react-router-dom";
import TinhLai from "./TinhLai";
import { Helmet } from "react-helmet";

const ListSavingBook = ({ currentBookChoice, setCurrentBookChoice }) => {
    const [savingBook, setSavingBook] = useState();
    // const [oneSavingBook, setOneSavingBook] = useState();
    const [isBookChoice, setIsBookChoice] = useState(false);

    const idCustomer = localStorage.getItem("idCustomer");
    const fullName = localStorage.getItem("nameCustomer");

    console.log(idCustomer);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/saving/customers/passbooks`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((response) => setSavingBook(response.data.data));
    }, []);

    console.log(savingBook);

    // useEffect(() => {}, []);
    const handleView = (item, e) => {
        e.preventDefault();
        setCurrentBookChoice(item);
        setIsBookChoice(true);
    };

    console.log(currentBookChoice);

    return (
        <div>
            <Helmet>
                <title>Sổ tiết kiệm</title>
            </Helmet>
            <form id="formAction" method="" action="">
                <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
                    <div class="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12">
                        <div class="flex justify-between">
                            <div class="inline-flex border rounded w-7/12 px-2 lg:px-6 h-12 bg-transparent">
                                <div class="flex flex-wrap items-stretch w-full h-full mb-6 relative">
                                    <div class="flex">
                                        <span class="flex items-center leading-normal bg-transparent rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-sm">
                                            <svg
                                                width="18"
                                                height="18"
                                                class="w-4 lg:w-auto"
                                                viewBox="0 0 18 18"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z"
                                                    stroke="#455A64"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                                <path
                                                    d="M16.9993 16.9993L13.1328 13.1328"
                                                    stroke="#455A64"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                            </svg>
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        class="flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px flex-1 border border-none border-l-0 rounded rounded-l-none px-3 relative focus:outline-none text-xxs lg:text-xs lg:text-base text-gray-500 font-thin"
                                        placeholder="Search"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
                        <table class="min-w-full">
                            <thead>
                                <tr>
                                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                                        ID
                                    </th>
                                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                                        Họ tên
                                    </th>
                                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                                        Số dư
                                    </th>
                                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                                        Ngày tạo
                                    </th>

                                    <th class="px-6 py-3 border-b-2 border-gray-300"></th>
                                </tr>
                            </thead>
                            <tbody class="bg-white">
                                {savingBook?.length > 0 ? (
                                    savingBook?.map((item) => {
                                        return (
                                            <tr>
                                                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                                    <div class="flex items-center">
                                                        <div>
                                                            <div class="text-sm leading-5 text-gray-800">
                                                                #{item.id}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                                    <div class="text-sm leading-5 text-blue-900">
                                                        {fullName}
                                                    </div>
                                                </td>
                                                <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                                                    {item?.amount}
                                                </td>
                                                <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                                                    {moment
                                                        .utc(item.createdAt)
                                                        .utcOffset(7)
                                                        .format(
                                                            "YYYY-MM-DD HH:mm:ss"
                                                        )}

                                                    {/* {item.createdAt} */}
                                                </td>

                                                <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                                                    <button
                                                        data-id={item.id}
                                                        onClick={(e) =>
                                                            handleView(item, e)
                                                        }
                                                        class="px-5 py-2 border-blue-500 border text-black rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                                                    >
                                                        View Details
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-center text-red-500"
                                        >
                                            <a href="/mo-so">
                                                Không có dữ liệu. Vui lòng mở
                                                sổ.
                                            </a>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </form>

            {isBookChoice ? (
                <div
                    id="static-modal"
                    data-modal-backdrop="static"
                    tabindex="-1"
                    aria-hidden="true"
                    className=" flex absolute top-0 left-0 right-0 bottom-0 z-50 justify-center items-center"
                >
                    <div class="relative p-8 w-3/4">
                        <div class="relative bg-white rounded-lg shadow">
                            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                                <h3 class="text-xl font-semibold text-gray-900">
                                    Chi tiết sổ tiết kiệm
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => setIsBookChoice(false)}
                                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    data-modal-hide="static-modal"
                                >
                                    <svg
                                        class="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="pb-5 px-5">
                                <TinhLai
                                    currentBookChoice={currentBookChoice}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default ListSavingBook;
