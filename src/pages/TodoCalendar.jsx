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

const Toolbar = ({ label, onNavigate }) => {
  const handleNavigate = (action) => {
    onNavigate(action);
  };

  const formatLabel = moment(label, 'MMMM YYYY').format('YYYY년 MM월');

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
            components={{ toolbar: Toolbar }}
            onSelectEvent={handleCellClick}
            eventPropGetter={eventStyle}
          />
        </CalendarWrapper>
      </CommonWrapper>
    </CommonContainer>
  );
};

export default TodoCalendar;
