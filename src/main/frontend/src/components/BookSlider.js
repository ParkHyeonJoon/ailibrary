import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Slider from "react-slick"; // Import Slider from react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BookFrame from "../components/BookFrame";
import rightArrowImage from "../assets/next.png";
import leftArrowImage from "../assets/back.png";

const Container = styled.div`
  width: 1100px;
  color: #000000;
`;

const Title = styled.p`
  margin-left: 20px;
  color: #000000;
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 20px;
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
function BookSlider({book}) {
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
        prevArrow: <img src={leftArrowImage} alt="Previous" />, // 이전 화살표 이미지 지정
        nextArrow: <img src={rightArrowImage} alt="Next" />, // 다음 화살표 이미지 지정
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const topResponse = await fetch("http://localhost:8080/book/top");

                if (!topResponse.ok) {
                    throw new Error("Network response was not ok");
                }

                const topData = await topResponse.json();

                setTopBooks(topData);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchData();
    }, []);

    return (
        <Container>
            <Title>오늘 도서관의 TOP 10 도서!!</Title>
            <CustomSlider {...settings}> {/* Use React-Slick Slider component */}
                {topBooks.map((book, index) => (
                    <div key={index}>
                        <BookFrame book={book}/>
                    </div>
                ))}
            </CustomSlider>
        </Container>
    );
}

export default BookSlider;