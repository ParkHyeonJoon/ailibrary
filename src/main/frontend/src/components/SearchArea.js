import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom"; // Link 불러오기

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    flex-direction: row;
`;

const Logo = styled.img`
    width: 150px;
    height: 70px;
    margin-right: 20px;
`;

const SearchBar = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    width: 500px;
    height: 40px;
    flex-shrink: 0;
    border-radius: 120px;
    border: 1.5px solid #000;
    opacity: 0.699999988079071;
    background: #FFFBFB;
`;

const SearchInput = styled.input`
    margin-left: 10px;
    border: none;
    outline: none;
    width: 100%;
`;

const SearchButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    margin-right: 10px;
`;

function SearchArea() {
    const [searchText, setSearchText] = useState("");

    const handleSearch = () => {
        // 실제 검색 로직을 작성하는 부분
        console.log("검색어:", searchText);
    };

    return (
        <Wrapper>
            <Link to="/">
                <Logo src={`${process.env.PUBLIC_URL}/assets/Logo.png`} alt="로고" />
            </Link>
            <SearchBar>
                <SearchInput
                    type="text"
                    placeholder="검색어를 입력하세요"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <SearchButton onClick={handleSearch}>
                    <FontAwesomeIcon icon={faSearch}  style={{ fontSize: '15px' }} />
                </SearchButton>
            </SearchBar>
        </Wrapper>
    );
}

export default SearchArea;
