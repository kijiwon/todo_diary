import styled from 'styled-components';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  CommonContainer,
  CommonLogo,
  CommonWrapper,
} from '../component/CommonStyle';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

moment.locale('ko-KR');
const localizer = momentLocalizer(moment);

const CalendarWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Toolbar = ({ label, onNavigate }) => {
  const handleNavigate = (action) => {
    onNavigate(action);
  };

  const formatLabel = moment(label).format('YYYY년 MM월');

  return (
    <div>
      <button onClick={handleNavigate.bind(null, 'PREV')}>이전달</button>
      <p>{formatLabel}</p>
      <button onClick={handleNavigate.bind(null, 'NEXT')}>다음달</button>
    </div>
  );
};

const TodoCalendar = () => {
  const events = useSelector((state) => state.todo.data);
  const nav = useNavigate();
  const transformedEvents = events.map((event) => ({
    id: event.id,
    title: event.text,
    start: new Date(event.date),
    end: new Date(event.date),
    allDay: true,
    importance: event.importance,
    complete: event.complete,
  }));

  const eventCountsByDate = transformedEvents.reduce((acc, event) => {
    const dateKey = moment(event.start).format('YYYY-MM-DD');
    acc[dateKey] = (acc[dateKey] || 0) + 1;
    return acc;
  }, {});

  const eventCountArray = Object.entries(eventCountsByDate).map(
    ([date, count]) => ({
      id: date,
      title: `${count}개`,
      start: new Date(date),
      end: new Date(date),
      allDay: true,
    }),
  );

  const handleCellClick = ({ start }) => {
    const formattedDate = moment(start).format('YYYY-MM-DD');
    console.log(formattedDate);
    nav(`/calendar/${formattedDate}`);
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
          />
        </CalendarWrapper>
      </CommonWrapper>
    </CommonContainer>
  );
};

export default TodoCalendar;
