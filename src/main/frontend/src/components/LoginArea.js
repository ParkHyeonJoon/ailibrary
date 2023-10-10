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
  color: white;
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

  /* 마우스 오버 시 스타일 변경 */

  &:hover {
    color: ${(props) => props.hoverBackgroundColor || "rgba(0,30,65,0.8)"};
    /* 원하는 다른 스타일 변경도 추가 가능 */
  }

\` ;
`;

function LoginArea() {
    const handleLogout = () => {
        // 로그아웃 클릭 시 실행할 로그아웃 코드
        localStorage.clear(); // 로컬 스토리지 데이터 지우기
        alert('로그아웃되었습니다.');
        // 페이지를 새로고침
        window.location.reload();
        // TODO: 서버측에서 로그아웃 수행하는 코드 추가
    };

    return (
        <Wrapper>
            {localStorage.getItem('token') ? (
                <Text style={{ cursor: 'pointer' }} onClick={handleLogout}>
                    로그아웃
                </Text>
            ) : (
                <>
                    <CustomLink to="/login">
                        <Text style={{ cursor: 'pointer' }}>로그인</Text>
                    </CustomLink>
                    <CustomLink to="/signup">
                        <Text style={{ cursor: 'pointer' }}>회원가입</Text>
                    </CustomLink>
                </>
            )}
        </Wrapper>
    );
}

export default LoginArea;
