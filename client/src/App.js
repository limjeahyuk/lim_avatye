import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShopMain from './component/shop_main/ShopMain';
import HeadBox from './HeadBox';
import Login from './component/user/Login';
import Sign from './component/user/Sign';
import Post from './component/product/Post';
import Item from './component/product/item/Item';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import MyPage from './component/user/MyPage';
import UserUpdate from './component/user/UserUpdate';
import ShopSearch from './component/shop_main/ShopSearch';



function App() {
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
    }
  }

  useEffect(() => {
    if (localStorage.getItem('lim-token')) {
      setIsLogin(true);
      const token = localStorage.getItem('lim-token');
      setUserName(jwt_decode(token).username);
      setUserId(jwt_decode(token).userid);
    }
  },[])


  return (
    <div className='backgrounds'>
      <BrowserRouter>
        <HeadBox isLogin={isLogin} userName={userName} userId={userId} isLoginCheck={isLoginHandler} />
        <Routes>
          <Route path="/" element={<ShopMain userId={userId} />} />
          <Route path='/login' element={<Login isLoginCheck={ isLoginHandler} />} />
          <Route path='/sign' element={<Sign />} />
          <Route path='/post' element={<Post userId={userId} />} />
          <Route path='/item/:id' element={<Item name={userName} />} />
          <Route path='/mypage/:id' element={<MyPage userId={userId} isLoginCheck={isLoginHandler} />} />
          <Route path='/userupdate' element={<UserUpdate name={userName} userId={userId} />} />
          <Route path='/search/:cont' element={<ShopSearch />} />
        </Routes>
      </BrowserRouter>

      <div className='footbox'></div>
   </div>
  );
}

export default App;
