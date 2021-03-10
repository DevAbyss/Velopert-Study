import React from 'react';

export default function Hello({ name }) {
  return (
    <div>
      안녕하세요. {name}
    </div>
  );
}

// default props
Hello.defaultProps = {
  name: '이름 없음'
};