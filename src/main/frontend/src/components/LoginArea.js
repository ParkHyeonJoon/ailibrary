import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 20px;
  justify-content: flex-end;
  align-items: center;
  gap: 26px;
  flex-shrink: 0;
  background: #B3C4FF;
`;

const CustomLink = styled(Link)`
  text-decoration: none; /* 밑줄 제거 */
  color: white;
`;

const Text = styled.p`
  cursor: pointer;
  font-size: 7px;
  margin-right: 0;
  font-family: Inter;
  font-weight: 700;
  word-wrap: break-word;

  &:last-child {
    margin-right: 20px;
  }
`;

function LoginArea() {
    return (
        <Wrapper>
            <CustomLink to="/login">
                <Text style={{ cursor: 'pointer' }}>로그인</Text>
            </CustomLink>
            <CustomLink to="/signup">
                <Text style={{ cursor: 'pointer' }}>회원가입</Text>
            </CustomLink>
        </Wrapper>
    );
}

export default LoginArea;
