import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Header from "../components/Header";
import SliderComponent from "../components/BookSlider";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  color: #000000;
`;
const ContentWrapper = styled.div`
  margin-top: 160px;
  background: #ffffff;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

`;

function BooksByType() {
    const [fictionBooks, setFictionBooks] = useState([]);
    const [developmentBooks, setDevelopmentBooks] = useState([]);
    const [scienceBooks, setScienceBooks] = useState([]);
    const [essayBooks, setEssayBooks] = useState([]);
    const [economyBooks, setEconomyBooks] = useState([]);
    const [biographicalBooks, setBiographicalBooks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    fictionResponse,
                    developmentResponse,
                    scienceResponse,
                    essayResponse,
                    economyResponse,
                    biographicalResponse
                ] = await Promise.all([
                    fetch("http://localhost:8080/book/fiction"),
                    fetch("http://localhost:8080/book/development"),
                    fetch("http://localhost:8080/book/science"),
                    fetch("http://localhost:8080/book/essay"),
                    fetch("http://localhost:8080/book/economy"),
                    fetch("http://localhost:8080/book/biographical"),
                ]);

                if (
                    !fictionResponse.ok ||
                    !developmentResponse.ok ||
                    !scienceResponse.ok ||
                    !essayResponse.ok ||
                    !economyResponse.ok ||
                    !biographicalResponse.ok
                ) {
                    throw new Error("Network response was not ok");
                }

                const fictionData = await fictionResponse.json();
                const developmentData = await developmentResponse.json();
                const scienceData = await scienceResponse.json();
                const essayData = await essayResponse.json();
                const economyData = await economyResponse.json();
                const biographicalData = await biographicalResponse.json();

                setFictionBooks(fictionData);
                setDevelopmentBooks(developmentData);
                setScienceBooks(scienceData);
                setEssayBooks(essayData);
                setEconomyBooks(economyData);
                setBiographicalBooks(biographicalData);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        // 데이터 가져오는 함수 호출
        fetchData();
    }, []);
    return (
        <Wrapper>
            <Header/>
            <ContentWrapper>
                <SliderComponent title="마법 같은 세계로 초대하는 소설들" books={fictionBooks} showRank={false}/>
                <SliderComponent title="인생을 변화시켜줄 자기계발서" books={developmentBooks} showRank={false}/>
                <SliderComponent title="새로운 사실이 궁금하다면 과학도서" books={scienceBooks} showRank={false}/>
                <SliderComponent title="힐링이 필요한 날에는 에세이" books={essayBooks} showRank={false}/>
                <SliderComponent title="돈 많은 백수를 꿈꾸는 당신에게 경제도서" books={economyBooks} showRank={false}/>
                <SliderComponent title="타인의 인생에서 배우는 교훈" books={biographicalBooks} showRank={false}/>
            </ContentWrapper>
        </Wrapper>
    );
}

export default BooksByType;

