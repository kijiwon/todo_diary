import styled from 'styled-components';
import { COLOR, SIZE } from '../style/Theme';
import React from 'react';

const ButtonWrapper = styled.button`
  width: 80px;
  height: 30px;
  border: none;
  border-radius: 10px;
  background-color: ${(props) =>
    props.type === 'add' || props.type === 'edit'
      ? `${COLOR.btn_pink}`
      : props.type === 'cancel'
        ? '#c9c9c9'
        : `${COLOR.btn_blue}`};
  color: white;
  font-family: 'Poor Story';
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: ${(props) =>
      props.type === 'add' || props.type === 'edit'
        ? `${COLOR.btn_pink_hover}`
        : props.type === 'cancel'
          ? '#a6a6a6'
          : `${COLOR.btn_blue_hover}`};
  }

  @media (min-width: ${SIZE.tablet}) {
    width: 120px;
    height: 40px;
  }
`;

const Button = ({ type, text, onClick }) => {
  return (
    <ButtonWrapper type={type} onClick={onClick}>
      {text}
    </ButtonWrapper>
  );
};

export default React.memo(Button);
