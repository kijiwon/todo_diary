import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { COLOR, SIZE } from '../style/theme';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../redux/todoSlice';
import TodoList from '../component/Todo/TodoList';
import Button from '../component/Button';
import {
  CommonContainer,
  CommonWrapper,
  CommonLogo,
} from '../component/CommonStyle';

const DateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-family: 'Gaegu';
  letter-spacing: 6px;
  margin-top: 20px;
  margin-bottom: 30px;

  @media (min-width: ${SIZE.tablet}) {
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
    width: 140px;
    height: 30px;
    font-size: 18px;
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
  @media (min-width: ${SIZE.tablet}) {
    justify-content: center;
    input {
      width: 180px;
      height: 40px;
      font-size: 22px;
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

  @media (min-width: ${SIZE.tablet}) {
    font-size: 26px;
    margin-top: 40px;
  }
`;

const Todo = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.data);
  const [text, setText] = useState('');
  const [importance, setImportance] = useState('⭐');

  let id = useRef(0);
  const textRef = useRef();
  console.log(todos);
  const date = new Date();

  const handleAddTodo = () => {
    if (text.length === 0) {
      textRef.current.focus();
      return;
    }
    const todoData = {
      id: id.current,
      date: date.toISOString(), // 직렬화 후 보내기
      importance,
      text,
    };

    dispatch(addTodo(todoData));

    id.current++;
    setText('');
    setImportance('⭐');
  };

  return (
    <CommonContainer>
      <CommonWrapper>
        <CommonLogo
          src={process.env.PUBLIC_URL + '/assets/todologo.png'}
          alt=""
        />
        <DateWrapper>
          <p>{date.getFullYear()}.</p>
          <p>{date.getMonth() + 1}.</p>
          <p>{date.getDate()}</p>
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
        {todos.length !== 0 ? (
          <TodoList />
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
