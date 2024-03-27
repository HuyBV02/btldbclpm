import React, { useEffect, useRef, useState } from "react";
import axios from "axios"; // Import Axios
import "./Tinhlaii.css";
import { Helmet } from "react-helmet";

function TinhLai1() {
    const [amount, setAmount] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [term, setTerm] = useState("");
    const [selectedPackage, setSelectedPackage] = useState("");
    const [interestRates, setInterestRates] = useState({
        1: 4.5,
        2: 4.5,
        3: 4.6,
        4: 4.6,
        5: 4.6,
        6: 5.5,
        7: 5.5,
        8: 5.5,
        9: 5.5,
        10: 5.5,
        11: 5.5,
        12: 6.4,
        13: 6.4,
        15: 6.4,
        18: 6.4,
        24: 6.4,
        36: 6.4,
        37: 1.0,
    });
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [resultData, setResultData] = useState(null); // State để lưu trữ dữ liệu trả về từ API

    const handlePackageChange = (event) => {
        setSelectedPackage(event.target.value);
        console.log(event.target.value);
        setTerm(event.target.value); // Update term when selectedPackage changes
    };

    const handleDateChange = (value, setter) => {
        // Chuyển đổi ngày sang định dạng yyyy-mm-dd
        const formattedDate = new Date(value).toISOString().split("T")[0];
        setter(formattedDate);
    };

    const handleCalculate = async () => {
        console.log(amount);
        console.log(selectedPackage);
        console.log(paymentMethod);
        console.log(term);
        console.log(startDate);
        console.log(endDate);
        try {
            const response = await axios.post(
                "http://localhost:8080/api/saving/interest",
                {
                    amount,
                    interestRate: interestRates[selectedPackage],
                    paymentMethod,
                    term,
                    startDate,
                    endDate,
                }
            );

            // Lưu trữ dữ liệu trả về từ API vào state
            setResultData(response.data.data);
            console.log(response.data.data); // Log response from the API
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const firstInputRef = useRef(null);

    // Sử dụng useEffect để đặt focus vào input đầu tiên khi component được tải
    useEffect(() => {
        if (firstInputRef.current) {
            firstInputRef.current.focus();
        }
    }, []);

    return (
        <div className="Tinhlai">
            <Helmet>
                <title>Tính lãi</title>
                <meta name="description" content="Tính lãi" />
            </Helmet>
            <h1>Tính lãi</h1>
            <div className="input-group">
                <label htmlFor="amount">Số tiền gửi:</label>
                <input
                    ref={firstInputRef}
                    type="text"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <div className="input-group">
                <label htmlFor="paymentMethod">Phương thức thanh toán:</label>
                <select
                    id="paymentMethod"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                >
                    <option value="">Phương thức thanh toán </option>
                    <option value="1">Nhập gốc </option>
                    <option value="2">Lấy lãi </option>
                </select>
            </div>
            <div className="input-group">
                <label htmlFor="term">Kỳ hạn:</label>
                <select id="term" value={term} onChange={handlePackageChange}>
                    <option value="">Chọn kỳ hạn</option>
                    <option value="37">Không kỳ hạn</option>
                    <option value="1">1 tháng</option>
                    <option value="2">2 tháng</option>
                    <option value="3">3 tháng</option>
                    <option value="4">4 tháng</option>
                    <option value="5">5 tháng</option>
                    <option value="6">6 tháng</option>
                    <option value="7">7 tháng</option>
                    <option value="8">8 tháng</option>
                    <option value="9">9 tháng</option>
                    <option value="10">10 tháng</option>
                    <option value="11">11 tháng</option>
                    <option value="12">12 tháng</option>
                    <option value="13">13 tháng</option>
                    <option value="14">15 tháng</option>
                    <option value="15">18 tháng</option>
                    <option value="16">24 tháng</option>
                    <option value="17">36 tháng</option>
                </select>
            </div>
            {selectedPackage !== "non-term" && (
                <div className="input-group">
                    <label htmlFor="interestRate">Lãi suất (%/năm )</label>
                    <input
                        type="number"
                        id="interestRate"
                        value={interestRates[selectedPackage]}
                        readOnly
                    />
                </div>
            )}
            <div className="input-group">
                <label htmlFor="startDate">Ngày bắt đầu:</label>
                <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) =>
                        handleDateChange(e.target.value, setStartDate)
                    }
                />
            </div>
            <div className="input-group">
                <label htmlFor="endDate">Ngày kết thúc:</label>
                <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) =>
                        handleDateChange(e.target.value, setEndDate)
                    }
                />
            </div>
            <button onClick={handleCalculate}>Tính toán</button>
            {/* Hiển thị kết quả nếu có */}
            {resultData && (
                <div className="result">
                    <h2>Kết quả</h2>
                    <p>Số tiền: {resultData.amount}</p>
                    <p>Lãi: {resultData.interest}</p>
                    <p>Tổng cộng: {resultData.total}</p>
                </div>
            )}
        </div>
    );
}

export default TinhLai1;
