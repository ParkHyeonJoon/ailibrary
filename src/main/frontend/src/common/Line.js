import React from "react";
import styled from "styled-components";

const StyledLine = styled.div`
  width: 100%;
  height: 1px;
  background: rgb(166, 166, 166);
`;

function Line() {
    return(
        <StyledLine/>
    );
}

export default Line;