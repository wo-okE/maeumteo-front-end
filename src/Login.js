import { useState } from 'react';
import './Login.css'
import NaverLogin from './login/NaverLogin';
import SocialKakao from './login/KakaoLogin';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setLoginStatus }){
    let [pageClass, setPageClass] = useState('');
    let navigate = useNavigate();
    
    function joinFormSubmit(e) {
        e.preventDefault();
        axios.post('/api/member/join', {
            id: document.getElementById("joinId").value,
            password: document.getElementById("joinPassword").value,
            username: document.getElementById("username").value,
            nickname: document.getElementById("nickname").value,
            birthday: document.getElementById("birthday").value
        }).then((response) => {
        }).catch((error) => {
            console.error('Error during join:', error);
        });
    }

    function loginFormSubmit(e) {
        e.preventDefault();
        axios.post('/api/member/login', {
            id: document.getElementById("loginId").value,
            password: document.getElementById("loginPassword").value
        }).then((response) => {
            localStorage.setItem('loginMember',response.data);
            setLoginStatus("Logout")
            navigate("/")
        }).catch((error) => {
            alert("아이디 또는 비밀번호를 확인해주세요.")
            console.error('Error during login:', error);
        });
    }

    function joinFormCheck(key) {
        let value
        switch (key) {
            case "nickname":
                value = document.getElementById("nickname").value;
                if(value){
                    axios.get(`/api/member/formcheck/${key}/${value}`).then((response)=>{
                        let formcheck = !response.data;
                        console.log(formcheck)
                    })
                }
                break;
            case "id":
                value = document.getElementById("joinId").value;
                if (!/^[a-z0-9-_]{3,16}$/.test(value)) {
                    alert("아이디는 4~16자의 알파벳,숫자, 혹은 - _ 으로 이루어져야 합니다.")
                    return false;
                }    
                if(value){
                    axios.get(`/api/member/formcheck/${key}/${value}`).then((response)=>{
                        console.log(response.data);
                    })
                }
                break;
            case "password":
                break;
            case "checkPassword":
        }
    }

    return (
        <>
            <div className="login-main">
                <div className={"login-form " + pageClass} id="loginCon">
                    <div className="form-container sign-up-container">
                        <form action="#" id="joinForm">
                            <h1>회원가입</h1>
                            <input type="text" placeholder="이름" name="username" id="username"/>
                            <input type="text" name="nickname" placeholder='닉네임' id="nickname" onChange={()=>{joinFormCheck("nickname")}}/>
                            <input type="text" name="birthday" placeholder='생일 (ex : 0101)' id="birthday"/>
                            <input type="text" placeholder="아이디" name="id" id="joinId" on onChange={()=>{joinFormCheck("id")}} />
                            <div style={{ fontSize: "11px" }}></div>
                            <input type="password" placeholder="비밀번호" name="password" id="joinPassword" />
                            <input type="password" placeholder="비밀번호 확인" />
                            <button className="custom-btn btn-5" onClick={(e)=>{joinFormSubmit(e)}}>회원가입</button>
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
                        <input type="text" placeholder="아이디" name="id" id="loginId" />
                        <input type="password" placeholder="비밀번호" name="password" id="loginPassword"/>
                        <a href="#">비밀번호 찾기</a>
                        <button className="custom-btn btn-5" onClick={(e)=>{loginFormSubmit(e)}}>로그인</button>
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