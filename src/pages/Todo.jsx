import styled from 'styled-components';
import { COLOR, SIZE } from '../style/theme';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../redux/todoSlice';
import { useState, useRef, useEffect } from 'react';
import TodoList from '../component/TodoList';

const TodoContainer = styled.div`
  width: 100%;
  height: 100vh;

  @media (min-width: ${SIZE.tablet}) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const TodoWrapper = styled.section`
  width: 100%;
  height: 90vh;
  position: absolute;
  bottom: 0px;
  border: none;
  border-radius: 25px 25px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  input {
    border-bottom: 2px solid ${COLOR.btn_blue};
    width: 160px;
    height: 30px;
    &:focus {
      outline: none;
    }
  }

  @media (min-width: ${SIZE.tablet}) {
    width: 670px;
    height: 90vh;
    margin-left: 80px;
    border-radius: 25px;
    position: inherit;
  }
`;

const TodoLogo = styled.div`
  img {
    width: 90px;
  }
  @media (min-width: ${SIZE.tablet}) {
  }
`;

const Todo = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.data);
  const [text, setText] = useState('');
  const [importance, setImportance] = useState('★');
  let id = useRef(0);
  const date = new Date();
  const handleAddTodo = () => {
    const todoData = {
      id: id.current,
      date: date.toISOString(), // 직렬화 후 보내기
      importance,
      text,
    };

    console.log(todoData);
    dispatch(addTodo(todoData));
    console.log('dispatch');
    id.current++;
    setText('');
    setImportance('1');
  };

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  return (
    <TodoContainer>
      <TodoWrapper>
        <TodoLogo>
          <img src={process.env.PUBLIC_URL + '/assets/todologo.png'} alt="" />
        </TodoLogo>
        <div>
          <p>{date.getFullYear()}.</p>
          <p>{date.getMonth() + 1}.</p>
          <p>{date.getDate()}</p>
        </div>
        <div>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <select
            value={importance}
            onChange={(e) => setImportance(e.target.value)}
          >
            <option value={'★'}>★</option>
            <option value={'★★'}>★★</option>
            <option value={'★★★'}>★★★</option>
          </select>
          <button onClick={() => handleAddTodo()}>등록</button>
        </div>
        {todos.length !== 0 ? <TodoList /> : <div>할 일 없음</div>}
      </TodoWrapper>
    </TodoContainer>
  );
};

export default Todo;
