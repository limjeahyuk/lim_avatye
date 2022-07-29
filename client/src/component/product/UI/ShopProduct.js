import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from './ShopProduct.module.css';
import BlockIcon from '@mui/icons-material/Block';
import AuthContext from "../../../store/auth-context";


const ShopProduct = ({ bool, cont }) => {
    const ctx = useContext(AuthContext);
    const { proid, proimg, proname, userid, quantity, date, price, count, state, cartegory } = cont;

    const [cart, setCart] = useState([]);

    const navigate = useNavigate();

    const pdClickHandler = (proid, e) => {
        if (ctx.userId === userid||state === 1) {
            navigate(`/item/${proid}`);   
        }
    }
    const comma = (num) => {
        if (num) {
            return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        }
        
    }

    useEffect(() => {
        if (cartegory) {
            setCart(cartegory.split(','));
        }   
    },[cartegory])
 
    return (
        <div className={`${classes.item} ${state === 0 && classes.none} `} onClick={(e) => pdClickHandler(proid, e)}>
            {state === 0 && <BlockIcon className={classes.stop} />}
            <div className={classes.name}>{proname}</div>
            <div className={classes.cartegory}>
                {cart[0] && <div className={classes.car}>#{cart[0]} </div>}
                {cart[1] && <div className={classes.car}>#{cart[1]}</div>}
                {cart[2] && <div className={classes.car}>#{cart[2]}</div>} 
                </div>
            <div className={classes.imgbox}>
                <img src={proimg} alt="game_img"></img>
            </div>
            <div className={classes.into}>
                
                <div className={classes.tag}>
                    {quantity === 0 && <div className={classes.no}>품절</div>}
                    {ctx.userId == userid && <div className={classes.my}>My</div>}
                    {quantity !== 0 && ctx.id !== userid && <div className={classes.none}></div>}
                </div>
                
                <div className={classes.right}>
                    {bool ? <div>
                        {quantity === 0 ? <div className={classes.count}>남은 수량 0개 </div>
                            : <div className={classes.count}>남은 수량 {comma(quantity)}개 </div>}
                        {price && <div className={classes.price}>개당 {comma(price)}원</div>}
                    </div> : 
                        <div>
                            <div className={classes.count}>구매한수량 {count}개 </div>
                            {price && <div className={classes.price}>총 {comma(price*count)}원</div>}
                            <div className={classes.price}>{date}</div>
                            </div>
                    }
                    </div>
            </div>
        </div>
    )
}

export default ShopProduct;