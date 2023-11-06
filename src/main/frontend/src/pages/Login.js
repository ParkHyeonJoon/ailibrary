import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Header from "../components/Header";
import Button from "../common/Button";
import { Link, useNavigate } from "react-router-dom";
import { fetchWithToken } from "../api/api"; // api.js 모듈에서 fetchWithToken 함수를 가져옵니다.

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #ffffff;
  color: #000000;
`;

const LoginArea = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 160px;
`;

const Title = styled.p`
  font-size: 30px;
  font-weight: bold;
  margin-top: 40px;
`;

const InputArea = styled.div`
  width: 300px;
  height: 40px;
  background: #ffffff;
  border: 2px solid #c4c4c4;
  display: flex;
  align-items: center;
  justify-content: center;

  &:first-of-type {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  &:last-of-type {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border-top: none;
  }
`;

const StyledInput = styled.input`
  border: none;
  width: 280px;
  height: 30px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const CheckboxInput = styled.input`
  margin-right: 5px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
`;

function Login({onLogin}) {
    // 로그인 폼의 상태 관리
    const [formData, setFormData] = useState({
        userId: localStorage.getItem('savedId') || '', // 페이지 로드 시 저장된 아이디 불러오기
        userPw: '',
    });

    // 아이디 저장 체크박스 상태 관리
    const [saveId, setSaveId] = useState(false);

    // 로그인 상태를 관리하기 위한 상태 변수와 업데이트 함수 설정
    const [loginStatus, setLoginStatus] = useState('');

    const navigate = useNavigate();
    // 폼 입력값 변경 시 이벤트 핸들러
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    // 페이지 로드 시 저장된 아이디를 불러와서 폼 데이터에 설정
    useEffect(() => {
        const savedId = localStorage.getItem('savedId');
        if (savedId) {
            setFormData({
                ...formData,
                userId: savedId,
            });
            setSaveId(true);
        }
    }, []); // 빈 배열을 전달하여 페이지 로드 시 한 번만 실행

    // 아이디 저장 체크박스 상태 변경 시 이벤트 핸들러
    const handleSaveIdChange = (e) => {
        setSaveId(e.target.checked);
    };

    // 폼 제출 시 이벤트 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();
        // 클라이언트 사이드에서 서버로 로그인 정보를 전송
        try {
            // 로그인 API 엔드포인트 URL
            const loginUrl = 'http://localhost:8080/api/authenticate';

            // 로그인에 필요한 사용자 정보 (예: 아이디와 비밀번호)
            const loginData = {
                userId: formData.userId,
                userPw: formData.userPw,
            };

            // fetchWithToken 함수를 사용하여 로그인 API 호출
            const response = await fetchWithToken(loginUrl, 'POST', loginData);
            const token = response.headers.get("authorization");
            const res = await response.json()

            // 응답을 처리하고 로그인이 성공했는지 확인하는 로직을 작성합니다.
            if (token) {
                // 성공적으로 토큰을 받았을 경우
                setLoginStatus('로그인 성공');

                localStorage.setItem("userInfo", JSON.stringify(res)); // 사용자 정보 저장
                localStorage.setItem('token', token); // 로컬 스토리지에 토큰 저장

                alert(res.userName + '님 반갑습니다!');

                // 성공 시 메인 페이지로 이동
                navigate('/');
            } else {
                // 토큰이 없는 경우
                setLoginStatus('로그인 실패: 토큰 없음');
            }
        } catch (error) {
            console.error('로그인 오류:', error);
            setLoginStatus('로그인 중 오류 발생');
        }

        // 아이디 저장 체크박스가 체크되어 있다면 아이디를 저장할 수 있습니다.
        if (saveId) {
            // 아이디를 로컬 스토리지에 저장
            localStorage.setItem('savedId', formData.userId);
        } else {
            // 체크가 해제된 경우 저장된 아이디를 삭제
            localStorage.removeItem('savedId');
        }
    };

    return (
        <Wrapper>
            <Header />
            <LoginArea>
                <Title>로그인</Title>
                <LoginForm onSubmit={handleSubmit}>
                    <InputArea>
                        <StyledInput
                            type="text"
                            id="userId"
                            name="userId"
                            value={formData.userId}
                            onChange={handleInputChange}
                            required
                        />
                    </InputArea>
                    <InputArea>
                        <StyledInput
                            type="password"
                            id="userPw"
                            name="userPw"
                            value={formData.userPw}
                            onChange={handleInputChange}
                            required
                        />
                    </InputArea>
                    <CheckboxLabel>
                        <CheckboxInput
                            type="checkbox"
                            id="saveId"
                            name="saveId"
                            checked={saveId}
                            onChange={handleSaveIdChange}
                        />
                        아이디 저장
                    </CheckboxLabel>
                    <Button type="submit">로그인</Button>
                </LoginForm>
                <p>
                    &nbsp;&nbsp;계정과 비밀번호 입력 없이<br />카카오톡으로 로그인해보세요
                </p>
                <Button backgroundColor="#FDDC3F" textColor="#3A2929" type="submit">
                    카카오톡으로 로그인
                </Button>
                <Link to="/signup" style={{ textDecoration: 'none' }}>
                    <Button border="1px solid #1D2B74" backgroundColor="white" textColor="black">
                        회원가입
                    </Button>
                </Link>
                <p>{loginStatus}</p>
            </LoginArea>
        </Wrapper>
    );
}

export default Login;
