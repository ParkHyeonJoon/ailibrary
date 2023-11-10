import React from "react";
import {useParams, useNavigate} from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import notices from "../notices.json";
import moment from "moment/moment";
import Button from "../common/Button";

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
  border: 0.5px solid #e0e0e0;
  height: 100vh;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;
const HeaderArea = styled.div`
  display: flex;
  flex-direction: row;
  //align-items: flex-start;
  justify-items: center;
  width: 85%;
  margin-top: 30px;
  background: #e5e5e5;
  height: 70px;
`;
const Title = styled.p`
  color: #505050;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  width: 85%;
  margin-top: 50px;
`;

const Content = styled.p`
  text-align: left;
  font-size: 16px;
  padding: 20px;
  box-sizing: border-box;
  width: 85%;
  min-height: 300px;
  line-height: 1.5;

  p {
    margin: 0; /* 단락의 기본 마진을 제거하여 깔끔하게 나타나게 합니다. */
    line-height: 3; /* 원하는 줄 간격으로 조정합니다. */
  }
`;
const NoticeTitle = styled.p`
  width: 80%;
  margin-left: 20px;
  font-size: 20px;
  font-weight: bold;
`;
const StyledText = styled.p`
  margin-left: 15px;
  margin-top: 0;
  font-size: 14px;
  width: 10%;
  height: 70px;
  justify-content: center;
  display: flex; /* 수직 가운데 정렬을 위해 추가 */
  align-items: center; /* 수직 가운데 정렬을 위해 추가 */
`;

function NoticeViewPage() {
    const {id} = useParams(); // 라우팅 파라미터에서 noticeId 가져오기
    const navigate = useNavigate();
    // noticeId에 해당하는 공지사항 데이터 가져오기
    const notice = notices.find((n) => n.id === parseInt(id)); // id를 정수로 변환

    if (!notice) {
        return <div>해당 공지사항을 찾을 수 없습니다.</div>;
    }

    return (
        <Wrapper>
            <Header/>
            <ContentWrapper>
                <Title>공지사항</Title>
                <HeaderArea>
                    <NoticeTitle>{notice.title}</NoticeTitle>
                    <StyledText>{moment(notice.createdAt).format("YYYY-MM-DD")}</StyledText>
                    <StyledText>{notice.author}</StyledText>
                </HeaderArea>
                <Content>
                    {notice.content.split("\n").map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </Content>
            </ContentWrapper>
            <Button onClick={() => {
                navigate(-1);
            }}>
                목록으로</Button>
        </Wrapper>
    );
}

export default NoticeViewPage;