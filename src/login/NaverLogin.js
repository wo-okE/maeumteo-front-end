import { useEffect } from "react"
import './NaverLogin.css'
import axios from "axios"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
const { naver } = window

const NaverLogin = ({ setGetToken, setUserInfo, setLoginStatus }) => {
    const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID
    const NAVER_CALLBACK_URL = process.env.REACT_APP_NAVER_REDIRECT_URI
    const NAVER_CLIENT_SECRET = process.env.REACT_APP_NAVER_CLIENT_SERECT
    let navigate = useNavigate();
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
                let member = {
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
                    if(naverLogin.user.nickname != null){
                        const nicknameChk = await axios.get(`/api/member/formcheck/nickname/${naverLogin.user.nickname}`)
                                 .then(response => {
                                    return response.data === '' ? false : true
                                 })
                        if(!nicknameChk) {
                            member.nickname = null
                            await Swal.fire({
                                title: naverLogin.user.name+'님\n닉네임을 설정해주세요.',
                                text : '닉네임 중복으로 기존 닉네임을 사용할 수 없습니다.',
                                input: 'text',
                                icon : 'warning',
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
                                console.log(result)
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
                                        member.nickname = result.value;
                                        const join = axios.post('api/member/naverJoin', member)
                                            .then((data)=>{
                                                localStorage.setItem("loginMember",member.nickname);
                                                Swal.fire({
                                                    title : member.nickname + "님 환영합니다!",
                                                    icon : 'success'
                                                })
                                                localStorage.setItem('nickNameChk',true);
                                                navigate("/")
                                            });
                                      }
                                  })
                                }
                              })
                        } else {
                            const join = await axios.post('api/member/naverJoin', member)
                                            .then((data)=>{
                                                console.log(member)
                                                localStorage.setItem("loginMember", member.nickname);
                                                localStorage.setItem('nickNameChk',true);
                                                navigate("/")
                                            });
                        }
                    }
                } else { // 로그인
                    axios.post('/api/member/naverLogin', member).then((response) => {
                        navigate("/")
                    })
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
            <div id="naverIdLogin"></div>
    );
}

export default NaverLogin;