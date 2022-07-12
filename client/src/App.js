import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShopMain from './component/shop_main/ShopMain';
import HeadBox from './HeadBox';
import Login from './component/user/Login';
import Sign from './component/user/Sign';
import Post from './component/product/Post';
import Item from './component/product/item/Item';
import { useState } from 'react';
import jwt_decode from 'jwt-decode';



function App() {
  const [isLogin, setIsLogin] = useState(false);

  const isLoginHandler = (bool) => {
    setIsLogin(bool);
    const token = localStorage.getItem('lim-token');
    console.log(jwt_decode(token));
  }

  return (
    <div>
      <BrowserRouter>
        <HeadBox isLogin={isLogin} />
        <Routes>
          <Route path="/" element={<ShopMain />} />
          <Route path='/login' element={<Login isLoginCheck={ isLoginHandler} />} />
          <Route path='/sign' element={<Sign />} />
          <Route path='/post' element={<Post />} />
          <Route path='/item/:id' element={<Item />} />
        </Routes>
      </BrowserRouter>

      <div className='footbox'></div>
   </div>
  );
}

export default App;
