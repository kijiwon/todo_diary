/* eslint-disable import/no-named-as-default */
import styled from 'styled-components';
import { COLOR, SIZE } from '../style/Theme';
import {
  CommonContainer,
  CommonWrapper,
  CommonLogo,
} from '../component/CommonStyle';
import React, { useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../redux/todoSlice';
import TodoList from '../component/Todo/TodoList';
import Button from '../component/Button';
import { v4 as uuidv4 } from 'uuid';

const DateWrapper = styled.div`
  align-items: center;
  font-size: 32px;
  font-family: 'Gaegu';
  letter-spacing: 6px;
  margin-top: 20px;
  margin-bottom: 30px;

  @media screen and (min-width: ${SIZE.tablet}) {
    font-size: 40px;
    letter-spacing: 10px;
    margin-bottom: 45px;
  }
`;

const InputWrapper = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 30px;
  input {
    border-bottom: 2px solid ${COLOR.btn_blue};
    width: 120px;
    height: 30px;
    font-size: 16px;
    font-family: 'Poor Story';
    letter-spacing: 2px;
    padding: 0 0 0 10px;
    &:focus {
      outline: none;
    }
  }
  select {
    width: 80px;
    height: 30px;
    font-size: 13px;
    letter-spacing: 3px;
    text-align: center;
    border: none;
    border-bottom: 2px solid ${COLOR.btn_blue};
    margin-right: 24px;
    &:focus {
      outline: none;
    }
  }
  @media screen and (min-width: ${SIZE.tablet}) {
    justify-content: center;
    input {
      width: 180px;
      height: 40px;
      font-size: 20px;
    }
    select {
      width: 100px;
      height: 40px;
      font-size: 16px;
      letter-spacing: 4px;
    }
  }
`;

const EmptyDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  font-size: 28px;
  font-family: 'Poor Story';

  img {
    width: 220px;
    margin-top: 60px;
  }

  @media screen and (min-width: ${SIZE.tablet}) {
    font-size: 26px;
    margin-top: 40px;
    img {
      width: 200px;
      margin-top: 30px;
    }
  }
`;

const Todo = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.data);
  const [text, setText] = useState('');
  const [importance, setImportance] = useState('⭐');
  const offset = new Date().getTimezoneOffset() * 60000;

  let id = uuidv4();
  const textRef = useRef();
  const date = new Date();
  const year = date.getFullYear();
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const todayDateString = `${year}-${month}-${day}`;

  const todayTodos = todos.filter((it) => {
    const todoDate = new Date(it.date);
    const todoDateString = todoDate.toISOString().slice(0, 10);

    return todoDateString === todayDateString;
  });

  const handleAddTodo = useCallback(() => {
    if (text.length === 0) {
      textRef.current.focus();
      return;
    }

    const itemDate = new Date(Date.now() - offset);
    const todoData = {
      id: id,
      date: itemDate.toISOString(), // 직렬화 후 보내기
      importance,
      text,
    };

    dispatch(addTodo(todoData));

    setText('');
    setImportance('⭐');
  }, [text, importance, dispatch]);

  return (
    <CommonContainer>
      <CommonWrapper>
        <CommonLogo
          src={process.env.PUBLIC_URL + '/assets/todologo.png'}
          alt=""
        />
        <DateWrapper>
          <p>{todayDateString}</p>
        </DateWrapper>
        <InputWrapper>
          <input
            ref={textRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <select
            value={importance}
            onChange={(e) => setImportance(e.target.value)}
          >
            <option value={'⭐'}>⭐</option>
            <option value={'⭐⭐'}>⭐⭐</option>
            <option value={'⭐⭐⭐'}>⭐⭐⭐</option>
          </select>
          <Button
            type={'add'}
            text={'작성하기'}
            onClick={() => handleAddTodo()}
          />
        </InputWrapper>
        {todayTodos.length !== 0 ? (
          <TodoList todos={todayTodos} />
        ) : (
          <EmptyDataWrapper>
            <p>아직 작성된 할 일이 없어요</p>
            <img
              alt=""
              src={process.env.PUBLIC_URL + `/assets/sadEmotion.png`}
            />
          </EmptyDataWrapper>
        )}
      </CommonWrapper>
    </CommonContainer>
  );
};

export default React.memo(Todo);
