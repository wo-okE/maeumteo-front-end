import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const KakaoCallback = ({ loginStatus, setLoginStatus }) => {
    
    const navigate = useNavigate();
    const code = new URL(window.location.href).searchParams.get("code");
    console.log(`${code}`)
    useEffect(() => {
        const kakaoLogin = async () => {
          await axios.post('api/member/kakao/callback',
          {
            'code' : `${code}`
          },
          {
            headers: {
              "Content-Type": "application/json;charset=utf-8"
            },
          }).then((res) => { 
            console.log(res);
            localStorage.setItem("name", res.data.account.kakaoName);
            navigate("/");
          }).catch(err => {
            console.log(err)
          });
        };

        kakaoLogin();
      }, []);
    
    return <></>
}
    
    export default KakaoCallback;