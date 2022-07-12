import React, { useState } from "react";
import classes from './HeadBox.module.css';
import { Link } from "react-router-dom";

const HeadBox = () => {

    const [userNick, setUserNick] = useState('');

 
    return (<div className={classes.headbox}>
        <div className={classes.intro}>
                
            <div className={classes.user}>
                <Link to='/login'>login</Link>
                |
                <Link to='/sign'>sign</Link>
            </div>

        </div>
        <div className={classes.logo}>
            <Link to="/">Avatye Project</Link>
        </div>
        <div>
            <Link to="/post">상품등록</Link>
        </div>
    </div>)
}

export default HeadBox;