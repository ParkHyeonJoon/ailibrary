import React, {useEffect, useState} from "react";
import styled from "styled-components";
import BookFrame from "./BookFrame";
import Line from "../common/Line";

const Wrapper = styled.div`
  width: 95%;
`;
const ContentWrapper = styled.div`
  width: 95%;
  border-radius: 10px;
  margin: 10px 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  position: relative;
`;
const FormTable = styled.table`
  width: 700px;
  border-collapse: collapse;
  color: rgba(0, 0, 0, 0.77);
  margin-left: 90px;
`;

const ColGroup = styled.colgroup`
  col:nth-child(1) {
    width: 20%;
  }

  col:nth-child(2) {
    width: 80%;
  }
`;

const TBody = styled.tbody``;

const TableRow = styled.tr`
  td {
    padding-bottom: 10px;
  }
`;
const Info = styled.p`
  font-size: 14px;
  margin: 0;
`;

function LoanBooksFrame({book}) {
    const storedToken = localStorage.getItem('token');

    const wrapperStyle = {
        width: "70px",
        height: "105px",
        position: "relative",
        marginRight: "-20px",
        transition: "transform 0.3s ease"
    };
    const {bookTitle, author, loanDate, returnDate} = book;

    return (
        <Wrapper>
            <ContentWrapper>
            <BookFrame book={book}
                       showRank={false}
                       showRezDate={false}
                       showReturnDate={false}
                       wrapper={wrapperStyle}
            />
            <FormTable>
                <ColGroup>
                    <col/>
                    <col/>
                </ColGroup>
                <TBody>
                    <TableRow>
                        <td>
                            <Info>서명/저자</Info>
                        </td>
                        <td>
                            <Info>{bookTitle} / {author}</Info>
                        </td>
                    </TableRow>
                    <TableRow>
                        <td>
                            <Info>대출일</Info>
                        </td>
                        <td>
                            <Info>{loanDate}</Info>
                        </td>
                    </TableRow>
                    <TableRow>
                        <td>
                            <Info>반납일</Info>
                        </td>
                        <td>
                            <Info>{returnDate}</Info>
                        </td>
                    </TableRow>
                </TBody>
            </FormTable>
            </ContentWrapper>
            <Line/>
        </Wrapper>
    );
}

export default LoanBooksFrame;