import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Header from "../components/Header";
import Button from "../common/Button";
import {Link} from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 150px;
`;
const LoginArea = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Title = styled.p`
  font-size: 30px;
  font-weight: bold;
  margin-top: 40px;
`;
const InputArea = styled.div`
  width: 300px;
  height: 40px;
  border: 2px solid #cecece;
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
//TODO: 정규식 이용해서 아이디 형식 검증
//const isValidId = (id) => {
//   // 정규식을 사용하여 아이디 형식을 검증
//   const idRegex = /^[a-zA-Z0-9]{4,16}$/; // 예: 길이가 4에서 16자 사이의 영문자와 숫자만 허용
//   return idRegex.test(id);
// };

function Login() {
    // 로그인 폼의 상태 관리
    const [formData, setFormData] = useState({
        id: localStorage.getItem('savedId') || '', // 페이지 로드 시 저장된 아이디 불러오기
        password: '',
    });

    // 아이디 저장 체크박스 상태 관리
    const [saveId, setSaveId] = useState(false);

    // 로그인 상태를 관리하기 위한 상태 변수와 업데이트 함수 설정
    const [loginStatus, setLoginStatus] = useState('');

    // 폼 입력값 변경 시 이벤트 핸들러
    const handleInputChange = (e) => {
        const {name, value} = e.target;
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
                id: savedId,
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
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                if (data) {
                    // 성공적인 JSON 데이터 처리
                    setLoginStatus('로그인 성공');
                } else {
                    // JSON 데이터가 비어 있는 경우 처리
                    setLoginStatus('로그인 실패: 빈 응답');
                }
            } else {
                // 서버에서 오류 응답을 보낸 경우 처리
                setLoginStatus('로그인 실패: 서버 오류');
            }
        } catch (error) {
            console.error('로그인 오류:', error);
            setLoginStatus('로그인 중 오류 발생');
        }

        // 아이디 저장 체크박스가 체크되어 있다면 아이디를 저장할 수 있습니다.
        if (saveId) {
            // 아이디를 로컬 스토리지에 저장
            localStorage.setItem('savedId', formData.id);
        } else {
            // 체크가 해제된 경우 저장된 아이디를 삭제
            localStorage.removeItem('savedId');
        }
    };

    return (
        <Wrapper>
            <Header/>
            <LoginArea>
                <Title>로그인</Title>
                <LoginForm onSubmit={handleSubmit}>
                    <InputArea>
                        <StyledInput
                            type="text"
                            id="id"
                            name="id"
                            value={formData.id}
                            onChange={handleInputChange}
                            required
                        />
                    </InputArea>
                    <InputArea>
                        <StyledInput
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
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
                    &nbsp;&nbsp;계정과 비밀번호 입력 없이<br/>카카오톡으로 로그인해보세요
                </p>
                <Button backgroundColor="#FDDC3F" textColor="#3A2929" type="submit">
                    카카오톡으로 로그인
                </Button>
                <Link to="/signup" style={{textDecoration: 'none'}}>
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
