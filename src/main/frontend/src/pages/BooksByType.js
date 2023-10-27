import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Header from "../components/Header";
import SliderComponent from "../components/BookSlider";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #ffffff;
  color: #000000;
`;
const ContentWrapper = styled.div`
  margin-top: 200px;
  background: yellow;
  
`;

function BooksByType() {
    const [fictionBooks, setFictionBooks] = useState([]);
    const [developmentBooks, setDevelopmentBooks] = useState([]);
    const [scienceBooks, setScienceBooks] = useState([]);
    const [comicBooks, setComicBooks] = useState([]);
    const [essayBooks, setEssayBooks] = useState([]);
    const [economyBooks, setEconomyBooks] = useState([]);
    const [biographicalBooks, setBiographicalBooks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [developmentResponse, fictionResponse, scienceResponse, comicResponse, essayResponse, economyResponse, biographicalResponse] = await Promise.all([
                    fetch("http://localhost:8080/book/development"),
                    fetch("http://localhost:8080/book/fiction"),
                    fetch("http://localhost:8080/book/science"),
                    fetch("http://localhost:8080/book/comic"),
                    fetch("http://localhost:8080/book/essay"),
                    fetch("http://localhost:8080/book/economy"),
                    fetch("http://localhost:8080/book/biographical"),
                ]);

                if (!fictionResponse.ok || !developmentResponse.ok || !scienceResponse.ok || !comicResponse.ok || !essayResponse.ok || !economyResponse.ok || !biographicalResponse.ok ) {
                    throw new Error("Network response was not ok");
                }

                const developmentData = await developmentResponse.json();
                const fictionData = await fictionResponse.json();
                const scienceData = await scienceResponse.json();
                const comicData = await comicResponse.json();
                const essayData = await essayResponse.json();
                const economyData = await economyResponse.json();
                const biographicalData = await biographicalResponse.json();

                setDevelopmentBooks(developmentData);
                setFictionBooks(fictionData);
                setScienceBooks(scienceData);
                setComicBooks(comicData);
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
                <SliderComponent title="마법 같은 세계로 초대하는 소설들" books={developmentBooks} showRank={false}/>
                <SliderComponent title="마법 같은 세계로 초대하는 소설들" books={scienceBooks} showRank={false}/>
                <SliderComponent title="마법 같은 세계로 초대하는 소설들" books={comicBooks} showRank={false}/>
                <SliderComponent title="마법 같은 세계로 초대하는 소설들" books={essayBooks} showRank={false}/>
                <SliderComponent title="마법 같은 세계로 초대하는 소설들" books={economyBooks} showRank={false}/>
                <SliderComponent title="마법 같은 세계로 초대하는 소설들" books={biographicalBooks} showRank={false}/>
            </ContentWrapper>
        </Wrapper>
    );

}

export default BooksByType;

