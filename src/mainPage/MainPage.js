import { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import CardData from "./CardData";
import { useQuery } from "react-query";
import axios from "axios";

function MainPage(){
    var items = useQuery('allItems', ()=>{
      return axios.get('/api/allItems')
      .then((a)=>{
        return a.data
      })}).data;
      
    let TimeCal = [0,0,0];
    let [hour, setHour] = useState(0);
    let [minute, setMinute] = useState(0);
    let [second, setSecond] = useState(0);
  
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
                          <p>
                            Interdum et malesuada fames ac ante ipsum primis in 
                          faucibus. Mauris eleifend sagittis mollis. 
                          Nulla finibus arcu eu tortor gravida aliquet
                          </p>
                      </div>
                      <button>SHOP NOW</button>
                  </div>
              </div>
          </Carousel.Item>
        </Carousel>
        <div className='container'>
            {items && items.map((item,i) => {
                return (<CardData item={item} key={item.id} />)
              })}
        </div>
      </>
    )
  }

  export default MainPage;