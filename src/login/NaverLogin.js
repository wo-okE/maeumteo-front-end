import { useEffect } from "react"
import './NaverLogin.css'
import axios from "axios"
const { naver } = window

const NaverLogin = ({ setGetToken, setUserInfo }) => {
    const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID
    console.log(process.env.REACT_APP_REDIRECT_URI)
    const NAVER_CALLBACK_URL = process.env.REACT_APP_REDIRECT_URI
    const NAVER_CLIENT_SECRET = process.env.REACT_APP_NAVER_CLIENT_SERECT
    const initializeNaverLogin = () => {
        const naverLogin = new naver.LoginWithNaverId({
			clientId : NAVER_CLIENT_ID,
			callbackUrl : NAVER_CALLBACK_URL,
            clientSecret : NAVER_CLIENT_SECRET,
			isPopup: false,
			loginButton: { color: "green", type: 1, height: 40, width: 40 }
		});
		naverLogin.init();

        naverLogin.getLoginStatus(async function(status) {
            if(status){
                const member = {
                    id : naverLogin.user.id,
                    username : naverLogin.user.name,
                    birthday : naverLogin.user.birthday,
                    nickname : naverLogin.user.nickname,
                    email : naverLogin.user.email
                }
                const checkId = await axios.post('/api/member/checkid',member)
                                     .then((data)=> {
                                        return data.data
                                      });
                if(checkId){ // 회원가입
                    const join = await axios.post('api/member/join', member)
                                            .then((data)=>{
                                                console.log(data.data);
                                            });
                    sessionStorage.setItem("member",join).then((data)=>{
                        console.log(data);
                    })
                } else { // 로그인

                }
            }
        })
    }
   
    const userAccessToken = () => {
        window.location.href.includes('access_token') && getToken()
    }
    const getToken = () => {
		const token = window.location.href.split('=')[1].split('&')[0]
	}
    useEffect(() => {
		initializeNaverLogin()
		userAccessToken()
	}, [])

    return (
        <>
            <a href="#" onClick={(e)=>{e.preventDefault(); }} id="naverIdLogin"></a>
            <a href="#" onClick={()=>{initializeNaverLogin.naverLogin.logout()}} id="naverIdLogout"></a>
        </>
    );
}

export default NaverLogin;