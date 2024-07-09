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
        <Carousel data-bs-theme="dark" style={{ width:'56%', margin : '30px auto 0' }}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://media.bunjang.co.kr/images/nocrop/1215798984_w1197.jpg"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://media.bunjang.co.kr/images/nocrop/1216708141_w1199.jpg"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://media.bunjang.co.kr/images/nocrop/1218684356_w1199.jpg"
              alt="Third slide"
            />
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