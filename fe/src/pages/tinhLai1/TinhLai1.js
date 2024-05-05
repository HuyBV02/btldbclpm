import React, { useState, useRef } from 'react';
import axios from 'axios'; // Import Axios
import './Tinhlaii.css';

function TinhLai1() {
    const [amount, setAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [term, setTerm] = useState('');
    const [selectedPackage, setSelectedPackage] = useState('');
    const [interestRates, setInterestRates] = useState({
        '1': 4.50,
        '2': 4.50,
        '3': 4.60,
        '4': 4.60,
        '5': 4.60,
        '6': 5.50,
        '7': 5.50,
        '8': 5.50,
        '9': 5.50,
        '10': 5.50,
        '11': 5.50,
        '12': 6.40,
        '13': 6.40,
        '15': 6.40,
        '18': 6.40,
        '24': 6.40,
        '36': 6.40,
        '37': 1.00,
    });
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [resultData, setResultData] = useState(null); // State để lưu trữ dữ liệu trả về từ API
    const [errorMessages, setErrorMessages] = useState({});
    const [errorSotien, setErrorSotien] = useState('');
    const [errorKyhan, setErrorKyhan] = useState('');
    const [errorNgaydau, setErrorNgaydau] = useState('');
    const [errorNgaycuoi, setErrorNgaycuoi] = useState('');
    const [errorThanhtoan, setErrorThanhtoan] = useState('');
    const [errorSoNgayThanhtoan, setErrorSoNgayThanhtoan] = useState('');

    // Tạo một ref để lưu trữ tham chiếu đến nút tính toán
    const calculateButtonRef = useRef(null);

    const handlePackageChange = (event) => {
        setSelectedPackage(event.target.value);
        console.log(event.target.value)
        setTerm(event.target.value); // Update term when selectedPackage changes
    };

    const handleDateChange = (value, setter) => {
        // Chuyển đổi ngày sang định dạng yyyy-mm-dd
        const formattedDate = new Date(value).toISOString().split('T')[0];
        setter(formattedDate);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        let newValue = value;
        
        if (id === 'amount') {
            // Loại bỏ tất cả các ký tự không phải là số
            newValue = value.replace(/\D/g, '');
        }
    
        // Tiếp tục xử lý giá trị mới cho các trường khác nếu cần
    
        // Cập nhật state
        if (id === 'amount') {
            setAmount(newValue);
        }
    }

    const handleCalculate = async () => {

        if (!amount) {
            setErrorSotien('Vui lòng nhập số tiền gửi!');
        }
        else{
            setErrorSotien("");
        }

        if (!paymentMethod) {
            setErrorThanhtoan('Vui lòng chọn phương thức thanh toán!');
        }
        else{
            setErrorThanhtoan("");
        }

        if (!term) {
            setErrorKyhan('Vui lòng chọn kỳ hạn!');
        }
        else{
            setErrorKyhan("");
        }

        if (!startDate) {
            setErrorNgaydau('Vui lòng chọn ngày bắt đầu!')
        }
        else{
            setErrorNgaydau('')
        }
        

        if (!endDate) {
            setErrorNgaycuoi('Vui lòng chọn ngày kết thúc.');
        }
        else{
            setErrorNgaycuoi("");
        }
        if(startDate && endDate &&  startDate > endDate){
            setErrorSoNgayThanhtoan('Ngày kết thúc phải sau ngày bắt đầu!')
        }
        else{
            setErrorSoNgayThanhtoan('')
        }
        setResultData(null);
        if (amount && paymentMethod && term && startDate && endDate &&  startDate <= endDate) {
            try {
                const response = await axios.post('http://localhost:8080/api/saving/interest', {
                    amount,
                    interestRate: interestRates[selectedPackage],
                    paymentMethod,
                    term,
                    startDate,
                    endDate,
                });

                // Lưu trữ dữ liệu trả về từ API vào state
                setResultData(response.data.data);
                console.log(response.data.data); // Log response from the API
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    // Xử lý sự kiện Enter
    const handleEnterPress = (e) => {
        if (e.key === 'Enter') {
            // Focus vào nút tính toán
            calculateButtonRef.current.focus();
            // Gọi hàm xử lý tính lãi
            handleCalculate();
        }
    };

    return (
        <div className="Tinhlai">
            <div className="input-group">
                <label htmlFor="amount">Số tiền gửi:</label>
                <p className='error-messagess' > {errorSotien}</p>
                <input className='input-nhap' type="text" id="amount" value={amount} onChange={(e) => handleChange(e)} onKeyPress={handleEnterPress} />
            </div>
            <div className="input-group">
                <label htmlFor="paymentMethod">Phương thức thanh toán:</label>
                <p className='error-messagess' > {errorThanhtoan}</p>
                <select id="paymentMethod" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} onKeyPress={handleEnterPress}>
                    <option value="">Phương thức thanh toán </option>
                    <option value="1">Nhập gốc </option>
                    <option value="2">Lấy lãi </option>
                </select>
            </div>
            <div className="input-group">
                <label htmlFor="term">Kỳ hạn:</label>
                <p className='error-messagess' > {errorKyhan}</p>
                <select id="term" value={term} onChange={handlePackageChange} onKeyPress={handleEnterPress}>
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
            {selectedPackage !== 'non-term' && (
                <div className="input-group">
                    <label htmlFor="interestRate">Lãi suất (%/năm )</label>
                    <input className='input-nhap' type="number" id="interestRate" value={interestRates[selectedPackage]} readOnly />
                </div>
            )}
            <div className="input-group">
                <label htmlFor="startDate">Ngày bắt đầu:</label>
                <p className='error-messagess' > {errorNgaydau}</p>
                <input className='input-nhap' type="date" id="startDate" value={startDate} onChange={(e) => handleDateChange(e.target.value, setStartDate)} onKeyPress={handleEnterPress} />
            </div>
            <div className="input-group">
                <label htmlFor="endDate">Ngày kết thúc:</label>
                <p className='error-messagess' > {errorNgaycuoi}</p>
                <p className='error-messagess' > {errorSoNgayThanhtoan}</p>
                <input
                className='input-nhap'
                type="date" id="endDate" value={endDate} onChange={(e) => handleDateChange(e.target.value, setEndDate)} onKeyPress={handleEnterPress} />
            </div>
            <button className='btn-submit' ref={calculateButtonRef} onClick={handleCalculate}>Tính toán</button>
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
