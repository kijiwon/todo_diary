import styled from 'styled-components';
import { SIZE } from '../style/theme';
import { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import Button from '../component/Button';
import {
  CommonContainer,
  CommonWrapper,
  CommonLogo,
  CommonSelect,
} from '../component/CommonStyle';
import { useSelector } from 'react-redux';

const DateWrapper = styled.section`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  font-size: 30px;
  font-family: 'Gaegu';
  letter-spacing: 5px;
  margin-bottom: 30px;
  button {
    border: none;
    background-color: inherit;
    font-size: 28px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  @media (min-width: ${SIZE.tablet}) {
  }
`;

const Diary = () => {
  const [curDate, setCurDate] = useState(new Date());
  const nav = useNavigate();
  const diary = useSelector((state) => state.diary.data);

  const dateText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  const increaseMonth = () => {
    setCurDate(
      new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        curDate.getDate(),
      ),
    );
  };
  const decreaseMonth = () => {
    setCurDate(
      new Date(
        curDate.getFullYear(),
        curDate.getMonth() - 1,
        curDate.getDate(),
      ),
    );
  };
  console.log(diary);

  return (
    <CommonContainer>
      <CommonWrapper>
        <CommonLogo
          alt=""
          src={process.env.PUBLIC_URL + '/assets/diarylogo.png'}
        />
        <DateWrapper>
          <button onClick={decreaseMonth}>
            <IoIosArrowBack />
          </button>
          <p>{dateText}</p>
          <button onClick={increaseMonth}>
            <IoIosArrowForward />
          </button>
        </DateWrapper>
        <div>
          <CommonSelect></CommonSelect>
          <Button
            type={'add'}
            text={'일기 작성하기'}
            onClick={() => nav('/diary/add')}
          />
        </div>
        {diary.length !== 0 &&
          diary.map((it) => <div key={it.id}>{it.content}</div>)}
      </CommonWrapper>
    </CommonContainer>
  );
};

export default Diary;
