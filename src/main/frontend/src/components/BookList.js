import React, {useState, useEffect} from "react";
import styled from "styled-components";

import SliderComponent from "./BookSlider";

const Wrapper = styled.div`
  width: 100%;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 160px;
`;

function BookList({book}) {
    const [topBooks, setTopBooks] = useState([]);
    const [newBooks, setNewBooks] = useState([]);
    const [fictionBooks, setFictionBooks] = useState([]);

    useEffect(() => {
        // 두 개의 API를 병렬로 호출하는 함수
        const fetchData = async () => {
            try {
                const [topResponse, fictionResponse, newResponse] = await Promise.all([
                    fetch("http://localhost:8080/book/top"),
                    fetch("http://localhost:8080/book/fiction"),
                    fetch("http://localhost:8080/book/new"),
                ]);

                if (!topResponse.ok || !newResponse.ok || !fictionResponse.ok) {
                    throw new Error("Network response was not ok");
                }

                const topData = await topResponse.json();
                const fictionData = await fictionResponse.json();
                const newData = await newResponse.json();


                setTopBooks(topData);
                setFictionBooks(fictionData);
                setNewBooks(newData);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        // 데이터 가져오는 함수 호출
        fetchData();
    }, []);

    return (
        <Wrapper>
            <SliderComponent title="오늘 도서관의 TOP 10 도서!!" books={topBooks} showRank={true} />
            <SliderComponent title="마법 같은 세계로 초대하는 소설들" books={fictionBooks} showRank={false} />
            <SliderComponent title="뜨끈뜨끈한 새로 들어온 도서들!" books={newBooks} showRank={false} />
        </Wrapper>
    );
}

export default BookList;