import React from "react";
import styled from "styled-components";

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

const Text = styled.p`
    cursor: pointer;
    font-size: 7px;
    margin-right: 0;
    color: white;
    font-family: Inter;
    font-weight: 700;
    word-wrap: break-word;

    &:last-child {
        margin-right: 25px;}
`;

function LoginArea() {
    return (
        <Wrapper>
            <Text>로그인</Text>
            <Text>회원가입</Text>
        </Wrapper>
    );
}

export default LoginArea;
