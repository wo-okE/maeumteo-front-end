import { useEffect, useState } from 'react';
import './Login.css'
import NaverLogin from './login/NaverLogin';
import SocialKakao from './login/KakaoLogin';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Login({ setLoginStatus }){
    let [pageClass, setPageClass] = useState('');
    let [idCheck, setIdCheck] = useState('');
    let [idDuplication, setIdDuplication] = useState(false);
    let [borderClass, setBorderClass] = useState('')
    let navigate = useNavigate();

    function classNameDelete(e){
        if(borderClass == e.target.id){
            setBorderClass('')
        }
        if(e.target.id == '' && borderClass == 'joinPassword'){
            setBorderClass('')
        }
    }

    function joinFormSubmit(e) {
        
        e.preventDefault();
        const username = document.getElementById('username').value;
        const userpw = document.getElementById('joinPassword');
        const userpwChk = userpw.nextSibling.value;
        let pwCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/.test(userpw.value)
        if(!username){
            Swal.fire({
                icon: 'warning',
                title: '이름이 비어있습니다.'
            });
            setBorderClass('username')
            return false;
        }
        if(!/^[가-힣]{2,4}$/.test(username)){
            Swal.fire({
                icon: 'warning',
                title: '올바른 이름을 작성해주세요.',
                text : '(한글 2~4자)'
            });
            setBorderClass('username')
            return false;
        }
        if(!idDuplication){
            Swal.fire({
                icon: 'warning',
                title: '중복확인 후 진행해주세요.'
            });
            return false;
        }
        if(!userpw.value) {
            Swal.fire({
                icon: 'warning',
                title: '비밀번호를 입력해주세요.'
            });
            setBorderClass('joinPassword')
            return false;
        }
        if(!userpwChk){
            Swal.fire({
                icon: 'warning',
                title: '확인 비밀번호를 입력해주세요.'
            });
            setBorderClass('joinPasswordChk')
            return false;
        }
        if(!(userpw.value === userpwChk)) {
            Swal.fire({
                icon: 'warning',
                title: '비밀번호가 일치하지 않습니다.'
            });
            setBorderClass('joinPasswordChk')
            return false;
        }
        if(!pwCheck){
            Swal.fire({
                icon: 'warning',
                title: '비밀번호는 영어, 숫자, 특수기호가\n포함된 8자 이상이어야 합니다.'
            });
            setBorderClass('joinPassword')
            return false;
        }
        axios.post('/api/member/join', {
            id: document.getElementById("joinId").value,
            password: document.getElementById("joinPassword").value,
            username: document.getElementById("username").value
        }).then((response) => {
            document.querySelectorAll('#joinForm input').forEach((joinInput)=>{
                joinInput.value = ''
                setIdDuplication(false)
            })
            setIdCheck('')
            if(response.data.hasOwnProperty('loginUsername')){
                localStorage.setItem('loginMember',response.data.loginUsername);
            } else {
                localStorage.setItem('loginMember',response.data.loginNickname);
            }
            localStorage.setItem('nickNameChk',false);
            setLoginStatus("Logout")

            Swal.fire({
                title: response.data.loginUsername+'님\n닉네임을 설정해주세요.',
                input: 'text',
                inputAttributes: {
                  autocapitalize: 'off'
                },
                showCancelButton: false,
                confirmButtonText: '확인',
                showLoaderOnConfirm: true,
                preConfirm: (value) => {
                  if(!/^(?=.*[a-z0-9가-힣-_])[a-z0-9가-힣-_]{2,16}$/.test(value)){
                    Swal.showValidationMessage(
                        '2~16자의 영어,한글,숫자, -_ 조합이어야 합니다.'
                    )
                  } else {
                        axios.get(`/api/member/formcheck/nickname/${value}`)
                             .then(response => {
                                if(response.data == null) {
                                    throw new Error(response.statusText)
                                }
                        }).catch(error => {
                          Swal.showValidationMessage(
                            '이미 존재하는 닉네임입니다.'
                          )
                        })
                  }
                },
                allowOutsideClick: () => !Swal.isLoading()
              }).then((result) => {
                if(result.value){
                    Swal.fire({
                        title: result.value,
                        text: '위 닉네임으로 저장하시겠습니까?',
                        icon : 'warning',
    
                        showCancelButton : true,
                        confirmButtonText : '저장',
                        cancelButtonText : '취소'
                    }).then(data => {
                        if(data.isConfirmed){
                            axios.get(`/api/member/nickname/save/${result.value}`).then(res => {
                                localStorage.setItem("loginMember",res.data);
                                Swal.fire({
                                    title : res.data + "님 환영합니다!",
                                    icon : 'success'
                                })
                                localStorage.setItem('nickNameChk',true);
                                navigate("/")
                            })
                        }
                    })
                }
              })
        });
    }

    function loginFormSubmit(e) {
        e.preventDefault();
        axios.post('/api/member/login', {
            id: document.getElementById("loginId").value,
            password: document.getElementById("loginPassword").value
        }).then((response) => {
            if(response.data.hasOwnProperty('loginUsername')){
                localStorage.setItem('loginMember',response.data.loginUsername);
            } else {
                localStorage.setItem('loginMember',response.data.loginNickname);
            }
            setLoginStatus("Logout")
            navigate("/")
        }).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: '아이디 또는 비밀번호를 확인해주세요.'
            });
        });
    }

    function joinFormCheck(e) {
        e.preventDefault();
        let value = document.getElementById("joinId").value;
        if(value){
            if (!/^[a-z0-9-_]{3,16}$/.test(value)) {
                setIdCheck("4~16자의 영어,숫자, -_ 조합이어야 합니다.");
                setIdDuplication(false)
                return false;
            }
            axios.get(`/api/member/formcheck/id/${value}`).then((response)=>{
                if(response.data != null){
                    setIdCheck('사용가능한 ID입니다.');
                    setIdDuplication(true)
                } else {
                    setIdCheck('이미 존재하는 ID입니다.');
                    setIdDuplication(false)
                    return false;
                }
            })
        } else {
            setIdCheck('아이디 입력 후 눌러주세요.');
            setIdDuplication(false);
            return false;
        }
    }

    return (
        <>
            <div className="login-main">
                <div className={"login-form " + pageClass} id="loginCon">
                    <div className="form-container sign-up-container">
                        <form action="#" id="joinForm">
                            <h1>회원가입</h1>
                            <div className="social-container">
                            </div>
                            <input type="text" placeholder="이름" name="username" id="username" className={borderClass == 'username' ? 'warning' : ''} onFocus={(e)=>{classNameDelete(e)}}/>
                            <input type="text" placeholder="아이디" name="id" id="joinId" className={borderClass == 'id' ? 'warning' : ''} onFocus={(e)=>{classNameDelete(e)}} onChange={()=>{
                                setIdCheck('')
                                setIdDuplication(false)
                            }}/>
                            <p id="idCheckText"><span style={{color : idDuplication ? 'green' : 'red'}}>{idCheck}</span><button id="checkBtn" onClick={(e)=>{joinFormCheck(e)}}>중복확인</button></p>
                            <input type="password" placeholder="비밀번호" name="password" id="joinPassword" className={borderClass == 'joinPassword' ? 'warning' : ''} onFocus={(e)=>{classNameDelete(e)}}/>
                            <input type="password" placeholder="비밀번호 확인" id='joinPasswordChk' className={borderClass == 'joinPasswordChk' ? 'warning' : ''} onFocus={(e)=>{classNameDelete(e)}}/>
                            <button className="custom-btn btn-5" onClick={(e)=>{joinFormSubmit(e)}}>회원가입</button>
                        </form>
                    </div>
                    <div className="form-container sign-in-container">
                    <form action="#">
                        <h1>로그인</h1>
                        <div className="social-container">
                            <NaverLogin setLoginStatus={setLoginStatus}/>
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