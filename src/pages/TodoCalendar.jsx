/* eslint-disable import/no-named-as-default */
import styled from 'styled-components';
import {
  CommonContainer,
  CommonLogo,
  CommonWrapper,
} from '../component/CommonStyle';
import { COLOR, SIZE } from '../style/Theme';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useEffect, useState } from 'react';
import axios from 'axios';

moment.locale('ko-KR');
const localizer = momentLocalizer(moment);
const ToolbarWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 30px;

  p {
    margin-left: 30px;
    margin-right: 30px;
    font-family: 'Gaegu';
    font-size: 25px;
  }
`;

const CalendarButton = styled.button`
  display: flex;
  align-items: center;
  font-size: 25px;
  border: none;
  background-color: inherit;
  cursor: pointer;
`;

const CalendarWrapper = styled.div`
  width: 90%;
  height: 80%;
  font-family: 'Gaegu';
  font-size: 20px;
`;

const HolidayText = styled.p`
  font-size: 0.7em;
  font-family: 'Gaegu';
  font-weight: 700;
  color: #e13a37;
  margin-top: 2px;
  margin-right: 2px;
  cursor: default;
  @media screen and (min-width: ${SIZE.tablet}) {
    font-size: 15px;
  }
`;

const TodoEventButton = styled.button`
  width: 100%;
  height: 30px;
  background-color: ${COLOR.bg_pink};
  font-size: 0.9em;
  font-weight: bold;
  font-family: 'Poor Story';
  text-align: center;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  @media screen and (min-width: ${SIZE.tablet}) {
    height: 30px;
    font-size: 18px;
    letter-spacing: 2px;
  }
`;

const Toolbar = ({ label, onNavigate, setYear, setMonth }) => {
  const formatLabel = moment(label, 'MMMM YYYY').format('YYYY년 MM월');

  const handleNavigate = (action) => {
    onNavigate(action);
  };

  useEffect(() => {
    setYear(moment(label, 'MMMM YYYY').format('YYYY'));
    setMonth(moment(label, 'MMMM YYYY').format('MM'));
  }, [label]);

  return (
    <ToolbarWrapper>
      <CalendarButton onClick={handleNavigate.bind(null, 'PREV')}>
        <IoIosArrowBack />
      </CalendarButton>
      <p>{formatLabel}</p>
      <CalendarButton onClick={handleNavigate.bind(null, 'NEXT')}>
        <IoIosArrowForward />
      </CalendarButton>
    </ToolbarWrapper>
  );
};

const TodoCalendar = () => {
  const formattedMonth =
    new Date().getMonth() + 1 > 9
      ? new Date().getMonth() + 1
      : '0' + (new Date().getMonth() + 1);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [holiday, setHoliday] = useState([]);
  const events = useSelector((state) => state.todo.data);
  const nav = useNavigate();

  const getHoliday = (year, month) => {
    axios
      .get(
        `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?serviceKey=${process.env.REACT_APP_API_KEY}&solYear=${year}&solMonth=${month}`,
      )
      .then((response) => {
        const data = response.data.response.body.items.item;
        if (data.length !== 0) {
          if (Array.isArray(data)) {
            setHoliday(data);
          } else {
            setHoliday([data]);
          }
        } else {
          setHoliday([]);
        }
      })
      .catch((error) => {
        console.log('해당 월에는 공휴일이 없습니다.->', error);
      });
  };

  const handleCellClick = (date) => {
    nav(`/calendar/${date}`);
  };

  const holidayEvent = holiday.map((it) => {
    return {
      id: it.locdate,
      title: <HolidayText>{it.dateName}</HolidayText>,
      start: new Date(
        it.locdate.toString().slice(0, 4),
        it.locdate.toString().slice(4, 6) - 1,
        it.locdate.toString().slice(6),
      ),
      end: new Date(
        it.locdate.toString().slice(0, 4),
        it.locdate.toString().slice(4, 6) - 1,
        it.locdate.toString().slice(6),
      ),
    };
  });

  const eventCountsByDate = events.reduce((acc, event) => {
    const dateKey = new Date(event.date).toISOString().slice(0, 10);
    acc[dateKey] = (acc[dateKey] || 0) + 1;
    return acc;
  }, {});

  const eventCountArray = Object.entries(eventCountsByDate).map(
    ([date, count]) => ({
      id: date,
      title: (
        <TodoEventButton onClick={() => handleCellClick(date)}>
          <p>{count}개</p>
        </TodoEventButton>
      ),
      start: new Date(date).toISOString(),
      end: new Date(date).toISOString(),
      allDay: false,
    }),
  );

  const mergedEvents = [...holidayEvent, ...eventCountArray];

  const eventStyle = () => {
    return {
      style: {
        backgroundColor: `inherit`,
        textAlign: 'end',
        padding: '0',
      },
    };
  };

  useEffect(() => {
    setYear(new Date().getFullYear());
    setMonth(formattedMonth);
  }, []);

  useEffect(() => {
    getHoliday(year, month);
  }, [year, month]);

  return (
    <CommonContainer>
      <CommonWrapper>
        <CommonLogo
          alt=""
          src={process.env.PUBLIC_URL + '/assets/calendarlogo.png'}
        />
        <CalendarWrapper>
          <Calendar
            localizer={localizer}
            events={mergedEvents}
            views={['month']}
            defaultView="month"
            components={{
              toolbar: (props) => (
                <Toolbar {...props} setYear={setYear} setMonth={setMonth} />
              ),
            }}
            eventPropGetter={eventStyle}
          />
        </CalendarWrapper>
      </CommonWrapper>
    </CommonContainer>
  );
};

export default TodoCalendar;
