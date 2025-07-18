import { styled } from 'styled-components';
import React, { useState } from 'react';
import { completeTodo, deleteTodo } from '../../redux/todoSlice';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import Button from '../Button';
import { COLOR, SIZE } from '../../style/Theme';
import { useDispatch } from 'react-redux';
import Modal from '../Modal';

const TodoItemWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;

  @media screen and (min-width: ${SIZE.tablet}) {
    width: 100%;
    padding-top: 5px;
  }
`;
const Item = styled.p`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  margin-left: 5px;
  white-space: pre-wrap;
  span {
    font-size: 14px;
    font-family: 'SunFlower';
    color: ${(props) =>
      props.$complete.toString() === 'true' ? '#8b8b8b' : 'black'};
    letter-spacing: 4px;
    line-height: 1.5;

    &:last-child {
      font-size: 14px;
      margin-left: 10px;
    }
  }
  @media screen and (min-width: ${SIZE.tablet}) {
    margin-left: 10px;
    span {
      font-size: 16px;
      &:last-child {
        font-size: 18px;
        margin-left: 10px;
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
  cursor: pointer;
  font-size: 20px;
  color: ${COLOR.btn_pink};
`;

const TodoItem = ({ ...it }) => {
  const [deleteTodoItem, setDeleteTodoItem] = useState(false);
  const dispatch = useDispatch();

  const openDeleteTodoModal = () => {
    setDeleteTodoItem(!deleteTodoItem);
  };

  const handleDeleteTodo = () => {
    dispatch(deleteTodo(it.id));
    setDeleteTodoItem(!deleteTodo);
  };

  return (
    <TodoItemWrapper key={it.id}>
      {deleteTodoItem && (
        <Modal onClick={handleDeleteTodo} setState={setDeleteTodoItem} />
      )}
      {it.complete.toString() === 'true' ? (
        <CompleteButton onClick={() => dispatch(completeTodo(it.id))}>
          <FaHeart />
        </CompleteButton>
      ) : (
        <CompleteButton onClick={() => dispatch(completeTodo(it.id))}>
          <FaRegHeart />
        </CompleteButton>
      )}
      <Item $complete={it.complete}>
        <span>{it.text}</span>
        <span>{it.importance}</span>
      </Item>
      <Button type={'delete'} text={'삭제'} onClick={openDeleteTodoModal} />
    </TodoItemWrapper>
  );
};

export default React.memo(TodoItem);
