import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ShopProduct from "../product/UI/ShopProduct";
import classes from './ShopSearch.module.css'

const ShopSearch = ({userId}) => {
    const [searchNull, setSearchNull] = useState(false);
    const [searchData, setSearchData] = useState({});
    const { cont } = useParams();

    const { state } = useLocation();

    const sendFullRequest = async () => {
        const response = await axios.get(`http://localhost:8080/search/${state}/${cont}`);
        if (response.data === '검색결과가 없습니다') {
            setSearchNull(false);
        } else {
            setSearchData(response.data);
            setSearchNull(true);
        }
    }

    useEffect(() => {
        sendFullRequest();
    },[cont])

    return <div className={classes.search}>
        <div className={classes.top}>
            <div>{cont}</div>
            <div>검색결과</div>            
        </div>

        <div>
        {!searchNull ?
            <div className={classes.no}>검색결과가 없습니다.</div> :
            <div className={classes.cont}>{searchData.map((item, index) => (
                <ShopProduct
                bool={true}
                key={index}
                cont={item}
                id={userId}
            />
            ))}
            </div>
            }
        </div>
</div>
}

export default ShopSearch