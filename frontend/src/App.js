import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import ProductDetails from './pages/ProductDetails';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import './assets/css/style.css';
import Dashboard from './pages/Dashboard';
import NavMenu from './components/Navbar';
import SideBar from './components/SideBar';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';

function App() {
  const {userData} = useSelector(state => state.user)

  return (
    <>
   
    <Router>
    { userData &&
      <>
      <NavMenu />
      <SideBar />
      </>
    }
      <Routes>
        <Route exact path="/" element={<Login/>}></Route>
        <Route exact path="/register" element={<Register/>}></Route>
        <Route exact path="/dashboard" element={<Dashboard/>}></Route>
        <Route exact path="/products" element={<ProductList/>}></Route>
        <Route exact path="/products/add" element={<AddProduct/>}></Route>
        <Route exact path="/products/edit/:id" element={<EditProduct/>}></Route>
        <Route exact path="/products/:id" element={<ProductDetails/>}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
