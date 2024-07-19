import React, { createContext, useEffect, useState } from 'react';
import { Button, Card, Carousel, Container, Form, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import MainPage from './mainPage/MainPage';
import Login from './Login';
import SellProducts from './SellProducts';
import Swal from 'sweetalert2';
import axios from 'axios';
import NaverLogin from './login/NaverLogin';

function App() {
  let navigate = useNavigate();
  let [loading,setLoading] = useState('')
  let [loginStatus,setLoginStatus] = useState('Login / Join');

  useEffect(()=>{
    axios.post('/api/member/authentication').then((res)=>{
      console.log('tlfgod')
      if(res.data.username !== null){
        setLoginStatus('Logout')
      } else {
        setLoginStatus('Login / Join')
      }
    })

  let nickChk = localStorage.getItem('nickNameChk') === 'false' ? false : true;

  if(!nickChk && localStorage.getItem('loginMember') != null){
    Swal.fire({
      title: localStorage.getItem('loginMember')+'님\n닉네임을 설정해주세요.',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: false,
      confirmButtonText: '확인',
      showLoaderOnConfirm: true,
      preConfirm: async (value) => {
        if(!/^(?=.*[a-z0-9가-힣-_])[a-z0-9가-힣-_]{2,16}$/.test(value)){
          Swal.showValidationMessage(
              '2~16자의 영어,한글,숫자, -_ 조합이어야 합니다.'
          )
        }
        try {
          const response = await axios.get(`/api/member/formcheck/nickname/${value}`)
          if(!response.data){
            Swal.showValidationMessage(
              '이미 존재하는 닉네임입니다.'
            )
            return false;
          }
          return value;
        } catch(error) {
          Swal.showValidationMessage(
            '이미 존재하는 닉네임입니다.'
          )
          return false;
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then(result => {
      if(result.isConfirmed){
        Swal.fire({
            title: result.value,
            text: '위 닉네임으로 저장하시겠습니까?',
            icon : 'warning',
            showCancelButton : true,
            confirmButtonText : '저장',
            cancelButtonText : '취소'
        }).then(data => {
            if(data.isConfirmed){
                axios.get(`/api/member/nickname/save/${result.value}`).then(res => {
                    localStorage.setItem("loginMember",res.data);
                    Swal.fire({
                        title : res.data + "님 환영합니다!",
                        icon : 'success'
                    })
                    localStorage.setItem('nickNameChk',true);
                    navigate("/")
                })
            }
        })
      }
    })
  }

    setTimeout(()=>{ setLoading('load-end') }, 100);
    return(()=>{setLoading('')})
  },[])
  
  let[item,setItem] = useState('')

  const handleLogout = async () => {
    try {
      setLoginStatus('Login / Join');
      navigate('/login');
      let logoutMsg = await axios.post('/api/member/logout').then((res)=>{console.log(res)});
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const loginAndlogout = () => {
    if (loginStatus === 'Login / Join') {
      navigate("/login");
    } else {
      Swal.fire({
        title: '로그아웃하시겠습니까?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: '확인',
        cancelButtonText: '취소'
      }).then((data) => {
        if (data.isConfirmed) {
          handleLogout();
        }
      });
    }
  }

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
            <Button variant="outline-dark" onClick={loginAndlogout}>{loginStatus}</Button>
            {loginStatus == 'Logout' ? <Nav.Link style={{marginLeft : '15px' }} href="#home">내정보</Nav.Link> : null}
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<MainPage/>}></Route>
        <Route path="/login" element={<Login setLoginStatus={setLoginStatus}/>}></Route>
        <Route path="*" element={<MainPage/>}></Route>
        <Route path="/naverLogin" element={<NaverLogin setLoginStatus={setLoginStatus}/>}></Route>
        <Route path="/sellproducts" element={<SellProducts />}></Route>
      </Routes>

    </div>
  );
}

export default App;
