import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Room from "../components/Room";
import MyDatePicker from "../components/MyDatePicker";
import MyTimePicker from "../components/MyTimePicker";

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    `;
const Title = styled.p`
    text-align: left;
    color: #000;
    font-family: Inter;
    font-size: 25px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`
function BookDetail() {

    return (
        <Wrapper>
            <Header/>
            <Title>상세정보</Title>

            <Room/>
        </Wrapper>
    );
}

export default BookDetail;