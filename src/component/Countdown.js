import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Second from './Second';

const Countdown = () => {
  const [isActive, setIsActive] = useState(true);

  const countDownTime = () => {
    setIsActive(false);
  };
  return (
    <>
      {isActive && (
        <CountdownStyled>
          <div className='countdown-box'>
            <div className='second-area'>
              <div className='second-circle'></div>
              <p className='second'>
                <Second
                  second={3}
                  countDownTime={countDownTime}
                  type={'countdown'}
                />
              </p>
            </div>

            <div className='txt-area'>
              <p className='start-txt'>곧 테스트가 시작됩니다!</p>
              <p className='desc'>
                총 7문제가 출제됩니다.
                <br />
                1문제 당 45초의 시간 제한이 있습니다.
              </p>
              <div className='hint-txt-area'>
                <span className='tag'>HINT</span>
                <p className='hint-txt'>정답 문장을 들어볼 수 있어요</p>
              </div>
            </div>
          </div>
        </CountdownStyled>
      )}
    </>
  );
};

export default Countdown;

const spin = keyframes`
from { transform: rotate(0deg); }
  to { transform: rotate(359deg); }
`;

const CountdownStyled = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(3px);
  z-index: 50;
  .countdown-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: calc(100% - 64px);
    padding: 40px 25px;
    background: #ffffff;
    border: 2px solid #00d37a;
    border-radius: 12px;
    text-align: center;
    .second-area {
      position: relative;
      width: 104px;
      height: 104px;

      border-radius: 50%;
      .second-circle {
        position: absolute;
        width: 104px;
        height: 104px;
        top: -6px;
        left: -6px;
        border: 6px solid #f3f4f6;
        border-right-color: #00d37a;
        border-bottom-color: #00d37a;
        animation: ${spin} 1000ms infinite linear;
        border-radius: 50%;
      }
      .second {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 104px;
        height: 104px;
        top: -6px;
        left: -6px;
        font-weight: 700;
        font-size: 48px;
        line-height: 48px;
        color: #16181b;
      }
    }

    .start-txt {
      margin-top: 30px;
      font-weight: 700;
      font-size: 20px;
      line-height: 28px;
      text-align: center;
      color: #16181b;
    }
    .desc {
      margin-top: 8px;
      font-size: 16px;
      line-height: 24px;
      text-align: center;
      color: #16181b;
    }
    .hint-txt-area {
      display: flex;
      margin-top: 8px;
      align-items: center;
      justify-content: center;
      .tag {
        display: flex;
        padding: 4px 6px;
        background: #ff7448;
        border-radius: 8px;
        font-weight: 500;
        font-size: 10px;
        line-height: 10px;
        align-items: center;
        text-align: center;
        color: #fff;
      }
      .hint-txt {
        margin-left: 6px;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        text-align: center;
        color: #ff7448;
      }
    }
  }
`;
