import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShopMain from './component/shop_main/ShopMain';
import HeadBox from './HeadBox';
import Login from './component/user/Login';
import Sign from './component/user/Sign';
import Post from './component/product/Post';
import Item from './component/product/item/Item';



function App() {
  return (
    <div>
      <BrowserRouter>
        <HeadBox />
        <Routes>
          <Route path="/" element={<ShopMain />} />
          <Route path='/login' element={<Login />} />
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
