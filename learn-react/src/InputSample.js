import React, { useRef, useState } from 'react';

export default function InputSample() {
  const [inputs, setInputs] = useState({
    name: '',
    nickname: ''
  });
  const { name, nickname } = inputs;

  // useRef
  // a. 특정 DOM을 선택할 때 사용
  // b. state가 변경돼도 component가 Re-rendering 되고 싶지 않을 때 사용
  // - setTimeout, setInterval의 id / 외부 라이브러리를 사용하여 생성된 인스턴스 / Scroll 위치 등
  const nameInput = useRef();

  const onChange = (e) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs, // spread 연산자 - 기존 객체 복사
      [name]: value
    });
  };

  const onReset = () => {
    setInputs({
      name: '',
      nickname: ''
    });

    nameInput.current.focus();
  };

  return (
    <div>
      <input name="name" placeholder='이름' onChange={onChange} value={name} ref={nameInput} />
      <input name="nickname" placeholder='닉네임' onChange={onChange} value={nickname} />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: </b>
        {name} ({nickname})
      </div>
    </div>
  );
}