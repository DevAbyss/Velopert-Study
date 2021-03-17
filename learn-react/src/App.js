import React, { useCallback, useMemo, useReducer, useRef, useState } from 'react';

// ! JSX 규칙
// 1. Tag는 무조건 닫아준다.
// 2. 2개 이상의 Tag는 하나의 Tag로 감싸준다.
// 3. Javascript value를 보여줘야 할 때는 {}로 감싸준다.
// 4. inline style은 객체 형태로 작성한다. '-'로 구분돼 있는 것은 camelCase 형태로 네이밍한다.
// 5. css class를 설정할 때는 class가 아닌 className을 사용한다.
// 6. 주석은 '{/* 내용 */}'처럼 작성한다.

// import Hello from './hello';
// import Wrapper from './Wrapper';

// function App() {
//   return (
//     <Wrapper>
//       {/* props만 보내면, true 값이 보내짐 */}
//       <Hello name='react' isSpecial />
//       <Hello color={'red'} />
//     </Wrapper>
//   );
// }

// import Counter from './Counter';

// function App() {
//   return (
//     <Counter />
//   );
// }

// import InputSample from './InputSample';

// function App() {
//   return (
//     <InputSample />
//   );
// }

import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

// ! useState
// function App() {
// const [users, setUsers] = useState([
//   {
//     id: 1,
//     username: 'velopert',
//     email: 'public.velopert@gmail.com',
//     active: true
//   },
//   {
//     id: 2,
//     username: 'test',
//     email: 'test@gmail.com',
//     active: false
//   },
//   {
//     id: 3,
//     username: 'marco',
//     email: 'marco@gmail.com',
//     active: false
//   }
// ]);

// const [inputs, setInputs] = useState({
//   username: '',
//   email: ''
// });
// const { username, email } = inputs;

// const onChange = useCallback((e) => {
//   const { name, value } = e.target;

//   setInputs({
//     ...inputs,
//     [name]: value
//   });
// }, [inputs]);

// const nextId = useRef(4);

// const onCreate = useCallback(() => {
//   const user = {
//     id: nextId.current,
//     username,
//     email
//   };

// 배열의 불변성을 유지하면서 배열에 새로운 항목을 추가하는 방법
// 1. spread 연산자
// setUsers([...users, user]);
// 2. concat 함수
//   setUsers(users => users.concat(user));

//   setInputs({
//     username: '',
//     email: ''
//   });
//   console.log(nextId.current);
//   nextId.current += 1;
// }, [username, email]);

// 배열의 불변성을 유지하면서 삭제
// const onRemove = useCallback((id) => {
//   setUsers(users => users.filter(user => user.id !== id));
// }, []);

// 배열의 불변성을 유지하면서 배열의 항목을 수정하는 방법
// const onToggle = useCallback(id => {
//   setUsers(users => users.map(
//     user => user.id === id ? { ...user, active: !user.active } : user
//   ));
// }, []);

// const count = useMemo(() => countActiveUsers(users), [users]);

//   return (
//     <>
//       <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
//       <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
//       <div>활성 사용자 수: {count}</div>
//     </>
//   );
// }

// ! useReducer
// # reducer - 상태를 업데이트하는 함수
const initialState = {
  inputs: {
    username: '',
    email: ''
  },
  users: [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true
    },
    {
      id: 2,
      username: 'test',
      email: 'test@gmail.com',
      active: false
    },
    {
      id: 3,
      username: 'marco',
      email: 'marco@gmail.com',
      active: false
    }
  ]
};

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_INPUT':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value
        }
      };

    case 'CREATE_USER':
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user)
      };

    case 'TOGGLE_USER':
      return {
        ...state,
        users: state.users.map(user => user.id === action.id ? { ...user, active: !user.active } : user)
      };

    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.id)
      };

    default:
      throw new Error('Unhandled action');
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);
  const { users } = state;
  const { username, email } = state.inputs;

  const onChange = useCallback(e => {
    const { name, value } = e.target;

    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value
    });
  }, []);

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email
      }
    });
    nextId.current += 1;
  }, [username, email]);

  const onToggle = useCallback((id) => {
    dispatch({
      type: 'TOGGLE_USER',
      id
    });
  }, []);

  const onRemove = useCallback((id) => {
    dispatch({
      type: 'REMOVE_USER',
      id
    });
  }, []);

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <>
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
      <UserList users={users} onToggle={onToggle} onRemove={onRemove} />
      <div>활성 사용자 수: {count}</div>
    </>
  );
}

export default App;
