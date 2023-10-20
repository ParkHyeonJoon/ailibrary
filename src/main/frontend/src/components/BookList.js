import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Slider from "react-slick"; // Import Slider from react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BookFrame from "../components/BookFrame";
import rightArrowImage from "../assets/next.png";
import leftArrowImage from "../assets/back.png";

const Wrapper = styled.div`
  width: 1200px;
  color: #000000;
`;
const Container = styled.div`
  width: 1100px;
  color: #000000;
`;
const CustomSlider = styled(Slider)`
  width: 1090px;
  left: 10px;
  position: relative;

  .slick-prev {
    position: absolute;
    opacity: 0;
    z-index: 1;
    transition: opacity 0.3s;
    left: 15px;
  }

  .slick-next {
    position: absolute;
    opacity: 0;
    z-index: 1;
    transition: opacity 0.3s;
    right: 5px;
  }

  &:hover {
    .slick-prev, .slick-next {
      opacity: 1;

    }
  }

  //TODO: 배경 검고 투명하게 나오는 거 하기
`;

const Title = styled.p`
  margin-left: 20px;
  color: #000000;
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 10px;
`;

function BookList({book}) {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        arrows: true,
        autoplay: false,
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 0,
        centerMode: true, // Enable center mode
        centerPadding: "15px", // Adjust the value as needed
        prevArrow: <img src={leftArrowImage} alt="Previous"/>, // 이전 화살표 이미지 지정
        nextArrow: <img src={rightArrowImage} alt="Next"/>, // 다음 화살표 이미지 지정
        responsive: [
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                },
            },
            {
                breakpoint: 720,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 360,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
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
            {/* TOP 도서 */}
            <Container>
                <Title>오늘 도서관의 TOP 10 도서!!</Title>
                <CustomSlider {...settings}>
                    {topBooks.map((book, index) => (
                        <div key={index}>
                            <BookFrame book={book}/>

                        </div>
                    ))}
                </CustomSlider>
            </Container>
            {/* 소설 도서 */}
            <Container>
                <Title>마법 같은 세계로 초대하는 소설들</Title>
                <CustomSlider {...settings}>
                    {fictionBooks.map((book, index) => (
                        <div key={index}>
                            <BookFrame book={book}/>
                        </div>
                    ))}
                </CustomSlider>
            </Container>
            {/* 신규 도서 */}
            <Container>
                <Title>뜨끈뜨끈한 새로 들어온 도서들!</Title>
                <CustomSlider {...settings}>
                    {newBooks.map((book, index) => (
                        <div key={index}>
                            <BookFrame book={book}/>
                        </div>
                    ))}
                </CustomSlider>
            </Container>
        </Wrapper>
    );
}

export default BookList;