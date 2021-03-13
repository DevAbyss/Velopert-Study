import React from 'react';

export default function Hello({ name, color, isSpecial }) {
  return (
    <div style={{
      color
    }}>
      {/* 
        조건부 렌더링 - 값이 변할 때 사용
      */}
      {
        isSpecial ? <b>*</b> : null
      }
      안녕하세요. {name}
    </div>
  );
}

// default props
Hello.defaultProps = {
  name: '이름 없음'
};