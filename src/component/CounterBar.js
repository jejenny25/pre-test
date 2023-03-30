import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const CounterBar = (props) => {
  const quizNum = useSelector((state) => state.QuizReducer.quizNum);
  const answerList = useSelector((state) => state.QuizReducer.answerList);
  return (
    <AnswerCounterStyled>
      <ul className='counter-list'>
        {answerList.map((item, idx) => (
          <li
            key={idx}
            className={`${item === 'correct' ? 'correct' : ''} ${
              item === 'incorrect' ? 'incorrect' : ''
            }  ${idx + 1 === quizNum && 'cur'}`}
          >
            <span className='blind'>{idx + 1}번 문제</span>
          </li>
        ))}
        {/* <li className='correct'></li>
        <li className='incorrect'></li>
        <li className='cur'></li> */}
      </ul>
      <div className='counter-num'>
        <span>{quizNum}</span>/<span>{answerList.length}</span>
      </div>
    </AnswerCounterStyled>
  );
};

export default CounterBar;

const AnswerCounterStyled = styled.div`
  padding: 0 16px;
  .counter-list {
    display: flex;
    li {
      width: 100%;
      height: 4px;
      border-radius: 4px;
      background: #ebedef;
      .blind {
        display: block;
        position: absolute;
        left: -9999px;
        top: 0;
        width: 1px;
        height: 1px;
        overflow: hidden;
      }
    }
    li + li {
      margin-left: 3px;
    }
    li.correct {
      background: #59dc94;
    }
    li.incorrect {
      background: #ff414d;
    }
    li.cur {
      background: #8c8e91;
    }
  }
  .counter-num {
    margin-top: 4px;
    text-align: right;
    font-size: 14px;
    line-height: 20px;
    text-align: right;
    color: #64696e;
  }
`;
