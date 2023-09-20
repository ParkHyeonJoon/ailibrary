import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Wrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 40px 150px;
`;

const BookTitle = styled.p`
  text-align: left;
  font-family: Inter;
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 0;
`;

const BookAuthor = styled.p`
  text-align: left;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;


const ReserveBtn = styled.button`
  width: 130px;
  height: 50px;
  background: #000F5F;
  color: white;
  border-radius: 5px;
  border: none;
  font-weight: 600;
`;

const GoodBtn = styled.button`
  width: 30px;
  height: 30px;
  background: #FF0000;
  color: white;
  border-radius: 5px;
  border: none;
  font-weight: 600;
`;

const FormTable = styled.table`
  width: 700px;
  margin-top: 20px;
  border-collapse: collapse;
  margin-bottom: 40px;
`;

const ColGroup = styled.colgroup`
  col:nth-child(1) {
    width: 20%;
  }
  col:nth-child(2) {
    width: 80%;
  }
`;

const TBody = styled.tbody``;

const TableRow = styled.tr`
  td {
    padding: 10px;
  }
`;

const Info = styled.p`
  font-size: 14px;
  margin: 0;
  font-weight: bold;
`;

const InfoContent = styled.p`
  font-size: 14px;
  margin: 0;
`;

const BookInfo = ({ bookInfo }) => {
  const [isLiked, setIsLiked] = useState(false);

  // 찜 버튼 클릭 이벤트 핸들러
  const handleLikeClick = () => {
    // 클라이언트에서 서버로 bookId를 보냅니다.
    const bookId = bookInfo.bookId;

    // HTTP POST 요청을 보냅니다.
    axios
      .post('http://localhost:8080/book/like', { bookId }, {
      headers: {
         'Content-Type': 'application/json',
         },
      })
      .then((response) => {
        // 요청 성공 시 처리
        setIsLiked(true); // 버튼 상태 변경 등
        alert("찜 되었습니다!!");
        console.log(response.data);
      })
      .catch((error) => {
        // 요청 실패 시 처리
        console.error(error);
        alert("ERROR");
      });
  };

  return (
    <Wrapper>
      <BookTitle>{bookInfo.bookTitle}</BookTitle>
      <BookAuthor>{bookInfo.author}</BookAuthor>
      <ReserveBtn>예약하기</ReserveBtn>
      <FormTable>
        <ColGroup>
          <col />
          <col />
        </ColGroup>
        <TBody>
          <TableRow>
            <td>
              <Info>자료유형</Info>
            </td>
            <td>
              <InfoContent>{bookInfo.category}</InfoContent>
            </td>
          </TableRow>
          <TableRow>
            <td>
              <Info>출판연도</Info>
            </td>
            <td>
              <InfoContent>{bookInfo.publishedDate}</InfoContent>
            </td>
          </TableRow>
          <TableRow>
            <td>
              <Info>출판사</Info>
            </td>
            <td>
              <InfoContent>{bookInfo.publisher}</InfoContent>
            </td>
          </TableRow>
          <TableRow>
            <td>
              <Info>층수</Info>
            </td>
            <td>
              <InfoContent>{bookInfo.floor}</InfoContent>
            </td>
          </TableRow>
          <TableRow>
            <td>
              <GoodBtn onClick={handleLikeClick}>찜</GoodBtn>
            </td>
          </TableRow>
        </TBody>
      </FormTable>
    </Wrapper>
  );
};

export default BookInfo;