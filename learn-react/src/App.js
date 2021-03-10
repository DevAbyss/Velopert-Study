import React from 'react';

import Hello from './hello';
import Wrapper from './Wrapper';

// ! JSX 규칙
// 1. Tag는 무조건 닫아준다.
// 2. 2개 이상의 Tag는 하나의 Tag로 감싸준다.
// 3. Javascript value를 보여줘야 할 때는 {}로 감싸준다.
// 4. inline style은 객체 형태로 작성한다. '-'로 구분돼 있는 것은 camelCase 형태로 네이밍한다.
// 5. css class를 설정할 때는 class가 아닌 className을 사용한다.
// 6. 주석은 {/* 내용 */} 작성한다.

function App() {
  return (
    <Wrapper>
      <Hello name='react' />
      <Hello />
    </Wrapper>
  );
}

export default App;
