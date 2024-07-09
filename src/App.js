import React, { createContext, useEffect, useState } from 'react';
import { Button, Card, Carousel, Container, Form, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import MainPage from './mainPage/MainPage';
import Login from './Login';
import SellProducts from './SellProducts';
import './naverLogin';
import NaverLogin from './login/NaverLogin';

function App() {
  let navigate = useNavigate();
  let [loading,setLoading] = useState('')
  let [loginStatus,setLoginStatus] = useState('Login / Join');
  useEffect(()=>{
    setTimeout(()=>{ setLoading('load-end') }, 100);
    return(()=>{setLoading('')})
  },[])
  
  let[item,setItem] = useState('')
  

  return (
    <div className={"App load " + loading}>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand onClick={()=>{ navigate("/") }} style={{ fontFamily : 'maeumteo', fontSize : '35px', color : '#000', cursor: 'pointer' }}>마음터</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>navigate('/sellproducts')}>판매하기</Nav.Link>
            <Nav.Link href="#features">구매하기</Nav.Link>
            {loginStatus == 'Logout' ? <Nav.Link href="#pricing">내상점</Nav.Link> : null}
          </Nav>
          <Nav>
            <Button variant="outline-dark" onClick={()=>{ navigate("/login") }}>{loginStatus}</Button>
            {loginStatus == 'Logout' ? <Nav.Link style={{marginLeft : '15px' }} href="#home">내정보</Nav.Link> : null}
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<MainPage/>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="*" element={<MainPage/>}></Route>
        <Route path="/sellproducts" element={<SellProducts />}></Route>
        <Route path="/naverLogin" element={<NaverLogin/>}></Route>
      </Routes>

    </div>
  );
}

export default App;
