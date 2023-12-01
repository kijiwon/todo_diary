/* eslint-disable react/no-unknown-property */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { completeTodo, deleteTodo } from '../redux/todoSlice';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import Button from './Button';
import { COLOR, SIZE } from '../style/theme';

const TodoWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;

  overflow-y: scroll;
  @media (min-width: ${SIZE.tablet}) {
  }
`;

const ControlBar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: end;
  margin-bottom: 10px;

  @media (min-width: ${SIZE.tablet}) {
    width: 83%;
    /* justify-content: start; */
  }
`;

const TodoItemWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;

  @media (min-width: ${SIZE.tablet}) {
    width: 80%;
  }
`;
const TodoItem = styled.p`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;

  span {
    font-size: 18px;
    font-family: 'Poor Story';
    color: ${(props) =>
      props.$complete.toString() === 'true' ? '#8b8b8b' : 'black'};
    letter-spacing: 4px;
    &:last-child {
      font-size: 14px;
      margin-left: 10px;
    }
  }
  @media (min-width: ${SIZE.tablet}) {
    span {
      font-size: 20px;
      &:last-child {
        font-size: 18px;
        margin-left: 24px;
      }
    }
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: ${(props) =>
      props.$complete.toString() === 'true' ? '#8b8b8b' : 'transparent'};
  }
`;

const CompleteButton = styled.button`
  align-items: center;
  border: none;
  background-color: inherit;
  font-size: 20px;
  color: ${COLOR.btn_pink};
`;

const ControlMenuWrapper = styled.select`
  width: 100px;
  height: 26px;
  border-radius: 5px;
  border: 1px solid ${COLOR.btn_blue};
  text-align: center;
  font-size: 16px;
  font-family: 'Poor Story';
  margin-bottom: 20px;
  margin-right: 10px;
  outline: none;
`;

const optionList = [
  {
    value: 'latest',
    name: '최신순',
  },
  {
    value: 'importance',
    name: '중요한순',
  },
];

const filterList = [
  { value: 'all', name: '모두' },
  { value: 'incomplete', name: '수행전' },
  { value: 'complete', name: '완료' },
];

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <ControlMenuWrapper
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </ControlMenuWrapper>
  );
};

const TodoList = () => {
  const todos = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const [sortType, setSortType] = useState('latest');
  const [filter, setFilter] = useState('all');

  const getProcessedTodoList = () => {
    // sort를 사용하면 원본 배열 자체가 바뀌기 때문에 복사본을 사용
    const copyList = JSON.parse(JSON.stringify(todos));
    // diaryList를 문자열로 변환(stringify) 후 다시 배열(parse)로 반환
    console.log(copyList);
    // 비교함수
    const compare = (a, b) => {
      if (sortType === 'latest') {
        return parseInt(b.date) - parseInt(a.date);
      } else if (sortType === 'importance') {
        return b.importance.length - a.importance.length;
      }
    };
    const filterCallBack = (item) => {
      if (filter === 'complete') {
        return item.complete === true;
      } else if (filter === 'incomplete') {
        return item.complete === false;
      } else {
        return true;
      }
    };

    const filteredList =
      filter === 'all' ? copyList : copyList.filter((it) => filterCallBack(it));
    const sortedList = filteredList.sort(compare);
    console.log('정렬후:', sortedList);
    return sortedList;
  };
  return (
    <TodoWrapper>
      <ControlBar>
        <ControlMenu
          value={sortType}
          onChange={setSortType}
          optionList={optionList}
        />
        <ControlMenu
          value={filter}
          onChange={setFilter}
          optionList={filterList}
        />
      </ControlBar>

      {getProcessedTodoList().map((it) => (
        <TodoItemWrapper key={it.id}>
          {it.complete.toString() === 'true' ? (
            <CompleteButton onClick={() => dispatch(completeTodo(it.id))}>
              <FaHeart />
            </CompleteButton>
          ) : (
            <CompleteButton onClick={() => dispatch(completeTodo(it.id))}>
              <FaRegHeart />
            </CompleteButton>
          )}
          <TodoItem $complete={it.complete}>
            <span>{it.text}</span>
            <span>{it.importance}</span>
          </TodoItem>

          <Button
            type={'delete'}
            text={'삭제'}
            onClick={() => dispatch(deleteTodo(it.id))}
          />
        </TodoItemWrapper>
      ))}
    </TodoWrapper>
  );
};

export default TodoList;
