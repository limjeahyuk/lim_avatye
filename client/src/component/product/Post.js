import axios from "axios";
import React, { useEffect, useState } from "react";
import classes from './Post.module.css';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from "react-router-dom";

const Post = ({userId}) => {
    const [postName, setPostName] = useState('');
    const [postCont, setPostCont] = useState('');
    const [postPrice, setPostPrice] = useState(0);
    const [postFile, setPostFile] = useState('');
    const [postPreview, setPostPreview] = useState('');
    const [postCar, setPostCar] = useState('아케이드');
    const [quantity, setQuantity] = useState(0);

    
    const navigate = useNavigate();

    // input 상태 관리
    const nameHandler = (e) => {setPostName(e.target.value);}
    const contHandler = (e) => {setPostCont(e.target.value);}
    const priceHandler = (e) => {setPostPrice(e.target.value);}
    const selectChangeHandler = (e) => {setPostCar(e.target.value);}
    const quantityHandler = (e) => {setQuantity(e.target.value);}
    const priceZeroHandler = () => { setPostPrice(''); }
    const quantityZeroHandler = () => { setQuantity(''); }


    //icon 클릭시 숫자 변경
    const onCountAdd = () => {setQuantity(pre => pre + 1);}
    const onCountDown = () => {
        if (quantity === 0) {
            setQuantity(0)
        }else{setQuantity(pre => pre - 1);}
        
    }
    const onPriceAdd = () => {setPostPrice(pre => pre + 1000);}
    const onPriceDown = () => {setPostPrice(pre => pre - 1000);}

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
            userid: userId,
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
            navigate('/');
        }).catch(function (error) {
            console.log(error);
        })

    };


    return (
        <div className={classes.cont}>
            <div className={classes.postname}>상품등록</div>
            <form onSubmit={submitClickHandler}>
                <div>
                    <label htmlFor="name">이름</label>
                    <div className={classes.box}>
                    <input
                        id="name"
                        type="text"
                        value={postName}
                        onChange={nameHandler}
                        />
                        </div>
                </div>
                <div className={classes.img}>
                    <label>이미지</label>
                    <input
                        type="file"
                        onChange={fileChangeHandler}
                        accept="image/*"
                        name="img"
                        className={classes.file}
                    />
                </div>
                <div className={classes.imgbox}>
                    {postPreview && <img src={postPreview} alt="preview" />}
                </div>
                <div>
                    <label>내용</label>
                    <div className={classes.box}>
                    <input
                        type="text"
                        value={postCont}
                        onChange={contHandler}
                        />
                        </div>
                </div>
                <div>
                    <label>카테고리</label>
                    <div className={classes.car}>
                    <select onChange={selectChangeHandler} value={postCar}>
                        <option>아케이드</option>
                        <option>RPG</option>
                        <option>로그라이크</option>
                        <option>기타</option>
                        </select>
                        </div>
                </div>
                <div>
                    <label>수량</label>
                    <div className={classes.count}>
                        <KeyboardArrowLeftIcon onClick={onCountDown} />
                    <input
                        type="number"
                        min="0"
                        value={quantity}
                            onChange={quantityHandler}
                            onClick={quantityZeroHandler}
                        />
                        <KeyboardArrowRightIcon onClick={onCountAdd} />
                        </div>
                </div>
                <div>
                    <label>가격</label>
                    <div className={classes.price}>
                        <RemoveIcon onClick={onPriceAdd} />
                    <input
                        type="number"
                        min="0"
                        value={postPrice}
                        onChange={priceHandler}
                        onClick={priceZeroHandler}    
                    />
                        
                        <AddIcon onClick={onPriceDown} />
                        </div>
                </div>
                <button type="submit" >등록</button>
            </form>
        </div>
    )
}

export default Post;