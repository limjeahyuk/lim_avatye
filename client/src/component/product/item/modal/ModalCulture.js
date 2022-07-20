import React, { useState } from "react";
import './Modal.css'

const ModalCulture = ({onCashInfo}) => {
    const [cashData, setCashData] = useState({});

    const [firstNum, setFirstNum] = useState('');
    const [twoNum, setTwoNum] = useState('');
    const [threeNum, setThreeNum] = useState('');
    const [fourNum, setFourNum] = useState('');

    const onFirstHandler = (e) => {
        if (e.target.value.length < 5) {     
        setFirstNum(String(e.target.value).replace(/[^0-9]/g, ""));
        }
        setFourNum('')
    }

    const onTwoHandler = (e) => {
        if (e.target.value.length < 5) {
           setTwoNum(String(e.target.value).replace(/[^0-9]/g, "")); 
        }
        
        setFourNum('');
    }

    const onThreeHandler = (e) => {
        if (e.target.value.length < 5) {
            setThreeNum(String(e.target.value).replace(/[^0-9]/g, ""));
        }
        
        setFourNum('');
    }

    const onFourHandler = (e) => {
        if (e.target.value.length < 7) {
            setFourNum(String(e.target.value).replace(/[^0-9]/g, ""));
            setCashData({
                number: firstNum+twoNum+threeNum+e.target.value
            })
        }
        onCashInfo(cashData);  
    }

    return <div className="modalculture">    
                    <label htmlFor="num">문화상품권 번호</label>
                    <div className="culturebox">
            <input id="num" type="text" value={firstNum} onChange={onFirstHandler} minLength="4" />
                        <input type="text" className="pw" value={twoNum} onChange={onTwoHandler} minLength="4"  />
                        <input type="text" value={threeNum} onChange={onThreeHandler} minLength="4" />
                        <input type="text" className="pw" value={fourNum} onChange={onFourHandler} minLength="6"  />
                    </div>
            </div>
}

export default ModalCulture;