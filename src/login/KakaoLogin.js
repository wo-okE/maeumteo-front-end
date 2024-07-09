    import axios from "axios";
import KakaoLogin from "react-kakao-login";

    const SocialKakao =()=>{
    
        const kakaoClientId = '클라이언트ID'
        const kakaoOnSuccess = async (data)=>{
              console.log(data)
            const idToken = data.response.access_token
            const kakaoResponse = await axios.post('https://kapi.kakao.com/v2/user/me',
                {
                  headers: {
                    Authorization: `Bearer ${idToken}`,
                  },
                  username: ""
                }
              ).then(function(response){
                console.log(response);
              });

              console.log(kakaoResponse)
        }
        const kakaoOnFailure = (error) => {
            console.log(error);
        };

        
        return(
            <>
              <KakaoLogin
                  token={kakaoClientId}
                  onSuccess={kakaoOnSuccess}
                  onFail={kakaoOnFailure}
              />
            </>
        )
    }    
export default SocialKakao