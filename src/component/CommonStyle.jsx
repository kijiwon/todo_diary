import styled from 'styled-components';
import { SIZE, COLOR } from '../style/theme';

export const CommonContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CommonWrapper = styled.div`
  width: 100%;
  height: 90vh;
  position: absolute;
  bottom: 0px;
  border: none;
  border-radius: 25px 25px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;

  @media (min-width: ${SIZE.tablet}) {
    width: 670px;
    height: 90vh;
    margin-left: 80px;
    border-radius: 25px;
    position: inherit;
  }
`;

export const CommonLogo = styled.img`
  width: 80px;
`;

export const CommonSelect = styled.select`
  width: 80px;
  height: 30px;
  font-size: 13px;
  letter-spacing: 3px;
  text-align: center;
  border: none;
  border-bottom: 2px solid ${COLOR.btn_blue};
  margin-right: 24px;
  &:focus {
    outline: none;
  }
  @media (min-width: ${SIZE.tablet}) {
    width: 100px;
    height: 40px;
    font-size: 16px;
    letter-spacing: 4px;
  }
`;
