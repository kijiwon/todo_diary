import styled from 'styled-components';
import { COLOR } from '../style/Theme';

const ControlMenuWrapper = styled.select`
  width: 100px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid ${COLOR.btn_blue};
  text-align: center;
  font-size: 16px;
  font-family: 'Poor Story';
  margin-bottom: 20px;
  margin-right: 10px;
  outline: none;
`;

export const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <ControlMenuWrapper
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </ControlMenuWrapper>
  );
};
