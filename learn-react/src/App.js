import React, { useCallback, useMemo, useRef, useState } from 'react';

// ! JSX 규칙
// 1. Tag는 무조건 닫아준다.
// 2. 2개 이상의 Tag는 하나의 Tag로 감싸준다.
// 3. Javascript value를 보여줘야 할 때는 {}로 감싸준다.
// 4. inline style은 객체 형태로 작성한다. '-'로 구분돼 있는 것은 camelCase 형태로 네이밍한다.
// 5. css class를 설정할 때는 class가 아닌 className을 사용한다.
// 6. 주석은 {/* 내용 */} 작성한다.

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

function App() {
  const [users, setUsers] = useState([
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
  ]);

  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });
  const { username, email } = inputs;

  const onChange = useCallback((e) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value
    });
  }, [inputs]);

  const nextId = useRef(4);

  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username,
      email
    };

    // 배열의 불변성을 유지하면서 배열에 새로운 항목을 추가하는 방법
    // 1. spread 연산자
    // setUsers([...users, user]);
    // 2. concat 함수
    setUsers(users => users.concat(user));

    setInputs({
      username: '',
      email: ''
    });
    console.log(nextId.current);
    nextId.current += 1;
  }, [username, email]);

  // 배열의 불변성을 유지하면서 삭제
  const onRemove = useCallback((id) => {
    setUsers(users => users.filter(user => user.id !== id));
  }, []);

  // 배열의 불변성을 유지하면서 배열의 항목을 수정하는 방법
  const onToggle = useCallback(id => {
    setUsers(users => users.map(
      user => user.id === id
        ? { ...user, active: !user.active }
        :
        user
    ));
  }, []);

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <>
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성 사용자 수: {count}</div>
    </>
  );
}

export default App;
