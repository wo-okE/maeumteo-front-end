import './KakaoLogin.css'

    const KakaoLogin =()=>{
      const KAKAO_REST_API_KEY=process.env.REACT_APP_KAKAO_REST_API_KEY
      const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI
      const link = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`

      const handleKakaoLogin = ()=>{
          window.location.href = link
      }
      return(
        <div id="kakaoIdLogin" onClick={handleKakaoLogin}></div>
        )
    }
export default KakaoLogin