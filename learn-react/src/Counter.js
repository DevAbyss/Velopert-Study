import React, { useState, useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;

    case 'DECREMENT':
      return state - 1;

    default:
      throw new Error('Unhandled action');
  }
}

export default function Counter() {
  // ! useState
  // useState는 state가 변경되면, component가 Re-rendering
  // const [number, setNumber] = useState(0);

  // const onIncrease = () => {
  //   setNumber(number + 1);
  // 함수형 업데이트 - 최적화와 관련 있음
  // setNumber(prevNumber => prevNumber + 1);
  // };

  // const onDecrease = () => {
  //   setNumber(number - 1);
  // };

  // ! useReducer
  const [number, dispatch] = useReducer(reducer, 0);

  const onIncrease = () => {
    dispatch({
      type: 'INCREMENT'
    });
  };

  const onDecrease = () => {
    dispatch({
      type: 'DECREMENT'
    });
  };

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>

      {/*
        아래와 같이 쓰면 함수가 렌더링될 때마다 호출
        <button onClick={onIncrease()}>+1</button> 
      */}
    </div>
  );
}