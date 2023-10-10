import React from "react";
import styled from "styled-components";
import { darken } from "polished";

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

  /* 마우스 오버 시 스타일 변경 */
  &:hover {
    background: ${(props) =>
            props.backgroundColor
                    ? darken(0.1, props.backgroundColor) // 어둡게 만드는 함수를 적용
                    : "#123456"};
    /* 원하는 다른 스타일 변경도 추가 가능 */
  }
`;

function Button(props) {
    const { border, backgroundColor, textColor, children, onClick } = props;

    return (
        <StyledButton
            border={border}
            backgroundColor={backgroundColor}
            textColor={textColor}
            onClick={onClick}
        >
            {children}
        </StyledButton>
    );
}

export default Button;