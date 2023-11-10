import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import moment from "moment";
import notices from "../notices.json";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.p`
  text-align: left;
  color: #000;
  font-family: Inter;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const ContentWrapper = styled.div`
  width: 75%;
  margin-top: 150px;
  margin-bottom: 50px;
`;

const WriteButton = styled.button`
  cursor: pointer;
  background: #00004d;
  color: white;
  border-radius: 5px;
  width: 80px;
  height: 35px;
`;

const NoticeTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
`;

const THead = styled.thead`
  background: #dbe3ff;
  height: 60px;
  color: #000000;
`;
const Th = styled.th``;
const Tr = styled.tr`
  height: 60px;
`;
const Td = styled.td`
  border-bottom: 1px solid #d5d5d5;
  padding: 10px;
  text-align: center;
`;
const NoticeTitle = styled.td`
  cursor: pointer;
  border-bottom: 1px solid #d5d5d5;
  padding: 10px;
  color: black;
  &:hover {
    font-weight: bold;
  }
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;

  &:hover {
    font-weight: bold;
  }
`;
function Notice() {
    const navigate = useNavigate();

    return (
        <Wrapper>
            <Header />
            <ContentWrapper>
                <Title>공지사항</Title>
                <NoticeTable>
                    <colgroup>
                        <col width="5%" />
                        <col width="70%" />
                        <col width="*" />
                        <col width="*" />
                    </colgroup>
                    <THead>
                        <tr>
                            <Th>번호</Th>
                            <Th>제목</Th>
                            <Th>작성자</Th>
                            <Th>작성일</Th>
                        </tr>
                    </THead>
                    <tbody>
                    {notices.map((notice) => (
                        <Tr key={notice.id}>
                            <Td>{notice.id}</Td>
                            <NoticeTitle>
                                <StyledLink to={`/notice/${notice.id}`}>
                                    {notice.title}
                                </StyledLink>
                            </NoticeTitle>
                            <Td>{notice.author}</Td>
                            <Td>{moment(notice.createdAt).format("YYYY-MM-DD")}</Td>
                        </Tr>
                    ))}
                    </tbody>
                </NoticeTable>
                <WriteButton
                    onClick={() => {
                        navigate("/notice-write");
                    }}
                >
                    작성하기
                </WriteButton>
            </ContentWrapper>
        </Wrapper>
    );
}

export default Notice;
