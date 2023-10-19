import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 180px;
    `;
const Title = styled.p`
  text-align: left;
  color: #000;
  font-family: Inter;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const ContentWrapper = styled.div`
  width: 1000px;
  background: darkgreen;
`;
function Notice() {
    return (
        <Wrapper>
            <Header />
            <ContentWrapper>
            <Title>공지사항</Title>
                <table className="board_list text-center">
                    <colgroup>
                        <col width="5%" />
                        <col width="*" />
                        <col width="50%" />
                        <col width="*" />
                        <col width="*" />
                        <col width="*" />
                        <col width="*" />
                    </colgroup>
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>구분</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일시</th>
                        <th>조회수</th>
                        <th>첨부</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/*{currentPosts.map(post => (*/}
                    {/*    <tr key={post._id}>*/}
                    {/*        <td>{post._id}</td>*/}
                    {/*        <td>{post.type}</td>*/}
                    {/*        <td className="text-left"><Link className="text-ellipsis" to={{ pathname: '/noticeDetail', state: { _id: post._id } }} style={{ color: '#909090' }}>{post.title}</Link></td>*/}
                    {/*        <td>{post.userName}</td>*/}
                    {/*        <td>{moment(post.date).format('YYYY-MM-DD')}</td>*/}
                    {/*        <td>{post.readCount}</td>*/}
                    {/*        <td>*/}
                    {/*            {post.fileList.length > 0 &&*/}
                    {/*                <img src="/images/board_attach.gif" />*/}
                    {/*            }*/}
                    {/*        </td>*/}
                    {/*    </tr>*/}
                    {/*))}*/}
                    </tbody>

                </table>
            </ContentWrapper>
        </Wrapper>
    );

}

export default Notice;

