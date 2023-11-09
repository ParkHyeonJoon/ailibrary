import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import Line from "../common/Line";
import Header from "../components/Header";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 130px;
  background: #fcfcfc;
`;
const ContentWrapper = styled.div`
  width: 70%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Container = styled.div`
  width: 100%;
  border: 0.5px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Title = styled.p`
  color: #505050;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  width: 80%;
`;
const TitleInput = styled.input`
  width: 100%;
  height: 120px;
  font-size: 35px;
  border: none;
  outline: none;
`;
const InputArea = styled.div`
  width: 85%;
  height: 100vh;
  border: none;
  display: flex;
  flex-direction: column;
  justify-items: center;
`;
const TextInput = styled.input`
  width: 100%;
  border: none;
  text-align: left;
  padding-top: 30px;
  box-sizing: border-box;
  display: block; /* display를 block으로 설정 */
  outline: none;
`;
const PostButton = styled.button`
  width: 90px;
  height: 40px;
  border-radius: 5px;
  font-weight: 600;
  font-size: 14px;
  margin-left: 10px;
  border: ${(props) => props.border || "none"};
  background: ${(props) => props.backgroundColor || "#a0aef8"};
  color: ${(props) => props.textColor || "white"};
  cursor: pointer;
`;
const HeaderArea = styled.div`
  display: flex;
  align-items: flex-start;
  justify-items: center;
  width: 85%;
  margin-top: 50px;
`;

function NoticeWritePage(props) {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    return (
        <Wrapper>
            <Header/>
            <ContentWrapper>
                <Container>
                    <HeaderArea>
                        <Title>공지사항</Title>
                        <PostButton
                            backgroundColor="white"
                            textColor="black"
                            border="1px solid #a0aef8"
                            onClick={() => {
                                navigate(-1); // 이전 페이지로 이동
                            }}
                        >취소</PostButton>
                        <PostButton
                            onClick={() => {
                                navigate('/');
                            }}
                        >출간하기</PostButton>
                    </HeaderArea>
                    <InputArea>
                        <TitleInput
                            placeholder={"제목을 입력해주세요."}
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                        />
                        <Line/>
                        <TextInput
                            placeholder={"공지사항 내용을 작성해주세요."}
                            value={content}
                            onChange={(e) => {
                                setContent(e.target.value);
                            }}
                        />
                    </InputArea>
                </Container>
            </ContentWrapper>
        </Wrapper>
    );
}

export default NoticeWritePage;
