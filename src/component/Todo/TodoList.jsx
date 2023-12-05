/* eslint-disable react/no-unknown-property */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { SIZE } from '../../style/theme';
import { ControlMenu } from '../ControlMenu';
import TodoItem from './TodoItem';

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
        <TodoItem key={it.id} {...it} />
      ))}
    </TodoWrapper>
  );
};

export default React.memo(TodoList);
