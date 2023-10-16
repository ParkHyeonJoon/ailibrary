import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import HeartButton from "../common/HeartButton";
import ReserveButton from "../common/ReserveButton";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import "../modalStyle.css";

const Wrapper = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  z-index: 1000;
`;

const BookTitle = styled.p`
  font-family: 'PilseungGothic';
  font-weight: normal;
  font-style: normal;
  text-align: left;
  font-size: 63px;
  line-height: normal;
  margin-top:0;
  margin-bottom: 0px;
  word-wrap: break-word;
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
  position: relative;;
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const LoanBtn = styled.button`
  width: 300px;
  height: 65px;
  background: #ffffff;
  color: #000000;
  border-radius: 5px;
  border: none;
  font-weight: 700;
  font-size: 17px;
  cursor: pointer;
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
  const [isBookLoaned, setIsBookLoaned] = useState(false);
  const [loanButtonText, setLoanButtonText] = useState("대출하기");
  const [selectedDate, setSelectedDate] = useState(null);
  const [isReserveOpen, setIsReserveOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { bookId } = useParams();

  const storedUserInfo = localStorage.getItem("userInfo");
  const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const today = new Date();
  const monthFromToday = new Date(today);
  monthFromToday.setMonth(monthFromToday.getMonth() + 1);

  useEffect(() => {
      if (userInfo && bookId) {
        // 사용자 정보가 있을 때만 API 호출
        const userId = userInfo.userId;

        // 백엔드 API 호출하여 초기 찜 상태 확인
        axios
          .get(`http://localhost:8080/book/checkLike?userId=${userId}&bookId=${bookId}`)
          .then((response) => {
            // 백엔드에서 데이터 받음
            const likeStatus = response.data;
            // "on"이면 찜
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
              } else if(loanStatus === "return") {
                setLoanButtonText("반납하기");
                setIsBookLoaned(true);
              }
            })
            .catch((error) => {
              console.error("Error checking book loan status: ", error);
            });

        axios
           .get(`http://localhost:8080/book/reserve?bookId=${bookId}`)
           .then((response) => {
           const reserveStatus = response.data;
           if (reserveStatus === "예약 도서") {
                setIsReserveOpen(false);
           } else {
                setIsReserveOpen(true);
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

      const userId = userInfo.userId;

      axios
        .post('http://localhost:8080/book/loan', { bookId, userId }, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          const loanStatus = response.data;
          if(loanStatus === 99) {
             alert("대여 권수 제한입니다")
          } else if (loanStatus === 0) {
            setIsBookLoaned(true);
            setLoanButtonText("반납하기");
            alert("대출 완료되었습니다");
          } else if(loanStatus === 1) {
             setLoanButtonText("대출하기");
             alert("반납 완료되었습니다.");
           } else if(loanStatus === -1) {
              setLoanButtonText("대출 중");
              alert("대출 중입니다.");
              }
           })
        .catch((error) => {
          console.error(error);
          alert("ERROR");
        });
    };

    const handleReserveClick = () => {
        if(!userInfo) {
            alert("로그인이 필요합니다");
            return;
        }

        //달력이 켜짐
        setIsReserveOpen(true);

    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleReserveConfirm = () => {
        if (selectedDate) {
           // 선택한 날짜를 서버로 전달합니다.
           const reserveDate = moment(selectedDate).format("YYYY-MM-DD");

            axios
                .post('http://localhost:8080/book/reserve', {
                    bookId: bookId,
                    bookRezDate: reserveDate,
                    userId: userInfo.userId
                })
                .then((response) => {
                    const reserveStatus = response.data;
                       if(reserveStatus === "예약 성공") {
                         alert("예약이 완료되었습니다")
                         setIsReserveOpen(false);
                       } else if(reserveStatus === "대출") {
                         alert("현재 대출 한 도서입니다")
                         setIsReserveOpen(false);
                       } else{
                          alert("누구도 대출 하지 않은 도서입니다")
                          setIsReserveOpen(false);
                       }
                    })
                .catch((error) => {
                 console.error(error);
                        alert("예약 중 오류가 발생했습니다.");
                      });
                  } else {
                    alert("예약 날짜를 선택해주세요.");
                  }
                };

  return (
    <Wrapper>
      <BookTitle>{bookInfo.bookTitle}</BookTitle>
      <BookAuthor>{bookInfo.author}</BookAuthor>
      <BtnArea>
          <LoanBtn onClick={handleLoanClick}>
              {isBookLoaned ? loanButtonText === "대출 중" ? "대출 중"
               : "반납하기" : "대출하기"}
          </LoanBtn>

        {isReserveOpen && (
            <ReserveButton onClick={openModal} />
        )}
        <HeartButton isLiked={isLiked} onClick={handleLikeClick}/>
        {isModalOpen && (
            <div className="modal">
            <div className="modal-content">
            <h2 className="black-text">도서 예약 날짜 선택</h2>
            <p className="black-text">* 예약 할 날짜를 선택하세요.</p>
            <p className="black-text">* 예약은 오늘 날짜로부터 한 달 내에 날짜까지만 선택 가능합니다.</p>
            <p className="black-text">* 예약 날짜가 지나기 전에 예약해야 합니다.</p>
            <p className="black-text">* 날짜가 지나면 예약은 자동 취소 됩니다.</p>
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                minDate={today} // 오늘부터 선택 가능
                maxDate={monthFromToday} // 오늘로부터 한 달 후까지 선택 가능
                placeholderText="예약 날짜 선택"
              />
              <button onClick={handleReserveConfirm}>확인</button>
              <button onClick={closeModal}>닫기</button>
            </div>
            </div>
           )}
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