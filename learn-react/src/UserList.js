import React, { useEffect } from 'react';

const User = React.memo(function User({ user, onRemove, onToggle }) {
  const { username, email, id, active } = user;

  // useEffect(() => {
  //   console.log('컴포넌트가 화면에 나타남');
  //   // props → state
  //   // REST API
  //   // D3, Video.js
  //   // setInterval, setTimeout

  //   return () => {
  //     console.log('컴포넌트가 화면에서 사라짐');
  //     // clearInterval, clearTimeout
  //     // 라이브러리 인스턴스 제거
  //   };
  // }, []);

  useEffect(() => {
    console.log('user 값이 설정됨');
    console.log(user);

    return () => {
      console.log('user 값이 바뀌기 전');
      console.log(user);
    };
  }, [user]);

  return (
    <div>
      <b onClick={() => onToggle(id)}
        style={{
          color: active ? 'green' : 'black',
          cursor: 'pointer'
        }}>{username}</b>
      &nbsp;
      <span>{email}</span>
      <button onClick={() => onRemove(id)}>삭제</button>
    </div>
  );
});

export default React.memo(function UserList({ users, onRemove, onToggle }) {
  return (
    <div>
      {
        users.map((user) => {
          return (
            <User key={user.id} user={user} onRemove={onRemove} onToggle={onToggle} />
            // 배열을 렌더링할 때 key를 설정해야 효율적으로 렌더링
          );
        })
      }
    </div>
  );
});