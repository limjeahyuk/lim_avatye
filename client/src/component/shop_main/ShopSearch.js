import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShopProduct from "../product/UI/ShopProduct";

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

    return <div>
        {!searchNull ?
            <div>검색결과가 없습니다.</div> :
            <div>{searchData.map((item, index) => (
                <ShopProduct
                bool={true}
                key={index}
                pdid={item.proid}
                userid={item.userid}
                img={item.proimg}
                name={item.proname}
                carte={item.proca}
                price={item.price}
                count={item.quantity}
                id={userId}
            />
            ))}
                
                </div>
        }
</div>
}

export default ShopSearch