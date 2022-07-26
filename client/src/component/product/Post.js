import axios from "axios";
import React, { useState } from "react";
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
    const [postCar, setPostCar] = useState('1');
    const [postCar2, setPostCar2] = useState('');
    const [postCar3, setPostCar3] = useState('');
    const [quantity, setQuantity] = useState(0);

    
    const [nameVal, setNameVal] = useState(false);
    const [contVal, setContVal] = useState(false);
    const [priceVal, setPriceVal] = useState(false);
    const [quantityVal, setQuantityVal] = useState(false);

    
    const navigate = useNavigate();

    // input 상태 관리
    const nameHandler = (e) => {
        setPostName(e.target.value);
        if (e.target.value.length > 3) {
            setNameVal(true);
        } else {
            setNameVal(false);
        }
    }
    const contHandler = (e) => {
        setPostCont(e.target.value);
        if (e.target.value.length > 5) {
            setContVal(true);
        } else {
            setContVal(false);
        }
    }
    const priceHandler = (e) => {
        setPostPrice(String(e.target.value).replace(/[^0-9]/g, ""));
        if (Number(e.target.value) > 0) {
            setPriceVal(true);
        } else {
            setPriceVal(false);
        }
    }
    const selectChangeHandler = (e) => {
        setPostCar(e.target.value);
    }
    const onCartegorytwoHandler = (e) => { setPostCar2(e.target.value); }
    const onCartegoryThreeHandler = (e) => {
        setPostCar3(e.target.value)
    }
    const quantityHandler = (e) => {
        setQuantity(String(e.target.value).replace(/[^0-9]/g, ""));
        if (Number(e.target.value) > 0) {
            setQuantityVal(true);
        } else {
            setQuantityVal(false);
        }
    }
    const priceZeroHandler = () => { setPostPrice(''); }
    const quantityZeroHandler = () => { setQuantity(''); }


    //icon 클릭시 숫자 변경
    const onCountAdd = () => {
        setQuantity(pre => Number(pre) + 1);
        setQuantityVal(true);
    }
    const onCountDown = () => {
        if (quantity === 0) {
            setQuantity(0)
        } else { setQuantity(pre => pre - 1); }

        if (quantity <= 1) {
            setQuantityVal(false);
        }
        
    }
    const onPriceAdd = () => {
        setPostPrice(pre => Number(pre) + 1000);
        setPriceVal(true);
    }
    const onPriceDown = () => {
        if (postPrice < 1000) {
            setPostPrice(0)
            setPriceVal(false);
        } else {
            setPostPrice(pre => Number(pre) - 1000);
        }
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
            userid: userId,
            proname: postName,
            procont: postCont,
            price: postPrice,
            proimg: postFile,
            proca: postCar,
            proca2: postCar2,
            proca3: postCar3,
            quantity: quantity
        };

        if (nameVal && priceVal && contVal && quantityVal) {
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
        }
    };


    return (
        <div className={classes.cont}>
            <div className={classes.postname}>상품등록</div>
            <form onSubmit={submitClickHandler}>
                <div>
                    <div className={classes.head}>
                        <label htmlFor="name">이름</label>
                        {!nameVal ? <p>3글자 이상 채워주세요</p> : <p className={classes.good}>굳!</p> }
                        </div>
                    <div className={classes.box}>
                    <input
                        id="name"
                        type="text"
                        value={postName}
                            onChange={nameHandler}
                            minLength="3"
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
                    <div className={classes.head}>
                        <label>내용</label>
                        {!contVal ? <p>7글자 이상 채워주세요</p> : <p className={classes.good}>굳!</p> }
                    </div>
                    
                    <div className={classes.box}>
                    <input
                        type="text"
                        value={postCont}
                            onChange={contHandler}
                            placeholder="게임에 대한 내용 적어주세요."
                            minLength="5"
                        />
                        </div>
                </div>
                <div className={classes.cartegory}>
                <div className={classes.firstcar}>
                    <label>카테고리</label>
                    <div className={classes.car}>
                            <select onChange={selectChangeHandler} value={postCar}>
                                <option value="1" hidden={postCar2 === "1" || postCar3 === "1" ? true : false}>아케이드</option>
                                <option value="2" hidden={postCar2 === "2" || postCar3 === "2" ? true : false}>RPG</option>
                                <option value="3" hidden={postCar2 === "3" || postCar3 === "3" ? true : false}>로그라이크</option>
                                <option value="5" hidden={postCar2 === "5" || postCar3 === "5" ? true : false}>퍼즐</option>
                                <option value="4" hidden={postCar2 === "4" || postCar3 === "4" ? true : false}>기타</option>
                            </select>
                        </div>
                        
                </div>
                <div className={classes.twocar}>
                    <label>카테고리2</label>
                    <div className={classes.car}>
                            <select onChange={onCartegorytwoHandler} value={postCar2}>
                                <option value="none">none</option>
                        <option value="1" hidden={postCar === "1" || postCar3 === "1" ? true : false}>아케이드</option>
                        <option value="2" hidden={postCar === "2" || postCar3 === "2" ? true : false}>RPG</option>
                        <option value="3" hidden={postCar === "3" || postCar3 === "3" ? true : false}>로그라이크</option>
                        <option value="5" hidden={postCar === "5" || postCar3 === "5" ? true : false}>퍼즐</option>
                        <option value="4" hidden={postCar === "4" || postCar3 === "4" ? true : false}>기타</option>
                        </select>
                        </div>
                    </div>
                    <div className={classes.threecar}>
                    <label>카테고리3</label>
                    <div className={classes.car}>
                            <select onChange={onCartegoryThreeHandler} value={postCar3}>
                                <option value="none">none</option>
                        <option value="1" hidden={postCar === "1" || postCar2 === "1" ? true : false}>아케이드</option>
                        <option value="2" hidden={postCar === "2" || postCar2 === "2" ? true : false}>RPG</option>
                        <option value="3" hidden={postCar === "3" || postCar2 === "3" ? true : false}>로그라이크</option>
                        <option value="5" hidden={postCar === "5" || postCar2 === "5" ? true : false}>퍼즐</option>
                        <option value="4" hidden={postCar === "4" || postCar2 === "4" ? true : false}>기타</option>
                        </select>
                        </div>
                    </div>
                    </div>
                <div>
                    <div className={classes.head}>
                    <label>수량</label>
                    {!quantityVal ? <p>0개 이상!</p> : <p className={classes.good}>굳!</p>}
                        </div>
                    <div className={classes.count}>
                        <KeyboardArrowLeftIcon onClick={onCountDown} />
                    <input
                        type="number"
                        value={quantity}
                            onChange={quantityHandler}
                            onClick={quantityZeroHandler}
                        />
                        <KeyboardArrowRightIcon onClick={onCountAdd} />
                        </div>
                </div>
                <div>
                    <div className={classes.head}>
                    <label>가격</label>
                    {!priceVal ? <p>0원 이상!</p> : <p className={classes.good}>굳!</p>}
                        </div>
                    <div className={classes.price}>
                        <RemoveIcon onClick={onPriceDown} />
                    <input
                        type="number"
                        value={postPrice}
                        onChange={priceHandler}
                        onClick={priceZeroHandler}    
                    />
                        <AddIcon  onClick={onPriceAdd} />
                        </div>
                </div>
                <button type="submit" >등록</button>
            </form>
        </div>
    )
}

export default Post;