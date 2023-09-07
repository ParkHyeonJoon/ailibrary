import React, { useState } from 'react';
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

function Login() {
    // 로그인 폼의 상태 관리
    const [formData, setFormData] = useState({
        id: '',
        password: '',
    });

    // 아이디 저장 체크박스 상태 관리
    const [saveId, setSaveId] = useState(false);

    // 폼 입력값 변경 시 이벤트 핸들러
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // 아이디 저장 체크박스 상태 변경 시 이벤트 핸들러
    const handleSaveIdChange = (e) => {
        setSaveId(e.target.checked);
    };

    // 폼 제출 시 이벤트 핸들러
    const handleSubmit = (e) => {
        e.preventDefault();
        // 여기에서 실제 로그인 로직을 구현하거나 API 호출을 수행할 수 있습니다.
        // formData를 사용하여 이메일과 패스워드를 얻을 수 있습니다.
        console.log('로그인 시도:', formData);

        // 아이디 저장 체크박스가 체크되어 있다면 아이디를 저장할 수 있습니다.
        if (saveId) {
            // TODO: 아이디 저장 로직을 추가하세요.
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
                            type="id"
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
                <Link to="/signup" style={{ textDecoration: 'none' }}>
                    <Button border="1px solid #1D2B74" backgroundColor="white" textColor="black">
                        회원가입
                    </Button>
                </Link>
            </LoginArea>
        </Wrapper>
    );
}

export default Login;
