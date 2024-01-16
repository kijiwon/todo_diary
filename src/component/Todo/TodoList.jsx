/* eslint-disable import/no-named-as-default */
import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { SIZE } from '../../style/Theme';
import { ControlMenu } from '../ControlMenu';
import TodoItem from './TodoItem';

const TodoListWrapper = styled.div`
  width: 90%;
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  @media screen and (min-width: ${SIZE.tablet}) {
    width: 80%;
  }
`;

const ControlBar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: end;
  margin-bottom: 10px;

  @media screen and (min-width: ${SIZE.tablet}) {
    width: 85%;
    margin-bottom: 0;
  }
`;

const TodoItemList = styled.div`
  width: 100%;
  height: 80%;
  padding-bottom: 10px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #ccc;
  }
  @media screen and (min-width: ${SIZE.tablet}) {
    width: 80%;
  }
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

const TodoList = ({ todos }) => {
  const [sortTodoType, setSortTodoType] = useState('latest');
  const [filter, setFilter] = useState('all');

  const getProcessedTodoList = () => {
    const copyList = [...todos];

    const compare = useCallback(
      (a, b) => {
        if (sortTodoType === 'latest') {
          return parseInt(b.date) - parseInt(a.date);
        } else if (sortTodoType === 'importance') {
          return b.importance.length - a.importance.length;
        }
      },
      [sortTodoType],
    );
    const filterCallBack = useCallback(
      (item) => {
        if (filter === 'complete') {
          return item.complete === true;
        } else if (filter === 'incomplete') {
          return item.complete === false;
        } else {
          return true;
        }
      },
      [filter],
    );

    const filteredList =
      filter === 'all' ? copyList : copyList.filter((it) => filterCallBack(it));
    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <TodoListWrapper>
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
      <TodoItemList>
        {getProcessedTodoList().map((it) => (
          <TodoItem key={it.id} {...it} />
        ))}
      </TodoItemList>
    </TodoListWrapper>
  );
};

export default React.memo(TodoList);
