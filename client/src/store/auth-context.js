import React, { useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';

const AuthContext = React.createContext({
    isLogin: false,
    username: '',
    userId: '',
    onLogin: (bool) => { },
});

export const AuthContextProvider = (props) => {
    const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');

  const isLoginHandler = (bool) => {
    setIsLogin(bool);

    if (bool === true) {
    const token = localStorage.getItem('lim-token');
      setUserName(jwt_decode(token).username);
      setUserId(jwt_decode(token).userid);
      console.log(jwt_decode(token).userid)
    } else {
        setUserName('');
        setUserId('');
    }
  }

    useEffect(() => {
        const storedUserInfo = localStorage.getItem('lim-token');

        if (storedUserInfo) {
            setIsLogin(true);
            const token = localStorage.getItem('lim-token');
            setUserName(jwt_decode(token).username);
            setUserId(jwt_decode(token).userid);
        }
    }, []);

    return <AuthContext.Provider value={{
        isLogin: isLogin,
        username: userName,
        userId: userId,
        onLogin: isLoginHandler
    }}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext