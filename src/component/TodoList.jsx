/* eslint-disable react/no-unknown-property */
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { completeTodo, deleteTodo } from '../redux/todoSlice';

const TodoWrapper = styled.div``;

const TodoItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  p {
    text-decoration: ${(props) => props.$complete === 'true' && 'line-through'};
  }
`;

const TodoList = () => {
  const todos = useSelector((state) => state.data);
  const dispatch = useDispatch();
  console.log(todos);
  return (
    <TodoWrapper>
      {todos.map((it) => (
        <TodoItem key={it.id} $complete={it.complete.toString()}>
          <button onClick={() => dispatch(completeTodo(it.id))}>완료</button>
          <p>{it.text}</p>
          <p>{it.importance}</p>
          <button onClick={() => dispatch(deleteTodo(it.id))}>삭제</button>
        </TodoItem>
      ))}
    </TodoWrapper>
  );
};

export default TodoList;
