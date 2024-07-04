import { Card } from "react-bootstrap";
import defaultImg from "../img/common/defaultImg.png"
import './CardData.css';
import '../App.css';

function CardData({ item }){
    let diff = new Date(item.createAt).getTime() - new Date().getTime();
    // changeTime 함수는 아래에서 만듦.
    let hour = changeTime(Math.floor((diff / (1000 * 60 *60 )) % 24 ));
    let minute = changeTime(Math.floor(((diff / (1000 * 60 )) % 60 )));
    let second = changeTime(Math.floor((diff / 1000) % 60));

    return (
      <Card className='cardDataSet'>
          <Card.Img variant="top" src={item.imgurl == null ? defaultImg : item.imgurl} className="cardImg"/>
          <Card.Body>
            <Card.Title className="cardTitle">
              <h4 className="cardTitle-name">{item.itemname}</h4>
              <span>{hour}:{minute}:{second}</span>
            </Card.Title>
            <Card.Text>
              <div style={{ textAlign : 'right' }}>입찰자 <b style={{ color : '#32cd32'}}>{item.bidCount}</b></div>
            </Card.Text>
            <div style={{ textAlign : 'right' }}>{item.bidPrice.toLocaleString()}원</div>
          </Card.Body>
      </Card>
    )
  }

  function changeTime(time){
    if( time < 10 && time > 0){
      return '0' + time;
    } else if(time > 10){
      return time;
    } else {
      return '00';
    }
  }

  export default CardData;