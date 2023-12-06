import styled from 'styled-components';
import { COLOR, SIZE } from '../style/Theme';
import {
  CommonContainer,
  CommonLogo,
  CommonWrapper,
} from '../component/CommonStyle';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';

const BackButton = styled.button`
  width: fit-content;
  font-size: 20px;
  font-family: 'Gaegu';
  border: none;
  background-color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: auto;
  margin-left: 10px;
  cursor: pointer;

  @media (min-width: ${SIZE.tablet}) {
    margin-left: 20px;
  }
`;

const SelectedTodoWrapper = styled.div`
  width: 90%;
  height: 70%;
  margin-top: 30px;

  font-family: 'Poor Story';
  @media (min-width: ${SIZE.tablet}) {
    display: flex;
    flex-direction: row;
  }
`;

const SelectedItemWrapper = styled.div`
  height: 50%;
  @media (min-width: ${SIZE.tablet}) {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const TodoTitle = styled.p`
  width: fit-content;
  font-size: 18px;
  border: 3.8px double ${COLOR.bg_blue};
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 10px;
  @media (min-width: ${SIZE.tablet}) {
    font-size: 22px;
    margin-bottom: 25px;
  }
`;

const SelectedTodoList = styled.div`
  height: 80%;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #ccc;
  }
`;

const SelectedTodoItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 16px;
  color: ${COLOR.btn_pink};
  margin-bottom: 16px;
  margin-left: 20px;
  p {
    color: #2a2a2a;
    margin-left: 14px;
  }

  @media (min-width: ${SIZE.tablet}) {
    font-size: 20px;
  }
`;

const TodoCalendarDetail = () => {
  const date = useParams();
  const todos = useSelector((state) => state.todo.data);
  const nav = useNavigate();
  const selectedTodos = todos.filter((it) => {
    const formattedDate = it.date.slice(0, 10);
    return formattedDate === date.date;
  });

  const completedTodo = selectedTodos.filter((it) => it.complete === true);
  const uncompletedTodo = selectedTodos.filter((it) => it.complete === false);

  return (
    <CommonContainer>
      <CommonWrapper>
        <CommonLogo
          alt=""
          src={process.env.PUBLIC_URL + '/assets/calendarlogo.png'}
        />
        <BackButton onClick={() => nav('/calendar')}>
          <IoIosArrowBack />
          뒤로가기
        </BackButton>
        <SelectedTodoWrapper>
          <SelectedItemWrapper>
            <TodoTitle>완료 투두</TodoTitle>
            <SelectedTodoList>
              {completedTodo.map((it) => (
                <SelectedTodoItem key={it.id}>
                  <FaHeart />
                  <p>{it.text}</p>
                </SelectedTodoItem>
              ))}
            </SelectedTodoList>
          </SelectedItemWrapper>
          <SelectedItemWrapper>
            <TodoTitle>미완료 투두</TodoTitle>
            <SelectedTodoList>
              {uncompletedTodo.map((it) => (
                <SelectedTodoItem key={it.id}>
                  <FaRegHeart />
                  <p>{it.text}</p>
                </SelectedTodoItem>
              ))}
            </SelectedTodoList>
          </SelectedItemWrapper>
        </SelectedTodoWrapper>
      </CommonWrapper>
    </CommonContainer>
  );
};

export default TodoCalendarDetail;
