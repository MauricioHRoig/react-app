
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import { GameContainer } from './components/GameListContainer/GameContainer';
import GameDetailItem from './components/GameListContainer/GameDetail/GameDetailItem';
import CartProvider from './context/cartContext';
import Cart from "./components/GameListContainer/cart/Cart"
import Checkout from './components/GameListContainer/form/Checkout';

function App() {

  return (
    <CartProvider>
      <BrowserRouter>
        <NavBar />
        <div className='app-div'>
          <Routes>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/" element={<GameContainer />}></Route>
            <Route path="/category/:categoryId" element={<GameContainer />}></Route>
            <Route path="/game/:gameId" element={<GameDetailItem stock={5} initial={1} />}></Route>
            <Route path="/checkout" element={<Checkout />}></Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
