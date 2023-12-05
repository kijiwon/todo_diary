import { COLOR, SIZE } from '../../style/theme';
import { weatherList } from '../../util/weather';
import styled from 'styled-components';
import { FaTrashAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deleteDiary } from '../../redux/diarySlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Modal from '../Modal';

const DiaryItemWrapper = styled.article`
  width: 100%;
  height: 60px;
  border: 2px solid ${COLOR.bg_blue};
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  margin-bottom: 10px;

  @media (min-width: ${SIZE.tablet}) {
    border: none;
    border-radius: 0;
    border-bottom: 1.5px dashed ${COLOR.bg_blue};
  }
`;

const WeatherInfo = styled.div`
  font-size: 40px;
  padding-top: 5px;

  @media (min-width: ${SIZE.tablet}) {
    font-size: 45px;
  }
`;

const DiaryInfo = styled.div`
  width: 50%;
  margin-left: 24px;
  margin-right: auto;
  cursor: pointer;
  h1 {
    font-family: 'Sunflower';
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 5px;
  }
  p {
    font-family: 'Gaegu';
  }

  @media (min-width: ${SIZE.tablet}) {
    text-align: center;
    display: flex;
    justify-content: space-around;
    align-items: center;

    h1 {
      font-size: 20px;
    }
    p {
      font-size: 20px;
    }
  }
`;

const DeleteButton = styled.button`
  border: none;
  background-color: inherit;
  font-size: 20px;
  cursor: pointer;

  @media (min-width: ${SIZE.tablet}) {
    font-size: 24px;
  }
`;

const DiaryItem = ({ id, date, weather, content }) => {
  const weatherData = weatherList.find((it) => it.weather_id === weather);
  const dispatch = useDispatch();
  const [deleteDiaryItem, setDeleteDiaryItem] = useState(false);

  const nav = useNavigate();

  const openDeleteDiaryModal = () => {
    setDeleteDiaryItem(!deleteDiaryItem);
  };

  const handelDeleteDiary = () => {
    dispatch(deleteDiary(id));
    setDeleteDiaryItem(!deleteDiaryItem);
  };

  return (
    <DiaryItemWrapper>
      {deleteDiaryItem && (
        <Modal onClick={handelDeleteDiary} setState={setDeleteDiaryItem} />
      )}
      <WeatherInfo>{weatherData.weather_icon}</WeatherInfo>
      <DiaryInfo onClick={() => nav(`/diary/${id}`)}>
        <h1>{date}</h1>
        <p>{content.slice(0, 11)}</p>
      </DiaryInfo>
      <DeleteButton onClick={openDeleteDiaryModal}>
        <FaTrashAlt />
      </DeleteButton>
    </DiaryItemWrapper>
  );
};

export default DiaryItem;
