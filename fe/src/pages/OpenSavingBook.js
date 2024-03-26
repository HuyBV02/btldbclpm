import React, { useState } from 'react';
import "./OpenSavingsBook.css"
import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

const OpenSavingsBook = (props) => {
    const [formData, setFormData] = useState({
        savingProductId: '1',
        paymentMethod: '1', // Mặc định là nhập gốc
        amount: '',
        createdAt: new Date().toISOString().substr(0, 10),
    });
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const termInterestRates = {

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
    };
        const handleChange = (e) => {
            const { name, value } = e.target;
            let newValue = value;
            if (name === 'amount') {
                // Loại bỏ tất cả các ký tự không phải là số
                newValue = value.replace(/\D/g, '');

            }

            let newFormData = { ...formData, [name]: newValue };

            // Nếu đang xử lý trường input ngày tháng, định dạng lại giá trị
            if (name === 'createdAt') {
                newValue = formatDateToYYYYMMDD(value);
            }
            // Cập nhật lãi suất khi chọn kỳ hạn
            if (name === 'savingProductId' && value in termInterestRates) {
                newFormData = { ...newFormData, laisuat: termInterestRates[value] };
            } else if (name === 'loaiso' && value === 'khongkyhan') {
                newFormData = { ...newFormData, savingProductId: '0', laisuat: '1.00' }; // Reset term and interestRate when changing account type
            }
            if (name === 'loaiso' && value === 'savingProductId') {
                newFormData = { ...newFormData, savingProductId: '1' };
            }
            setFormData(newFormData);
        };


        const handleSubmit = async (e) => {
            e.preventDefault();
            // Xử lý dữ liệu
            console.log(formData)
            if (!formData.savingProductId || !formData.amount) {
                setErrorMessage('Vui lòng điền đầy đủ thông tin');
                return;
            }
            if (parseInt(formData.amount) < 1000000) {
                // Nếu nhỏ hơn, không cập nhật giá trị và hiển thị thông báo lỗi
                setErrorMessage('Số tiền phải lớn hơn hoặc bằng 1,000,000');
                return;
            }
            const dataa = {
                "savingProductId": formData.savingProductId,
                "paymentMethod": formData.paymentMethod, // Thêm trường chọn loại thanh toán
                "amount": formData.amount,
                "createdAt": formData.createdAt,
            }
            console.log(dataa)
            try {
                // Gửi dữ liệu đến API
                const response = await axios.post('http://localhost:8080/api/saving/customers/8/passbooks', dataa);
                console.log(response.data);
                setShowSuccessMessage(true);
                setTimeout(() => {
                    navigate('/list-saving-book');
                }, 1000);
            } catch (error) {
                console.error('Error:', error);
            }
            // Reset form
            setFormData({
                savingProductId: '1',
                paymentMethod: '1', // Reset lại giá trị mặc định cho trường chọn
                amount: '',
                createdAt: new Date().toISOString().substr(0, 10),
            });
            setErrorMessage('');
        };

        const formatDateToYYYYMMDD = (dateString) => {
            if (!dateString) return '';
            const [day, savingProductId, year] = dateString.split('/');
            if (!day || !savingProductId || !year) return '';
            return `${year}-${(savingProductId.length === 1 ? '0' + savingProductId : savingProductId)}-${(day.length === 1 ? '0' + day : day)}`;
        };

        const renderTermOptions = () => {
            let interestRate = '';
            if (formData.savingProductId in termInterestRates) {
                interestRate = termInterestRates[formData.savingProductId];
            }

            if (formData.loaiso === 'savingProductId') {
                return (
                    <div>
                        <label>
                            Kỳ hạn:
                            <select name="savingProductId" value={formData.savingProductId} onChange={handleChange}>

                                <option value="2">1 tháng</option>
                                <option value="3">2 tháng</option>
                                <option value="4">3 tháng</option>
                                <option value="5">4 tháng</option>
                                <option value="6">5 tháng</option>
                                <option value="7">6 tháng</option>
                                <option value="8">7 tháng</option>
                                <option value="9">8 tháng</option>
                                <option value="10">9 tháng</option>
                                <option value="11">10 tháng</option>
                                <option value="12">11 tháng</option>
                                <option value="13">12 tháng</option>
                                <option value="14">13 tháng</option>
                                <option value="15">15 tháng</option>
                                <option value="16">18 tháng</option>
                                <option value="17">24 tháng</option>
                                <option value="18">36 tháng</option>
                            </select>
                        </label>
                        <label>
                            Lãi suất %/năm:
                            <input type="text" name="laisuat" value={interestRate} readOnly />
                        </label>
                    </div>
                );
            }
        };

        return (
            <div className='khung'>
                <div className='tieude'>
                    Mở Sổ tiết kiệm
                </div>
                <form onSubmit={handleSubmit} className="form-container">
                    {showSuccessMessage && <div className="success-message">Dữ liệu đã được đẩy thành công!</div>}
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className="form-group">
                        <label>Amount:</label>
                        <input type="text" name="amount" value={formData.amount} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="createdAt">Created At:</label>
                        <input
                            type="date"
                            id="createdAt"
                            name="createdAt"
                            value={formData.createdAt}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            Loại sổ:</label>
                        <select name="loaiso" value={formData.loaiso} onChange={handleChange}>
                            <option value="khongkyhan">Không kỳ hạn</option>
                            <option value="savingProductId">Kỳ hạn</option>
                        </select>
                    </div>

                    {renderTermOptions()}

                    {/* Thêm trường chọn loại thanh toán */}
                    <div className="form-group">
                        <label>Loại thanh toán:</label>
                        <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                            <option value="1">Nhập gốc</option>
                            <option value="2">Trả lãi hàng tháng</option>
                        </select>
                    </div>

                    <button type="submit">Open Savings Account</button>
                </form>
            </div>
        );
    };

    export default OpenSavingsBook;
