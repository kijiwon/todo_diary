/* eslint-disable react/no-unknown-property */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { completeTodo, deleteTodo } from '../../redux/todoSlice';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import Button from '../Button';
import { COLOR, SIZE } from '../../style/theme';
import { ControlMenu } from '../ControlMenu';

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
      font-size: 24px;
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

const TodoList = () => {
  const todos = useSelector((state) => state.todo.data);
  const dispatch = useDispatch();
  const [sortTodoType, setSortTodoType] = useState('latest');
  const [filter, setFilter] = useState('all');

  const getProcessedTodoList = () => {
    const copyList = JSON.parse(JSON.stringify(todos));

    const compare = (a, b) => {
      if (sortTodoType === 'latest') {
        return parseInt(b.date) - parseInt(a.date);
      } else if (sortTodoType === 'importance') {
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
          value={sortTodoType}
          onChange={setSortTodoType}
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

export default React.memo(TodoList);
