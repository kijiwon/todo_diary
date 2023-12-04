import React from 'react';
import styled from 'styled-components';
import { COLOR } from '../style/theme';

const WeatherItemWrapper = styled.button`
  min-width: 55px;
  height: 70px;
  background-color: ${(props) =>
    props.$isSelected ? `${COLOR.bg_pink}` : 'inherit'};
  border: 1.5px solid ${COLOR.bg_pink};
  border-radius: 10px;
  cursor: pointer;

  p {
    text-align: center;
    font-family: 'Poor Story';
    font-size: 14px;
    color: ${(props) => (props.$isSelected ? 'white' : 'black')};
    :first-child {
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 3px;
    }
  }
`;

const WeatherItem = ({
  weather_id,
  weather_icon,
  weather_description,
  onClick,
  isSelected,
}) => {
  return (
    <WeatherItemWrapper
      $isSelected={isSelected}
      onClick={() => onClick(weather_id)}
    >
      <p>{weather_icon}</p>
      <p>{weather_description}</p>
    </WeatherItemWrapper>
  );
};

export default React.memo(WeatherItem);
