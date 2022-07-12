import React from "react";
import { useNavigate } from "react-router-dom";
import classes from './ShopProduct.module.css';


const ShopProduct = (props) => {
    const navigate = useNavigate();

    const pdClickHandler = (pdid, e) => {
        navigate(`/item/${pdid}`);
    }

    return (
         <div className={classes.item} onClick={(e) => pdClickHandler(props.pdid, e)}>
            <div className={classes.imgbox}>
                    <img src={props.img} alt="game_img"></img>
                </div>
                <div className={classes.into}>
                    <div>{props.name}</div>
                    <div>{props.carte} </div>
                    <div>{props.price}원</div>
                </div>
            </div>
    )
}

export default ShopProduct;