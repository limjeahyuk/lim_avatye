import axios from "axios";
import React, { useState } from "react";

const Post = () => {

    const [postName, setPostName] = useState('');
    const [postCont, setPostCont] = useState('');
    const [postPrice, setPostPrice] = useState('');
    const [postFile, setPostFile] = useState('');
    const [postPreview, setPostPreview] = useState('');
    const [postCar, setPostCar] = useState('아케이드');
    const [quantity, setQuantity] = useState('');

    // input 상태 관리
    const nameHandler = (e) => {
        setPostName(e.target.value);
    }

    const contHandler = (e) => {
        setPostCont(e.target.value);
    }

    const priceHandler = (e) => {
        setPostPrice(e.target.value);
    }

    const selectChangeHandler = (e) => {
        setPostCar(e.target.value);
    }

    const quantityHandler = (e) => {
        setQuantity(e.target.value);
    }

    //이미지 미리보기
    const encodeFileToBase64 = (fileBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        return new Promise((resolve) => {
            reader.onload = () => {
                setPostPreview(reader.result);
                resolve();
            }
        })
    }

    // 이미지 선택했을 때
    const fileChangeHandler = (e) => {

        //미리보기 인코딩
        encodeFileToBase64(e.target.files[0]);

        // formdata로 이미지 저장.
        const formdata = new FormData();
        formdata.append('img', e.target.files[0]);

        const config = {
            Headers: {
                'content-type': 'multipart/form-data',
            },
        };

        //서버를 이용해서 저장.
        axios.post('http://localhost:8080/img', formdata, config)
            .then((res) => {
                console.log(res.data.data);
                setPostFile(res.data.data.slice(13));
        })
    }


    // 폼 전체 서버로 저장.
    const submitClickHandler = (e) => {
        e.preventDefault();
        
        const postData = {
            proname: postName,
            procont: postCont,
            price: postPrice,
            proimg: postFile,
            proca: postCar,
            quantity: quantity
        };

        axios({
            url: "http://localhost:8080/post",
            method: 'post',
            data: postData
        }).then(function a(response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        })

    };

    return (
        <div>
            <form onSubmit={submitClickHandler}>
                <div>
                    이름
                    <input type="text" value={postName} onChange={nameHandler} />
                </div>
                <div>
                    내용
                    <input type="text" value={postCont} onChange={contHandler} />
                </div>
                <div>
                    카테고리
                    <select onChange={selectChangeHandler} value={postCar}>
                        <option>아케이드</option>
                        <option>RPG</option>
                        <option>로그라이크</option>
                        <option>기타</option>
                    </select>
                </div>
                <div>
                    수량
                    <input type="number" min="0" value={quantity} onChange={quantityHandler} />
                </div>
                <div>
                    가격
                    <input type="number" min= "0" value={postPrice} onChange={priceHandler} />
                </div>
                <div>
                    이미지
                    <input type="file" onChange={fileChangeHandler} accept="image/*"
                        name="img" />
                </div>
                <div>
                    {postPreview && <img src={postPreview} alt="preview" />}
                </div>
                <button type="submit" >등록</button>
            </form>
        </div>
    )
}

export default Post;