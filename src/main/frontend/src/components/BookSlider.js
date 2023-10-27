// Slider.js
import React from "react";
import BookFrame from "../components/BookFrame";
import styled from "styled-components";
import Slider from "react-slick"; // Import Slider from react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import rightArrowImage from "../assets/right-arrow.png";
import leftArrowImage from "../assets/left-arrow.png";

const Container = styled.div`
  width: 98%;
  overflow-x: hidden;
`;
const Title = styled.p`
  margin-left: 20px;
  color: #000000;
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 10px;
`;
const CustomSlider = styled(Slider)`
  width: 110%;
  position: relative;
  .slick-prev {
    position: absolute;
    opacity: 0;
    z-index: 1;
    transition: opacity 0.3s;
    left: 15px;
    width: 45px;
    height: 45px;
  }

  .slick-next {
    position: absolute;
    opacity: 0;
    z-index: 1;
    transition: opacity 0.3s;
    right: 150px;
    width: 45px;
    height: 45px;
  }

  &:hover {
    .slick-prev,
    .slick-next {
      opacity: 1;
    }
  }
`;

const StyledDiv = styled.div`
  padding-top: 10px;
  margin-left: 60px;
`;

function SliderComponent({ title, books, showRank }) {
    const settings = {
        dots: false,
        infinite: true,
        speed: 800,
        arrows: true,
        autoplay: false,
        slidesToShow: 6,
        slidesToScroll: 5,
        initialSlide: 0,
        centerMode: false,
        prevArrow: <img src={leftArrowImage} alt="Previous" />,
        nextArrow: <img src={rightArrowImage} alt="Next" />,
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

    return (
        <Container>
            <Title>{title}</Title>
            <CustomSlider {...settings}>
                {books.map((book, index) => (
                    <StyledDiv key={index}>
                        <BookFrame
                            book={book}
                            rank={index + 1}
                            showRank={showRank} />
                    </StyledDiv>
                ))}
            </CustomSlider>
        </Container>
    );
}

export default SliderComponent;
