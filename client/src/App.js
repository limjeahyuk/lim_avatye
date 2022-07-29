import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShopMain from './component/shop_main/ShopMain';
import HeadBox from './HeadBox';
import Login from './component/user/Login';
import Sign from './component/user/Sign';
import Post from './component/product/Post';
import Item from './component/product/item/Item';
import MyPage from './component/user/mypage/MyPage';
import UserUpdate from './component/user/UserUpdate';
import ShopSearch from './component/shop_main/ShopSearch';
import ProductUpdate from './component/product/item/ProductUpdate';
import Category from './component/product/category/Category';



function App() {
  return (
    <div className='backgrounds'>
      <BrowserRouter>
        <HeadBox />
        <Routes>
          <Route path="/" element={<ShopMain />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/sign' element={<Sign />} />
          <Route path='/post' element={<Post />} />
          <Route path='/item/:id' element={<Item />} />
          <Route path='/mypage/:id' element={<MyPage />} />
          <Route path='/userupdate' element={<UserUpdate />} />
          <Route path='/search/:cont' element={<ShopSearch />} />
          <Route path="/search" element={<ShopMain />} />
          <Route path="/proupdate/:id" element={<ProductUpdate />} />
          <Route path="/category/:name" element={<Category />} />
        </Routes>
      </BrowserRouter>

      <div className='footbox'></div>
   </div>
  );
}

export default App;
