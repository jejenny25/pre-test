import React, { useState, useEffect } from 'react';

const Second = (props, ref) => {
  const [count, setCount] = useState(props.second);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((count) => count - 1);
    }, 1000);

    if (count === 0) {
      clearInterval(id);
      if (props.type === 'countdown') {
        props.countDownTime();
      } else if (props.type === 'timer') {
        props.expiredTime();
      }
    }

    return () => clearInterval(id);
  }, [count]);

  return <span>{count}</span>;
};

export default Second;
