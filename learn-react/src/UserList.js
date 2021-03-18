import React, { useEffect, useContext } from 'react';

import { UserDispatch } from './App';

const User = React.memo(function User({ user }) {

  // useEffect(() => {
  //   console.log('컴포넌트가 화면에 나타남');
  // props → state
  // REST API
  // D3, Video.js
  // setInterval, setTimeout

  //   return () => {
  //     console.log('컴포넌트가 화면에서 사라짐');
  // clearInterval, clearTimeout
  // 라이브러리 인스턴스 제거
  //   };
  // }, []);

  // useEffect(() => {
  //   console.log('user 값이 설정됨');
  //   console.log(user);

  //   return () => {
  //     console.log('user 값이 바뀌기 전');
  //     console.log(user);
  //   };
  // }, [user]);

  const dispatch = useContext(UserDispatch);

  return (
    <div>
      <b onClick={() => dispatch({ type: 'TOGGLE_USER', id: user.id })}
        style={{
          color: user.active ? 'green' : 'black',
          cursor: 'pointer'
        }}>{user.username}</b>
      &nbsp;
      <span>{user.email}</span>
      <button onClick={() => dispatch({ type: 'REMOVE_USER', id: user.id })}>삭제</button>
    </div>
  );
});

export default React.memo(function UserList({ users }) {
  return (
    <div>
      {
        users.map((user) => {
          return (
            <User key={user.id} user={user} />
            // 배열을 렌더링할 때 key를 설정해야 효율적으로 렌더링
          );
        })
      }
    </div>
  );
});