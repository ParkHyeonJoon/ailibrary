import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
  width: 130px;
  height: 50px;
  background: #000F5F;
  color: white;
  border-radius: 5px;
  border: none;
  font-weight: 600;
`;

const LoanBtn = styled.button`
  width: 300px;
  height: 60px;
  background: #ffffff;
  color: #000000;
  border-radius: 5px;
  border: none;
  font-weight: 700;
  font-weight: 700;
  font-size: 15px;
  font-size: 15px;
  cursor: pointer;
`;

// const GoodBtn = styled.button`
//   width: 65px;
//   height: 30px;
//   background: #FF0000;
//   color: white;
//   border-radius: 5px;
//   border: none;
//   font-weight: 600;
// `;

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
  const [isBookLoaned, setIsBookLoaned] = useState(false);
  const [loanButtonText, setLoanButtonText] = useState("대출하기");

  const { bookId } = useParams();

  const storedUserInfo = localStorage.getItem("userInfo");
  const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

  useEffect(() => {
      if (userInfo && bookId) {
        // 사용자 정보가 있을 때만 API 호출
        const userId = userInfo.userId;

        // 백엔드 API 호출하여 초기 찜 상태 확인
        axios
          .get(`http://localhost:8080/book/checkLike?userId=${userId}&bookId=${bookId}`)
          .then((response) => {
            const likeStatus = response.data;
            if (likeStatus === "on") {
              setIsLiked(true);
            }
          })
          .catch((error) => {
            console.error("Error checking like status: ", error);
          });

        axios
           .get(`http://localhost:8080/book/loan?userId=${userId}&bookId=${bookId}`)
           .then((response) => {
              const loanStatus = response.data;
              if (loanStatus === "able") {
                setLoanButtonText("대출하기");
                setIsBookLoaned(false);
              } else if(loanStatus === "unable") {
                setLoanButtonText("대출 중");
                setIsBookLoaned(true);
              }
            })
            .catch((error) => {
              console.error("Error checking book loan status: ", error);
            });
        }
      }, [userInfo, bookId]);

  // 찜 버튼 클릭 이벤트 핸들러
  const handleLikeClick = () => {
    if(!userInfo) {
        alert("로그인이 필요합니다");
        return;
    }

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
            setIsLiked(!isLiked); // 버튼 상태 변경 등
            alert("찜 등록 되었습니다");
        } else if(likeStatus === 0) {
            setIsLiked(!isLiked);
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

  const handleLoanClick = () => {
      if (!userInfo) {
        alert("로그인이 필요합니다");
        return;
      }

      if (isBookLoaned) {
        alert("이 책은 이미 대출 중입니다");
        return;
      }

      const userId = userInfo.userId;

      axios
        .post('http://localhost:8080/book/loan', { bookId, userId }, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          const loanStatus = response.data;
          if (loanStatus === 0) {
            setIsBookLoaned(true);
            setLoanButtonText("대출 중");
            alert("대출 완료되었습니다");
          } else if(loanStatus === 1) {
            alert("이 도서는 대출 중입니다.");
          }
        })
        .catch((error) => {
          console.error(error);
          alert("ERROR");
        });
    };

  return (
    <Wrapper>
      <BookTitle>{bookInfo.bookTitle}</BookTitle>
      <BookAuthor>{bookInfo.author}</BookAuthor>
      <BtnArea>
          <LoanBtn onClick={handleLoanClick}>
              {isBookLoaned ? "대출 중" : "대출하기"}
          </LoanBtn>
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