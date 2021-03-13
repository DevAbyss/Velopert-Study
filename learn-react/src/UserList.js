import React from 'react';

function User({ user, onRemove, onToggle }) {
  const { username, email, id, active } = user;

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
}

export default function UserList({ users, onRemove, onToggle }) {
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
}