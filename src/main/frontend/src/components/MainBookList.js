import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BookFrame from '../components/BookFrame';

const Wrapper = styled.div`
    width: 100%;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
`
const TitleText = styled.p`
    color: #000;
    font-family: Inter;
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;
const MenuArea = styled.div`
    justify-content: flex-end;
    align-items: center;
    display: flex;
`;

const MenuBtn = styled.button`
    cursor: pointer;
    background: none;
    border: none;
    color: #000;
    font-family: Inter;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    &:not(:last-child) {
        margin-right: 50px;
    }

    &:hover, &:focus  {
        font-weight: 550;
    }
`;

const SectionWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(200px, auto); /* 행 높이 자동 조절, 최소 200px */
  grid-gap: 20px;
`;

const BookContainer = styled.div`
  background-color: #A4A4A4;
  position: relative;
  width: 100%;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const BlackTextBookFrame = styled(BookFrame)`
  color: black; /* 검은색 텍스트 색상 지정 */
`;


function MainBookList() {
    const [topBooks, setTopBooks] = useState([]);
    const [newBooks, setNewBooks] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState("추천도서"); // 초기값: 추천도서

    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
    };

    useEffect(() => {
        // 두 개의 API를 병렬로 호출하는 함수
        const fetchData = async () => {
          try {
            let apiUrl = "";

            // 선택된 메뉴에 따라 다른 API URL 선택
            if (selectedMenu === "인기도서") {
              apiUrl = "http://localhost:8080/book/top";
            } else if (selectedMenu === "신착도서") {
              apiUrl = "http://localhost:8080/book/new";
            }

            if (apiUrl !== "") {
              const response = await fetch(apiUrl);

              if (!response.ok) {
                throw new Error("Network response was not ok");
              }

              const data = await response.json();

              if (selectedMenu === "인기도서") {
                setTopBooks(data.slice(0, 9));
              } else if (selectedMenu === "신착도서") {
                setNewBooks(data.slice(0, 9));
              }
            }
          } catch (error) {
            console.error("Error fetching data: ", error);
          }
        };

        // 데이터 가져오는 함수 호출
        fetchData();
      }, [selectedMenu]);

    return (
        <Wrapper>
            <TitleText>도서목록</TitleText>
            <MenuArea>
                <MenuBtn onClick={() => handleMenuClick("추천도서")}>추천도서</MenuBtn>
                <MenuBtn onClick={() => handleMenuClick("인기도서")}>인기도서</MenuBtn>
                <MenuBtn onClick={() => handleMenuClick("신착도서")}>신착도서</MenuBtn>
            </MenuArea>

        {selectedMenu === "인기도서" && (
                <>
                  <SectionWrapper>
                    {topBooks.map((book, index) => (
                      <BookContainer
                          // 상위 3개 도서에 대한 스타일 적용
                          key={index}
                      >
                        <BlackTextBookFrame book={book} />

                      </BookContainer>
                    ))}
                  </SectionWrapper>
                </>
              )}

              {/* 신착도서 */}
              {selectedMenu === "신착도서" && (
                <>
                  <SectionWrapper>
                    {newBooks.map((book, index) => (
                      <BookContainer
                           // 상위 3개 도서에 대한 스타일 적용
                           key={index}
                      >
                        <BlackTextBookFrame book={book} />

                      </BookContainer>
                    ))}
                  </SectionWrapper>
                </>
              )}
            </Wrapper>
          );
        }

export default MainBookList;