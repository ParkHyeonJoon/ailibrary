import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookFrame from "./BookFrame";

const SelectAllLabel = styled.label`
  font-size: 16px;
  margin-left: 570px;
  height: 20px;
  padding: 1px;
`;

const Wrapper = styled.div`
  margin-top: 20px;
  width: 1000px;
  color: #000000;
`;

const SectionWrapper = styled.div`
  width: 100%;
  overflow-x: auto; /* 가로 스크롤을 허용 */
  white-space: nowrap; /* 자식 요소들을 한 줄로 나열 */
  background: #bb86fc;
`;

const Title = styled.p`
  margin-left: 20px;
  color: #000000;
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 10px;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  align-items: flex-end;
`;
const CancelBtn = styled.button`
  background: transparent;
  color: #755dff;
  border: none;
  font-size: 16px;
`;
const StyledInput = styled.input`
  position: relative;
  top:-120px;
`;
function ReserveBookList({book}) {
    const [reserveBooks, setReserveBooks] = useState([]);
    const [selectedBooks, setSelectedBooks] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const selection = (bookId, bookTitle, selected) => {
        if (selected) {
            setSelectedBooks([...selectedBooks, { bookId, bookTitle }]);
        } else {
            setSelectedBooks(selectedBooks.filter((book) => book.bookId !== bookId));
        }
        if (selectAll && !selected) {
            setSelectAll(false);
        }
    };

    const storedUserInfo = localStorage.getItem("userInfo");
    const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

    const userId = userInfo.userId;
    const userStuId = userInfo.userStuId;

    const handleCancelReservation = async () => {
        if (selectedBooks.length === 0) {
            return;
        }

        const bookIds = selectedBooks.map((book) => book.bookId);
        const bookTitles = selectedBooks.map((book) => book.bookTitle);

            const requestBody = {
                bookId: bookIds,
                bookTitle: bookTitles,
                userStuId: userStuId
            };

            const fetchData = async () => {
                try {
                    const reserveResponse = await fetch(`http://localhost:8080/book/reserving?userStuId=${userStuId}`);

                    if (!reserveResponse.ok) {
                        throw new Error("Network response was not ok");
                    }

                    const reserveData = await reserveResponse.json();

                    setReserveBooks(reserveData);
                } catch (error) {
                     console.error("Error fetching data: ", error);
                }
            };


        try {
            const response = await fetch('http://localhost:8080/book/Reserving', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            fetchData();
            setSelectedBooks([]);
            toast.success("예약이 취소되었습니다");

        } catch (error) {
            console.error("Error canceling reservation: ", error);
            toast.error("예약 취소 중 오류가 발생했습니다.");
        }
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedBooks([]);
        } else {
            const allBookData = reserveBooks.map((book) => ( { bookId: book.bookId, bookTitle: book.bookTitle}));
            setSelectedBooks(allBookData);
        }
        setSelectAll(!selectAll);
    };

    useEffect(() => {

        // 두 개의 API를 병렬로 호출하는 함수
        const fetchData = async () => {
            try {
                const reserveResponse = await fetch(`http://localhost:8080/book/reserving?userStuId=${userStuId}`);

                if (!reserveResponse.ok) {
                    throw new Error("Network response was not ok");
                }

                const reserveData = await reserveResponse.json();

                setReserveBooks(reserveData);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        // 데이터 가져오는 함수 호출
        fetchData();
    }, [userStuId]);

    return (
        <Wrapper>
            <Header>
                <Title>예약 중인 도서</Title>
                <SelectAllLabel>
                    <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                    />
                    전체 선택
                </SelectAllLabel>
                <CancelBtn onClick={handleCancelReservation}>예약 취소</CancelBtn>
            </Header>
            <SectionWrapper>
                {reserveBooks.map((book, index) => (
                    <div style={{ display: 'flex', alignItems: 'center'}} key={index}>
                        <StyledInput type="checkbox"
                                     checked={selectedBooks.some(selectedBook => selectedBook.bookId === book.bookId)}
                                     onChange={() => selection(book.bookId, book.bookTitle, !selectedBooks.some(selectedBook => selectedBook.bookId === book.bookId))}/>
                        <BookFrame book={book} showRank={false} showReturnDate={false} showRezDate={true}/>
                    </div>
                ))}
            </SectionWrapper>
            <ToastContainer/>

        </Wrapper>
    );
}

export default ReserveBookList;
