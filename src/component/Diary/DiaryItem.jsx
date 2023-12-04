import { COLOR } from '../../style/theme';
import { weatherList } from '../../util/weather';
import styled from 'styled-components';
import { FaTrashAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deleteDiary } from '../../redux/diarySlice';

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
`;

const WeatherInfo = styled.div`
  font-size: 40px;
  padding-top: 5px;
`;

const DiaryInfo = styled.div`
  width: 50%;
  margin-left: 24px;
  margin-right: auto;
  h2 {
    font-family: 'Sunflower';
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 5px;
  }
  p {
    font-family: 'Gaegu';
  }
`;

const DeleteButton = styled.button`
  border: none;
  background-color: inherit;
  font-size: 20px;
  cursor: pointer;
`;

const DiaryItem = ({ id, date, content }) => {
  const weatherData = weatherList.find((it) => it.weather_id === id);
  const dispatch = useDispatch();

  return (
    <DiaryItemWrapper>
      <WeatherInfo>{weatherData.weather_icon}</WeatherInfo>
      <DiaryInfo>
        <h2>{date}</h2>
        <p>{content.slice(0, 11)}</p>
      </DiaryInfo>
      <DeleteButton onClick={() => dispatch(deleteDiary(id))}>
        <FaTrashAlt />
      </DeleteButton>
    </DiaryItemWrapper>
  );
};

export default DiaryItem;
