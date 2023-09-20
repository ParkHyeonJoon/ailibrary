import React, { useState } from "react";
import styled from "styled-components";
import AllBooks from '../pages/AllBooks'; // 파일 경로에 따라 경로 수정 필요


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
    displey: flex;

`;

const MenuBtn = styled.button`
    cursor: pointer;
    background: none;
    border: none; /* 테두리 없애기 */    
    color: #000;
    font-family: Inter;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    
    &:not(:last-child) {
        margin-right: 50px; /* 마지막 요소를 제외한 모든 요소에 마진 적용 */
    }

    &:hover, &:focus  {
        font-weight: 550;
    }

`
function MainBookList() {
    const [selectedMenu, setSelectedMenu] = useState("추천도서"); // 초기값: 추천도서

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

//   const getFilteredBooks = () => {
//     // 메뉴에 따라 책 데이터 필터링
//     if (selectedMenu === "추천도서") {
//       return books.filter((book) => book.recommended);
//     } else if (selectedMenu === "신착도서") {
//       return books.filter((book) => book.newArrival);
//     } else if (selectedMenu === "인기도서") {
//       return books.filter((book) => book.popular);
//     }
//     return books;
//   };

    return (
        <Wrapper>
            <TitleText>BookList</TitleText>
            <MenuArea>
                <MenuBtn onClick={() => handleMenuClick("추천도서")}>추천도서</MenuBtn>
                <MenuBtn onClick={() => handleMenuClick("인기도서")}>인기도서</MenuBtn>
                <MenuBtn onClick={() => handleMenuClick("신착도서")}>신착도서</MenuBtn>
            </MenuArea>
            <AllBooks />
        </Wrapper> 
    );
}

export default MainBookList;