import React from "react";
import { useNavigate } from "react-router-dom";
import classes from './ShopProduct.module.css';


const ShopProduct = (props) => {
    const navigate = useNavigate();

    const pdClickHandler = (pdid, e) => {
        if (props.count === 0) {
            alert('구매 불가능 합니다.')
        } else {
            
        navigate(`/item/${pdid}`);
        }
    }

    return (
         <div className={classes.item} onClick={(e) => pdClickHandler(props.pdid, e)}>
            <div className={ classes.name}>{props.name}</div>
            <div className={classes.imgbox}>
                <img src={props.img} alt="game_img"></img>
            </div>
            <div className={classes.into}>
                <div className={classes.tag}>
                    <div className={classes.car}>{props.carte} </div>
                    {props.count === 0 && <div className={classes.no}>품절</div>}
                </div>
                
                <div className={classes.right}>
                    <div className={classes.count}>남은 수량 {props.count}개 </div>
                <div className={classes.price}>개당 {props.price}원</div>
                    </div>
            </div>
        </div>
    )
}

export default ShopProduct;