import React from "react";
import styled from "styled-components";

const StyledLine = styled.div`
    width: 100%;
    height: 0.5px;
    background: #ABABAB;
`;

function Line() {
    return(
        <StyledLine/>
    );
}

export default Line;