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
`

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

const TBody = styled.tbody`
`;

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
const BookInfo= () => {
    return (
        <Wrapper>
            <BookTitle>1%를 읽는 힘</BookTitle>
            <BookAuthor>메르</BookAuthor>
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
                            <InfoContent>단행본</InfoContent>
                        </td>
                    </TableRow>
                    <TableRow>
                        <td>
                            <Info>서명/저자사항</Info>
                        </td>
                        <td>
                            <InfoContent>1%를 읽는 힘 : 세상의 정보를 연결해서 기회를 포착하는 생각 혁신/ 메르 지음</InfoContent>
                        </td>
                    </TableRow>
                    <TableRow>
                        <td>
                            <Info>개인저자</Info>
                        </td>
                        <td>
                            <InfoContent>메르</InfoContent>
                        </td>
                    </TableRow>
                    <TableRow>
                        <td>
                            <Info>발행사항</Info>
                        </td>
                        <td>
                            <InfoContent>서울 : 토네이도 : 토네이도미디어그룹, 2023.</InfoContent>
                        </td>
                    </TableRow>
                    <TableRow>
                        <td>
                            <Info>등록번호</Info>
                        </td>
                        <td>
                            <InfoContent>EM226192</InfoContent>
                        </td>
                    </TableRow>
                    <TableRow>
                        <td>
                            <Info>청구기호</Info>
                        </td>
                        <td>
                            <InfoContent>327.856메238ㅇ</InfoContent>
                        </td>
                    </TableRow>
                </TBody>
            </FormTable>
        </Wrapper>
    );
};

export default BookInfo;