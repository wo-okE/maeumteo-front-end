import React, { useEffect, useState } from 'react';
import { Button, Card, Carousel, Container, Form, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';


function App() {

  let [loading,setLoading] = useState('')

  let navigate = useNavigate();


  useEffect(()=>{
    setTimeout(()=>{ setLoading('load-end') }, 100);
    console.log(loading);
    return(()=>{setLoading('')})
  },[])

  // axios.get('')

  return (
    <div className={"App load " + loading}>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand onClick={()=>{ navigate("/") }} style={{ fontFamily : 'maeumteo', fontSize : '35px', color : '#000', cursor: 'pointer' }}>마음터</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">판매하기</Nav.Link>
            <Nav.Link href="#features">구매하기</Nav.Link>
            <Nav.Link href="#pricing">내상점</Nav.Link>
          </Nav>
          <Button variant="outline-dark">Login / Join</Button>
        </Container>
      </Navbar>


      <Routes>
        <Route path="/" element={<MainPage/>}></Route>
        <Route path="*" element={<div>잘못된 접근입니다.</div>}></Route>
      </Routes>


    </div>
  );
}

function MainPage(){
  let TimeCal = [0,0,0];
  let [hour, setHour] = useState(23 - 0);
  let [minute, setMinute] = useState(59 - 0);
  let [second, setSecond] = useState(59 - 0);

  useEffect(()=>{
    const id = setInterval(()=>{
      setHour(23 - new Date().getHours())
      setMinute(59 - new Date().getMinutes())
      setSecond(59 - new Date().getSeconds())
    },1000);
    return ()=>clearInterval(id)
  },[])

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return(
    <>
      <Carousel>
        <Carousel.Item>
            <div className='slidercontents'>
              <div className='wrapText' style={{ display: 'flex', justifyContent : 'center' }}>
                <h1 style={{ color: 'white' }}>광고</h1>
                <div className="d-none d-md-block">
                  <p>
                    Interdum et malesuada fames ac ante ipsum primis in 
                    faucibus. Mauris eleifend sagittis mollis. 
                    Nulla finibus arcu eu tortor gravida aliquet
                  </p>
                </div>
              </div>
            </div>
        </Carousel.Item>
        <Carousel.Item>
            <div className='slidercontents' style={{ backgroundColor : '' }}>
                <div className='wrapText'>
                    <h1>Organic fresh fruits for your health</h1>
                    <div className="d-none d-md-block">
                        <p>Interdum et malesuada fames ac ante ipsum primis in 
                        faucibus. Mauris eleifend sagittis mollis. 
                        Nulla finibus arcu eu tortor gravida aliquet</p>
                    </div>
                    <button>SHOP NOW</button>
                </div>
            </div>
        </Carousel.Item>
      </Carousel>
      {/* style={{ display: 'flex', justifyContent : 'left', alignItems : 'center', flexWrap: 'wrap' }} */}
      <div className='container' style={{ display: 'flex', alignItems : 'center', justifyContent: 'flex-start', flexWrap : 'wrap' }}>
        <CardData/>
        <CardData/>
        <CardData/>
        <CardData/>
        <CardData/>
        <CardData/>
      </div>
    </>
    // <div>{hour < 10 ? '0' + hour : hour}:{minute < 10 ? '0' + minute : minute}:{second < 10 ? '0' + second : second}</div>
  )
}


function CardData(){
  return (
    <Card style={{ width: '100%', margin : '30px' }}>
        <Card.Img variant="top" src="https://cdn-thumbs.imagevenue.com/67/4d/53/ME18HUIF_t.png" style={{ width : '100%', height : '180px', objectFit : 'cover', borderBottom : '1px solid rgba(0, 0, 0, 0.175)', overflow : 'hidden' }} />
        <Card.Body>
          <Card.Title style={{ display : 'flex' , justifyContent : 'space-between'}}><h4 style={{ width : '130px',textOverflow : 'ellipsis', textAlign : 'left' }}>상품명</h4> <span>12:00:00</span></Card.Title>
          <Card.Text>
            <div style={{ textAlign : 'right' }}>입찰자 <b style={{ color : '#32cd32'}}>5</b></div>
          </Card.Text>
          <div style={{ textAlign : 'right' }}>50,000원</div>
        </Card.Body>
    </Card>
  )
}

export default App;
