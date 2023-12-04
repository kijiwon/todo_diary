import styled from 'styled-components';
// import { SIZE } from '../style/theme';
import {
  CommonContainer,
  CommonWrapper,
  CommonLogo,
} from '../component/CommonStyle';
import { useState } from 'react';
import { getStringDate } from './../util/date';
import { weatherList } from '../util/weather';
import Button from '../component/Button';
import { useNavigate } from 'react-router-dom';

const DiaryForm = styled.form``;

const DateWrapper = styled.div``;

const WeatherWrapper = styled.div``;

const WeatherItem = styled.div``;

const DiaryContentWrapper = styled.div``;

const ButtonWrapper = styled.div``;

const DiaryAdd = () => {
  const [date, setDate] = useState(getStringDate(new Date()));
  const nav = useNavigate();

  return (
    <CommonContainer>
      <CommonWrapper>
        <CommonLogo>
          <img alt="" src={process.env.PUBLIC_URL + '/assets/diarylogo.png'} />
        </CommonLogo>
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
            {weatherList.map((it, idx) => (
              <WeatherItem key={idx}>
                {it.weather_icon}
                <p>{it.weather_description}</p>
              </WeatherItem>
            ))}
          </WeatherWrapper>
          <DiaryContentWrapper>
            <p>일기 쓰기</p>
            <textarea />
          </DiaryContentWrapper>
        </DiaryForm>
        <ButtonWrapper>
          <Button
            type={'back'}
            text={'뒤로가기'}
            onClick={() => nav('/diary', { replace: true })}
          />
          <Button type={'add'} text={'작성하기'} onClick={() => {}} />
        </ButtonWrapper>
      </CommonWrapper>
    </CommonContainer>
  );
};

export default DiaryAdd;
