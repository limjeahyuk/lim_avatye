import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShopProduct from "../product/UI/ShopProduct";
import classes from './ShopSearch.module.css'

const ShopSearch = ({userId}) => {
    const [searchNull, setSearchNull] = useState(false);
    const [searchData, setSearchData] = useState({});
    const { cont } = useParams();

    const sendFullRequest = async () => {
        const response = await axios.get(`http://localhost:8080/search/${cont}`);
        console.log(response.data);
        if (response.data === '검색결과가 없습니다') {
            console.log("no");
            setSearchNull(false);
        } else {
            setSearchData(response.data);
            setSearchNull(true);
            console.log("yes");
        }
    }

    useEffect(() => {
        sendFullRequest();
    },[cont])

    return <div className={classes.search}>
        <h2>검색결과</h2>
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