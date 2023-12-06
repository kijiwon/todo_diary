import { useState, useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { getStringDate } from '../../util/date';
import { useNavigate } from 'react-router-dom';
import { weatherList } from '../../util/weather';
import Button from '../Button';
import { useDispatch } from 'react-redux';
import WeatherItem from '../WeatherItem';
import { addDiary, editDiary } from '../../redux/diarySlice';
import { COLOR, SIZE } from '../../style/theme';
import { v4 as uuidv4 } from 'uuid';

const EditorWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media (min-width: ${SIZE.tablet}) {
    width: 100%;
  }
`;

const DiaryForm = styled.div`
  font-family: 'Poor Story';
  font-size: 20px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 20px;

  @media (min-width: ${SIZE.tablet}) {
    width: 80%;
    font-size: 22px;
  }
`;

const DateWrapper = styled.div`
  input {
    width: 160px;
    letter-spacing: 2px;
    font-size: 20px;
    border-radius: 5px;
    background-color: #d9d9d9;
    margin-top: 20px;
    margin-left: 30px;
    padding-left: 5px;
  }
  @media (min-width: ${SIZE.tablet}) {
    input {
      width: 180px;
      font-size: 22px;
    }
  }
`;

const WeatherWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 26px;
  margin-bottom: 26px;
  div {
    display: grid;
    grid-template-columns: repeat(5, auto);
    grid-gap: 10px;
    margin-top: 20px;
    margin-left: 10px;
  }
`;

const DiaryContentWrapper = styled.div`
  textarea {
    border: 1.5px solid ${COLOR.bg_blue};
    border-radius: 10px;
    width: 90%;
    min-height: 100px;
    margin-top: 20px;
    font-family: 'Poor Story';
    font-size: 16px;
    padding: 5px;
    &:focus,
    &:active {
      outline: none;
    }
  }

  @media (min-width: ${SIZE.tablet}) {
    textarea {
      width: 100%;
      letter-spacing: 2px;
      font-size: 18px;
      padding-left: 10px;
    }
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  @media (min-width: ${SIZE.tablet}) {
    width: 80%;
    justify-content: space-between;
  }
`;

const DiaryEditor = ({ isEdit, diaryData }) => {
  const [date, setDate] = useState(getStringDate(new Date()));
  const [weather, setWeather] = useState(0);
  const [content, setContent] = useState('');

  const id = useRef(uuidv4());
  const dispatch = useDispatch();
  const nav = useNavigate();
  const contentRef = useRef();

  const handleClickWeather = useCallback((weather) => {
    setWeather(weather);
  }, []);

  const handleSubmit = () => {
    if (content.length === 0) {
      contentRef.current.focus();
      return;
    }
    dispatch(addDiary({ id: id.current, date, weather, content }));
    nav('/diary', { replace: true });
  };

  const handleEdit = () => {
    if (content.length === 0) {
      contentRef.current.focus();
      return;
    }
    dispatch(editDiary({ id: diaryData.id, date, weather, content }));
    nav(`/diary/${diaryData.id}`, { replace: true });
  };

  useEffect(() => {
    if (isEdit) {
      setDate(diaryData.date);
      setWeather(diaryData.weather);
      setContent(diaryData.content);
    }
  }, [isEdit, diaryData]);

  return (
    <EditorWrapper>
      <DiaryForm>
        <DateWrapper>
          <p>날짜</p>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </DateWrapper>
        <WeatherWrapper>
          <p>날씨</p>
          <div>
            {weatherList.map((it) => (
              <WeatherItem
                key={it.weather_id}
                {...it}
                onClick={handleClickWeather}
                isSelected={it.weather_id === weather}
              />
            ))}
          </div>
        </WeatherWrapper>
        <DiaryContentWrapper>
          <p>일기 쓰기</p>
          <textarea
            ref={contentRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </DiaryContentWrapper>
      </DiaryForm>
      <ButtonWrapper>
        <Button
          type={'back'}
          text={'뒤로가기'}
          onClick={() => nav('/diary', { replace: true })}
        />
        {isEdit ? (
          <Button type={'edit'} text={'수정하기'} onClick={handleEdit} />
        ) : (
          <Button type={'add'} text={'작성하기'} onClick={handleSubmit} />
        )}
      </ButtonWrapper>
    </EditorWrapper>
  );
};

export default DiaryEditor;
