
import {BrowserRouter, Routes,Route, Link} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useContext } from 'react';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SignupScreen from './screens/SignupScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import { BsFillCartDashFill } from "react-icons/bs";
import { AiOutlineUserAdd } from "react-icons/ai";
import { GiClothes } from "react-icons/gi";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProductEditScreen from './screens/ProductEditScreen';

function App() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };
  return (
    <BrowserRouter>
    <div className='d-flex flex-column site-container'>
    <ToastContainer position="bottom-center" limit={1} />
      <header>
      <Navbar >
            <Container>
              <LinkContainer className='logo' to="/">
                <Navbar.Brand><GiClothes/></Navbar.Brand>
              </LinkContainer>
              <Nav className="navbar">
                <Link to="/cart"  className="nav-link">
                <BsFillCartDashFill/>
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                
                </Link>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                      
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signoutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/signin">
                    <AiOutlineUserAdd/>
                  </Link>
                )}
              </Nav>
            </Container>
          </Navbar>
          
      </header>
      <main>
      <Container className="mt-3">
        <Routes>
        <Route path="/product/:slug" element={<ProductScreen/>} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/signin" element={<SigninScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/payment" element={<PaymentMethodScreen />}></Route>
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/" element={<HomeScreen/>} />
        <Route path="/order/:id" element={<OrderScreen />}></Route>
        <Route
                path="/edit" element={<ProductEditScreen />}
              ></Route>
        <Route
                path="/orderhistory"
                element={<OrderHistoryScreen />}
              ></Route>
        <Route
                path="/shipping"
                element={<ShippingAddressScreen />}
              ></Route>
        </Routes>
        </Container>
      </main>
      <footer> <div className='text-center'></div></footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
