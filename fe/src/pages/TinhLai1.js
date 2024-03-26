import React, { useState } from "react";

function TinhLai1() {
    const [soTienGoc, setSoTienGoc] = useState("");
    const [laiSuat, setLaiSuat] = useState("");
    const [soNgayGui, setSoNgayGui] = useState("");
    const [ketQuaLai, setKetQuaLai] = useState(0);

    const tinhLai = () => {
        const soTienLai = (soTienGoc * laiSuat * soNgayGui) / 36500;
        setKetQuaLai(soTienLai);
    };

    return (
        <div>
            <h1>Tính Lãi</h1>
            <div>
                <label>Số tiền gốc:</label>
                <input
                    type="number"
                    value={soTienGoc}
                    onChange={(e) => setSoTienGoc(e.target.value)}
                />
            </div>
            <div>
                <label>Lãi suất (%):</label>
                <input
                    type="number"
                    value={laiSuat}
                    onChange={(e) => setLaiSuat(e.target.value)}
                />
            </div>
            <div>
                <label>Số ngày gửi:</label>
                <input
                    type="number"
                    value={soNgayGui}
                    onChange={(e) => setSoNgayGui(e.target.value)}
                />
            </div>
            <button onClick={tinhLai}>Tính toán</button>
            <div>
                <label>Kết quả:</label>
                <span>{ketQuaLai}</span>
            </div>
        </div>
    );
}

export default TinhLai1;
