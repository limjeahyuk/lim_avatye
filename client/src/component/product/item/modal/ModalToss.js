import React, { useState } from "react";

const ModalToss = ({ onCashInfo }) => {

    const [cashData, setCashData] = useState({});

    const [firstNum, setFirstNum] = useState('');
    const [twoNum, setTwoNum] = useState('');
    const [threeNum, setThreeNum] = useState('');

    const onFirstHandler = (e) => {
        if (e.target.value.length < 4) {
            setFirstNum(e.target.value);
        }
        setThreeNum('');
    }

    const onTwoHandler = (e) => {
        if (e.target.value.length < 5) {
            setTwoNum(e.target.value);
        }
        setThreeNum('');
    }

    const onThreeHandler = (e) => {
        if (e.target.value.length < 5) {
            setThreeNum(e.target.value);
            setCashData({
                phone: firstNum + "-" + twoNum + "-" + threeNum
            })
        }
        onCashInfo(cashData)
    }
    


    return <div>
                
                    <label htmlFor="phone">휴대폰번호</label>
                    <div>
                        <input id="phone" type="number" value={firstNum} onChange={onFirstHandler} />
                        -
                        <input type="number" value={twoNum} onChange={onTwoHandler} />
                        -
                        <input type="number" value={threeNum} onChange={onThreeHandler} />
                    </div>
                
            </div>
}

export default ModalToss;