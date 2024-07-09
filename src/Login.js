import { useState } from 'react';
import './Login.css'
import NaverLogin from './login/NaverLogin';
import SocialKakao from './login/KakaoLogin';

function Login(){
    let [pageClass, setPageClass] = useState('');

    return (
        <>
            <div className="login-main">
                <div className={"login-form " + pageClass} id="loginCon">
                    <div className="form-container sign-up-container">
                        <form action="#">
                            <h1>회원가입</h1>
                            <input type="text" placeholder="이름" name="membername"/>
                            <input type="text" name="nickname" placeholder='닉네임'/>
                            <input type="text" name="birthday" placeholder='생일 (ex : 0101)'/>
                            <input type="text" placeholder="아이디" name="memeberId"/>
                            <input type="password" placeholder="비밀번호" name="password" />
                            <input type="password" placeholder="비밀번호 확인" />
                            <button className="custom-btn btn-5">회원가입</button>
                        </form>
                    </div>
                    <div className="form-container sign-in-container">
                    <form action="#">
                        <h1>로그인</h1>
                        <div className="social-container">
                            <NaverLogin/>
                            <SocialKakao/>
                            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <span>또는 일반 로그인</span>
                        <input type="email" placeholder="아이디" />
                        <input type="password" placeholder="비밀번호" />
                        <a href="#">비밀번호 찾기</a>
                        <button className="custom-btn btn-5">로그인</button>
                    </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>어서오세요😄</h1>
                                <p>로그인 후, 모든 기능을 사용해보세요!</p>
                                <button className="ghost" id="signIn" onClick={() => setPageClass('')}>로그인</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>안녕하세요😄</h1>
                                <p>필요한 정보를 입력하고 회원으로 시작하세요!</p>
                                <button className="ghost" id="signUp" onClick={() => setPageClass('right-panel-active')}>회원가입</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;