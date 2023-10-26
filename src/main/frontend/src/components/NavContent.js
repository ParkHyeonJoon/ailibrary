import React from "react";
import styled from "styled-components";
// import NavLinksContainer from "./NavLinksContainer";
// import NavPrompt from "./NavPrompt";
// import NewChat from "./NewChat";

const Wrapper = styled.div`
  width: 200px;
  height: 480px;
  position: absolute;
  top: 230px;
  left: 120px;
  background: rgba(142, 164, 255, 0.39);
  border-radius: 15px;
`;
const Title = styled.h3`
  margin-left: 20px;
  color: #ffffff;
  font-size: 14px;
`;
const NavContent = ({ }) => {
    return (
        <Wrapper>
            <Title> Q. 자주 묻는 질문</Title>

        </Wrapper>
    );
};

export default NavContent;