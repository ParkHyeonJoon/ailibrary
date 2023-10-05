import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import HeartButton from "../common/HeartButton";

const Wrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin: -120px 150px;
`;

const BookTitle = styled.p`
  font-family: 'PilseungGothic';
  font-weight: normal;
  font-style: normal;
  text-align: left;
  font-size: 60px;
  line-height: normal;
  margin-top:0;
  margin-bottom: 0px;
`;

const BookAuthor = styled.p`
  text-align: left;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: rgba(255, 255, 255, 0.77)
`;
const BtnArea = styled.div`
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  `

const ReserveBtn = styled.button`
  width: 300px;
  height: 60px;
  background: #ffffff;
  color: #000000;
  border-radius: 5px;
  border: none;
  font-weight: bolder;
  font-size: 17px;
`;

const FormTable = styled.table`
  width: 700px;
  border-collapse: collapse;
  color: rgba(255, 255, 255, 0.77);
  margin-top: 30px;
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
    padding-bottom: 20px;
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

  font-weight: bold;
`;

const BookInfo = ({ bookInfo }) => {
  const [isLiked, setIsLiked] = useState(false);

  const storedUserInfo = localStorage.getItem("userInfo");
  const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

  // 찜 버튼 클릭 이벤트 핸들러
  const handleLikeClick = () => {
    // 클라이언트에서 서버로 bookId를 보냅니다.
    const bookId = bookInfo.bookId;
    const userId = userInfo.userId;

    // HTTP POST 요청을 보냅니다.
    axios
      .post('http://localhost:8080/book/like', { bookId, userId }, {
      headers: {
         'Content-Type': 'application/json',
         },
      })
      .then((response) => {
        const likeStatus = response.data;
        // 요청 성공 시 처리
        if(likeStatus === 1) {
            setIsLiked(true); // 버튼 상태 변경 등
            alert("찜 등록 되었습니다");
        } else if(likeStatus === 0) {
            setIsLiked(false);
            alert("찜 해제 되었습니다");
        } else {
            alert("에러");
        }
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
      <BtnArea>
        <ReserveBtn>예약하기</ReserveBtn>
        <HeartButton isLiked={isLiked} onClick={handleLikeClick}/>
      </BtnArea>
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
        </TBody>
      </FormTable>
    </Wrapper>
  );
};

export default BookInfo;