import styled from 'styled-components';
import { SIZE } from '../style/Theme';
import {
  CommonContainer,
  CommonWrapper,
  CommonLogo,
} from '../component/CommonStyle';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDiary } from '../redux/diarySlice';
import { weatherList } from '../util/weather';
import Button from '../component/Button';
import Modal from '../component/Modal';
import { IoIosArrowBack } from 'react-icons/io';

const DiaryHeader = styled.header`
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 30px;
  font-size: 26px;

  h1 {
    width: 90%;
    font-family: 'Gaegu';
    font-size: 32px;
    text-align: center;
  }
`;

const DiaryContent = styled.section`
  width: 90%;

  font-family: 'Gaegu';
  font-size: 18px;

  @media (min-width: ${SIZE.tablet}) {
    font-size: 20px;
  }
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

  @media (min-width: ${SIZE.tablet}) {
    font-size: 20px;
    margin-bottom: 20px;
    p {
      margin-bottom: 10px;
    }
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
    height: 100px;
    background-color: #ececec;
    border-radius: 10px;
    padding: 10px;
    overflow-y: scroll;
    margin-top: 20px;
    margin-left: 20px;
    word-break: break-all;
  }

  @media (min-width: ${SIZE.tablet}) {
    p:last-child {
      width: 100%;
      height: 120px;
      margin-left: 10px;
    }
  }
`;

const ButtonWrapper = styled.div`
  width: 85%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;

  @media (min-width: ${SIZE.tablet}) {
    width: 90%;
    margin-top: 30px;
    margin-left: 10px;
  }
`;

const DiaryDetail = () => {
  const id = useParams();
  const [diaryData, setDiaryData] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  const diaryList = useSelector((state) => state.diary.data);
  const nav = useNavigate();
  const dispatch = useDispatch();

  const weatherData = weatherList.find(
    (it) => parseInt(it.weather_id) === parseInt(diaryData.weather),
  );

  const openDeleteModal = () => {
    setIsDelete(!isDelete);
  };

  const handleDelete = () => {
    dispatch(deleteDiary(diaryData.id));
    setIsDelete(!isDelete);
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
      {isDelete && <Modal onClick={handleDelete} setState={setIsDelete} />}
      <CommonWrapper>
        <CommonLogo
          alt=""
          src={process.env.PUBLIC_URL + '/assets/diarylogo.png'}
        />
        <DiaryHeader>
          <IoIosArrowBack
            onClick={() => nav('/diary')}
            style={{ cursor: 'pointer' }}
          />
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
          <Button
            type={'delete'}
            text={'삭제 하기'}
            onClick={openDeleteModal}
          />
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
