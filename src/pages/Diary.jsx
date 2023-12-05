import styled from 'styled-components';
import { SIZE } from '../style/theme';
import React, { useState, useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import {
  CommonContainer,
  CommonWrapper,
  CommonLogo,
} from '../component/CommonStyle';
import { useSelector } from 'react-redux';
import DiaryList from '../component/Diary/DiaryList';

const DateWrapper = styled.section`
  width: 100%;
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
  const [diaryData, setDiaryData] = useState([]);

  const diaryList = useSelector((state) => state.diary.data);

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

  useEffect(() => {
    if (diaryList.length >= 1) {
      const firstDay = new Date(curDate.getFullYear(), curDate.getMonth(), 1);
      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23,
        59,
        59,
      );

      setDiaryData(
        diaryList.filter((it) => {
          const diaryDate = new Date(it.date);
          return diaryDate >= firstDay && diaryDate <= lastDay;
        }),
      );
    }
    console.log(diaryList);
  }, [diaryList, curDate]);

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
        <DiaryList diaryData={diaryData} />
      </CommonWrapper>
    </CommonContainer>
  );
};

export default React.memo(Diary);
