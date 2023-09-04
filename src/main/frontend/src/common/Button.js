import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: 300px;
  height: 40px;
  border: ${(props) => props.border || "none"};
  border-radius: 5px;
  background: ${(props) => props.backgroundColor || "#1D2B74"};
  color: ${(props) => props.textColor || "white"};
  margin-top: 10px;
  font-family: Inter;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
`;

function Button(props) {
    const { border, backgroundColor, textColor, children, onClick } = props;

    return (
        <StyledButton border={border} backgroundColor={backgroundColor} textColor={textColor} onClick={onClick}>
            {children}
        </StyledButton>
    );
}

export default Button;