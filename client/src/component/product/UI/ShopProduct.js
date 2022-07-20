import React from "react";
import { useNavigate } from "react-router-dom";
import classes from './ShopProduct.module.css';


const ShopProduct = ({bool, pdid, img, id, name ,userid, carte, count, date, price, buycount}) => {
    const navigate = useNavigate();

    const pdClickHandler = (pdid, e) => {
        navigate(`/item/${pdid}`);   
    }

    return (
         <div className={classes.item} onClick={(e) => pdClickHandler(pdid, e)}>
            <div className={classes.name}>{name}</div>
            <div className={classes.imgbox}>
                <img src={img} alt="game_img"></img>
            </div>
            <div className={classes.into}>
                <div className={classes.tag}>
                    <div className={classes.car}>{carte} </div>
                    {count === 0 && <div className={classes.no}>품절</div>}
                    {id === userid && <div className={classes.my}>My</div>}
                </div>
                
                <div className={classes.right}>
                    {bool ? <div>
                        <div className={classes.count}>남은 수량 {count}개 </div>
                <div className={classes.price}>개당 {price}원</div>
                    </div> : 
                        <div>
                            <div className={classes.count}>구매한수량 {buycount}개 </div>
                            <div className={classes.price}>총 {price}원</div>
                            <div className={classes.price}>{date}</div>
                            </div>
                    }
                    </div>
            </div>
        </div>
    )
}

export default ShopProduct;