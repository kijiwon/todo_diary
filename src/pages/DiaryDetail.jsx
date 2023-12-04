import { useNavigate, useParams } from 'react-router-dom';
import {
  CommonContainer,
  CommonWrapper,
  CommonLogo,
} from '../component/CommonStyle';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosArrowBack } from 'react-icons/io';
import styled from 'styled-components';
import { weatherList } from '../util/weather';
import Button from '../component/Button';
import { deleteDiary } from '../redux/diarySlice';

const DiaryHeader = styled.header`
  width: 90%;

  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 30px;
  font-size: 26px;

  h1 {
    font-family: 'Gaegu';
    font-size: 34px;
    text-align: center;
    margin-left: 20%;
  }
`;

const DiaryContent = styled.section`
  width: 90%;

  font-family: 'Gaegu';
  font-size: 22px;
`;

const WeatherInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  p {
    margin-right: auto;
    margin-bottom: 20px;
  }
`;

const WeatherIconWrapper = styled.div`
  width: 100px;
  height: 130px;

  border-radius: 10px;
  background-color: #ececec;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  p {
    font-size: 20px;
    margin: 0;

    :first-child {
      font-size: 80px;
      margin-bottom: 5px;
    }
  }
`;

const ContentInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  p:last-child {
    width: 90%;
    height: 150px;
    background-color: #ececec;
    border-radius: 10px;
    padding: 10px;
    overflow-y: scroll;
    margin-top: 20px;
    margin-left: 20px;
  }
`;

const ButtonWrapper = styled.div`
  width: 85%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 80px;
`;

const DiaryDetail = () => {
  const id = useParams();
  const [diaryData, setDiaryData] = useState([]);
  const diaryList = useSelector((state) => state.diary.data);
  const nav = useNavigate();
  const dispatch = useDispatch();

  const weatherData = weatherList.find(
    (it) => parseInt(it.weather_id) === parseInt(diaryData.weather),
  );

  const handleDelete = () => {
    dispatch(deleteDiary(diaryData.id));
    nav('/diary', { replace: true });
  };

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id.id),
      );
      if (targetDiary) {
        setDiaryData(targetDiary);
      } else {
        alert('존재하지 않는 일기입니다');
        nav('/diary', { replace: true });
      }
    }
  });

  return (
    <CommonContainer>
      <CommonWrapper>
        <CommonLogo
          alt=""
          src={process.env.PUBLIC_URL + '/assets/diarylogo.png'}
        />
        <DiaryHeader>
          <IoIosArrowBack onClick={() => nav('/diary')} />
          <h1>{diaryData.date}</h1>
        </DiaryHeader>
        <DiaryContent>
          <WeatherInfo>
            <p>오늘의 날씨</p>
            <WeatherIconWrapper>
              <p>{weatherData && weatherData.weather_icon}</p>
              <p>{weatherData && weatherData.weather_description}</p>
            </WeatherIconWrapper>
          </WeatherInfo>
          <ContentInfo>
            <p>오늘의 일기</p>
            <p>{diaryData.content}</p>
          </ContentInfo>
        </DiaryContent>
        <ButtonWrapper>
          <Button type={'delete'} text={'삭제 하기'} onClick={handleDelete} />
          <Button
            type={'edit'}
            text={'수정 하기'}
            onClick={() => {
              nav(`/diary/${diaryData.id}/edit`);
            }}
          />
        </ButtonWrapper>
      </CommonWrapper>
    </CommonContainer>
  );
};

export default DiaryDetail;
