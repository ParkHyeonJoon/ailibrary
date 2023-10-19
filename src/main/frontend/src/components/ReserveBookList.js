import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReserveBookFrame from "./ReserveBookFrame";

const SelectAllLabel = styled.label`
    font-size: 18px;
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
`;

const Title = styled.p`
  margin-left: 20px;
  color: #000000;
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 10px;
`;

function ReserveBookList({ book }) {
    const [reserveBooks, setReserveBooks] = useState([]);
    const [selectedBooks, setSelectedBooks] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const selection = (bookId, selected) => {
        if(selected) {
            setSelectedBooks([...selectedBooks, bookId]);
        } else {
            setSelectedBooks(selectedBooks.filter((id) => id !== bookId));
        }
        if(selectAll && !selected) {
            setSelectAll(false);
        }
    };

    const storedUserInfo = localStorage.getItem("userInfo");
    const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

    const userId = userInfo.userId;

    const handleCancelReservation = async () => {
            if(selectedBooks.length === 0) {
                return;
            }

            const fetchData = async () => {
                try {
                    const reserveResponse = await fetch(`http://localhost:8080/book/reserving?userId=${userId}`);

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
                    body: JSON.stringify(selectedBooks)
                });

                if(!response.ok) {
                   throw new Error("Network response was not ok");
                }

                fetchData();
                setSelectedBooks([]);
                toast.success("예약이 취소되었습니다");

            } catch(error) {
                console.error("Error canceling reservation: ", error);
                toast.error("예약 취소 중 오류가 발생했습니다.");
            }
        };

        const handleSelectAll = () => {
            if(selectAll) {
                setSelectedBooks([]);
            } else {
                const allBookIds = reserveBooks.map((book) => book.bookId);
                setSelectedBooks(allBookIds);
            }
            setSelectAll(!selectAll);
        };

    useEffect(() => {

        // 두 개의 API를 병렬로 호출하는 함수
        const fetchData = async () => {
            try {
                const reserveResponse = await fetch(`http://localhost:8080/book/reserving?userId=${userId}`);

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
    }, [userId]);

    return (
        <Wrapper>
            <Title>예약 중인 도서</Title>
            <SelectAllLabel>
            <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
            />
            전체 선택
            </SelectAllLabel>
            <SectionWrapper>
                {reserveBooks.map((book, index) => (
                    <div style={{ display: 'inline-block', margin: '20px' }} key={index}>
                    <input type="checkbox" checked={selectedBooks.includes(book.bookId)} onChange={() => selection(book.bookId, !selectedBooks.includes(book.bookId))}/>
                        <ReserveBookFrame book={book}/>
                    </div>
                ))}
            </SectionWrapper>
            <ToastContainer />
            <button onClick={handleCancelReservation}>예약 취소</button>
        </Wrapper>
    );
}

export default ReserveBookList;
