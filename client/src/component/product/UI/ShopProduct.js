import React from "react";
import { useNavigate } from "react-router-dom";
import classes from './ShopProduct.module.css';


const ShopProduct = ({ bool, id, cont }) => {
    const { proid, proimg, proname, userid, proca, quantity, date, price, count, proca2 } = cont;

    const navigate = useNavigate();

    const pdClickHandler = (proid, e) => {
        navigate(`/item/${proid}`);   
    }

    return (
         <div className={classes.item} onClick={(e) => pdClickHandler(proid, e)}>
            <div className={classes.name}>{proname}</div>
            <div className={classes.cartegory}>
                    <div className={classes.car}>#{proca} </div>
                    {proca2 !== null && <div className={classes.car}>#{ proca2}</div>}
                </div>
            <div className={classes.imgbox}>
                <img src={proimg} alt="game_img"></img>
            </div>
            <div className={classes.into}>
                
                <div className={classes.tag}>
                    {quantity === 0 && <div className={classes.no}>품절</div>}
                    {id === userid && <div className={classes.my}>My</div>}
                    {quantity !== 0 && id !== userid && <div className={classes.none}></div>}
                </div>
                
                <div className={classes.right}>
                    {bool ? <div>
                        <div className={classes.count}>남은 수량 {quantity}개 </div>
                <div className={classes.price}>개당 {price}원</div>
                    </div> : 
                        <div>
                            <div className={classes.count}>구매한수량 {count}개 </div>
                            <div className={classes.price}>총 {price*count}원</div>
                            <div className={classes.price}>{date}</div>
                            </div>
                    }
                    </div>
            </div>
        </div>
    )
}

export default ShopProduct;