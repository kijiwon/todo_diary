import styled from 'styled-components';
import { SIZE } from '../style/theme';
import { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import Button from '../component/Button';

const DiaryContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DiaryWrapper = styled.div`
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

const DiaryLogo = styled.div`
  img {
    width: 80px;
  }
`;

const Diary = () => {
  const [curDate, setCurDate] = useState(new Date());
  const nav = useNavigate();

  const dateText = `${curDate.getFullYear()}년 ${curDate.getMonth()}월`;

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

  return (
    <DiaryContainer>
      <DiaryWrapper>
        <DiaryLogo>
          <img alt="" src={process.env.PUBLIC_URL + '/assets/diarylogo.png'} />
        </DiaryLogo>
        <div>
          <button onClick={decreaseMonth}>
            <IoIosArrowBack />
          </button>
          <p>{dateText}</p>
          <button onClick={increaseMonth}>
            <IoIosArrowForward />
          </button>
        </div>
        <Button
          type={'add'}
          text={'일기 작성하기'}
          onClick={() => nav('/diary/add')}
        />
      </DiaryWrapper>
    </DiaryContainer>
  );
};

export default Diary;
