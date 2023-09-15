import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 40px 150px;
`;

const BookTitle = styled.p`
  text-align: left;
  font-family: Inter;
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 0;
`;

const BookAuthor = styled.p`
  text-align: left;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;


const ReserveBtn = styled.button`
  width: 130px;
  height: 50px;
  background: #000F5F;
  color: white;
  border-radius: 5px;
  border: none;
  font-weight: 600;
`;

const FormTable = styled.table`
  width: 700px;
  margin-top: 20px;
  border-collapse: collapse;
  margin-bottom: 40px;
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
    padding: 10px;
  }
`;

const Info = styled.p`
  font-size: 14px;
  margin: 0;
  font-weight: bold;
`;

const InfoContent = styled.p`
  font-size: 14px;
  margin: 0;
`;

const BookInfo = ({ bookInfo }) => {
  return (
    <Wrapper>
      <BookTitle>{bookInfo.bookTitle}</BookTitle>
      <BookAuthor>{bookInfo.author}</BookAuthor>
      <ReserveBtn>예약하기</ReserveBtn>
      <FormTable>
        <ColGroup>
          <col />
          <col />
        </ColGroup>
        <TBody>
          <TableRow>
            <td>
              <Info>자료유형</Info>
            </td>
            <td>
              <InfoContent>{bookInfo.category}</InfoContent>
            </td>
          </TableRow>
          <TableRow>
             <td>
             <Info>출판연도</Info>
             </td>
             <td>
             <InfoContent>{bookInfo.publishedDate}</InfoContent>
             </td>
             </TableRow>
           <TableRow>
                        <td>
                        <Info>출판사</Info>
                        </td>
                        <td>
                        <InfoContent>{bookInfo.publisher}</InfoContent>
                        </td>
                        </TableRow>
           <TableRow>
                        <td>
                        <Info>층수</Info>
                        </td>
                        <td>
                        <InfoContent>{bookInfo.floor}</InfoContent>
                        </td>
                        </TableRow>
           <TableRow>
                        <td>
                        <Info>청구번호(아이디)</Info>
                        </td>
                        <td>
                        <InfoContent>{bookInfo.bookId}</InfoContent>
                        </td>
                        </TableRow>
        </TBody>
      </FormTable>
    </Wrapper>
  );
};

export default BookInfo;
