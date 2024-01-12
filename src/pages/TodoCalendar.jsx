import styled from 'styled-components';
import {
  CommonContainer,
  CommonLogo,
  CommonWrapper,
} from '../component/CommonStyle';
import { COLOR } from '../style/Theme';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useEffect, useState } from 'react';
import axios from 'axios';

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

moment.locale('ko-KR');
const localizer = momentLocalizer(moment);

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
    new Date().getMonth() + 1 < 9
      ? '0' + (new Date().getMonth() + 1)
      : (new Date().getMonth() + 1).toString();
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(formattedMonth);
  const [holiday, setHoliday] = useState([]);
  const events = useSelector((state) => state.todo.data);
  const nav = useNavigate();

  const eventCountsByDate = events.reduce((acc, event) => {
    const dateKey = new Date(event.date).toISOString().slice(0, 10);
    acc[dateKey] = (acc[dateKey] || 0) + 1;
    return acc;
  }, {});

  const eventCountArray = Object.entries(eventCountsByDate).map(
    ([date, count]) => ({
      id: date,
      title: `${count}개`,
      start: new Date(date).toISOString(),
      end: new Date(date).toISOString(),
      allDay: false,
    }),
  );

  const eventStyle = () => {
    return {
      style: {
        backgroundColor: `${COLOR.bg_pink}`,
        fontFamily: 'Poor Story',
      },
    };
  };

  const handleCellClick = ({ id }) => {
    nav(`/calendar/${id}`);
  };

  const getHoliday = (month) => {
    console.log('받은 month:', month);
    axios
      .get(
        `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?serviceKey=${process.env.REACT_APP_API_KEY}%3D&solYear=${year}&solMonth=${month}`,
      )
      .then((response) => {
        setHoliday(response.data.response.body.items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log('바뀐 month:', month);
    getHoliday(month);
    console.log(holiday);
  }, [month]);

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
            events={eventCountArray}
            views={['month']}
            defaultView="month"
            components={{
              toolbar: (props) => (
                <Toolbar {...props} setYear={setYear} setMonth={setMonth} />
              ),
            }}
            onSelectEvent={handleCellClick}
            eventPropGetter={eventStyle}
          />
        </CalendarWrapper>
      </CommonWrapper>
    </CommonContainer>
  );
};

export default TodoCalendar;
